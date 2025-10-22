import { initFirebase } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    auth,
    onAuthStateChanged,
    signOut,
  } = await initFirebase();

  const userId = document.getElementById("userId");
  const provider = document.getElementById("provider");
  const persistence = document.getElementById("persistence");
  const profilePic = document.getElementById("profilePic");
  const welcomeText = document.getElementById("welcomeText");
  const signOutBtn = document.getElementById("signOutBtn");

  onAuthStateChanged(auth, async (user) => {
    if (!user) 
    {
      window.location.href = "index.html";
      return;
    }

    
    userId.textContent = user.uid || "N/A";
    provider.textContent = user.providerData[0]?.providerId || "Email/Password";
    persistence.textContent = (await auth._getPersistence())?.constructor?.name || "Unknown";

    let photoURL = user.photoURL;
    if (!photoURL) 
    {
      photoURL = "logo.png"; // default logo
      profilePic.style.width = "95px";
      profilePic.style.height = "60px";
    } 
    else 
    {
      profilePic.style.width = "80px";
      profilePic.style.height = "80px";
    }

    profilePic.src = photoURL;
    welcomeText.textContent = user.displayName || user.email || "User";
  });


  signOutBtn.addEventListener("click", async () => {
    try 
    {
      await signOut(auth);
      window.location.href = "index.html";
    } 
    catch (err) 
    {
      alert("Error signing out: " + err.message);
    }
  });
});
