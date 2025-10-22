
import { initFirebase } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  // initialize firebase
  const {
    auth,
    googleProvider,
    githubProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithPopup,
    createUserWithEmailAndPassword
  } = await initFirebase();


  const form = document.getElementById("loginForm");
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");
  const remember = document.getElementById("remember");


  async function applyPersistence() 
  {
    await setPersistence(auth, remember.checked ? browserLocalPersistence : browserSessionPersistence);
  }

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try 
    {
      await applyPersistence();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("New user created:", user);
      
      window.location.href = "/alreadyRegistered.html";
    } 
    catch (error) 
    {
      console.error(error.code, error.message);
      alert(`Signup failed: ${error.message}`);
    }
  });

  
  googleBtn.addEventListener("click", async () => {
    try 
    {
      await applyPersistence();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user:", user);

      window.location.href = "/alreadyRegistered.html";
    } 
    catch (error) 
    {
      console.error(error.code, error.message);
      alert(`Google signup failed: ${error.message}`);
    }
  });


  githubBtn.addEventListener("click", async () => {
    try 
    {
      await applyPersistence();
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("GitHub user:", user);

      window.location.href = "/alreadyRegistered.html";
    } 
    catch (error) 
    {
      console.error(error.code, error.message);
      alert(`GitHub signup failed: ${error.message}`);
    }
  });
});
