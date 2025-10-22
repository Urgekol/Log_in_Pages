import { initFirebase } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    auth,
    googleProvider,
    githubProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
  } = await initFirebase();


  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const rememberCheckbox = document.getElementById("remember");
  const loginBtn = document.getElementById("loginBtn");
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");
  const forgotPassword = document.getElementById("forgotPassword");


  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });


  function showError(msg) 
  {
    alert(msg);
  }


  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try 
    {
      const persistence = rememberCheckbox.checked
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      loginBtn.disabled = true;
      loginBtn.textContent = "Signing in...";

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);

      // redirect on successful login
      window.location.href = "alreadyRegistered.html";
    } 
    catch (err) 
    {
      console.error("SignIn error:", err);
      showError(err.message || "Failed to sign in");
      loginBtn.disabled = false;
      loginBtn.textContent = "Log in";
    }
  });


  // Google sign-in
  googleBtn.addEventListener("click", async () => {
    try 
    {
      googleBtn.disabled = true;
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign in:", result.user);
      window.location.href = "alreadyRegistered.html";
    } 
    catch (err) 
    {
      console.error("Google sign error:", err);
      showError(err.message || "Google sign-in failed");
    } 
    finally 
    {
      googleBtn.disabled = false;
    }
  });


  // GitHub sign-in
  githubBtn.addEventListener("click", async () => {
    try 
    {
      githubBtn.disabled = true;
      const result = await signInWithPopup(auth, githubProvider);
      console.log("GitHub sign in:", result.user);
      window.location.href = "alreadyRegistered.html";
    } 
    catch (err) 
    {
      console.error("GitHub sign error:", err);
      showError(err.message || "GitHub sign-in failed");
    } 
    finally 
    {
      githubBtn.disabled = false;
    }
  });


  const goToRegister = document.getElementById("goToRegister");
  goToRegister.addEventListener("click", () => {
    window.location.href = "signin.html"; 
  });


  // forgot password
  forgotPassword.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!email) 
    {
      showError("Enter your email in the email field first to reset password.");
      return;
    }
    try 
    {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
    } 
    catch (err) 
    {
      console.error("Reset error:", err);
      showError(err.message || "Failed to send reset email");
    }
  });

  
  // auto-redirect if user already signed in
  onAuthStateChanged(auth, (user) => {
    if (user) 
    {
      console.log("User already signed in:", user);
      window.location.href = "alreadyRegistered.html";
    } 
    else 
    {
      console.log("No user signed in");
    }
  });
});
