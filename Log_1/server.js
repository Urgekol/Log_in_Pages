import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
const SUPABASE_URL = process.env.URL;
const SUPABASE_KEY = process.env.KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/registered", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password required");
    }

    try 
    {
        // get the latest ID
        const { data: lastIdData, error: lastIdError } = await supabase
            .from("signed_in")
            .select("id")
            .order("id", { ascending: false })
            .limit(1);

        if (lastIdError) throw lastIdError;

        let lastId = lastIdData.length > 0 ? lastIdData[0].id : 1;
        lastId = lastId + 1;

        console.log("last ID is:" + lastId);
        
    
        for (let givenId = 1; givenId <= lastId; givenId++) 
        {
          const { data: checkData, error: checkError } = await supabase
              .from("signed_in")
              .select("id")
              .eq("id", givenId);

          if (checkError) throw checkError;

          // if no record found for this ID
          if (checkData.length === 0) 
          {
            console.log("Trying to insert in table");
            
              const { error: insertError } = await supabase
                  .from("signed_in")
                  .insert([{ id: givenId, username, password }]);

              console.log("inserted successfully");
              

              if (insertError) throw insertError;
              break;
          }
        }

        res.redirect(`/registered.html?username=${encodeURIComponent(username)}`);
    } 
    catch (err) 
    {
      res.status(500).send("Server error: " + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
