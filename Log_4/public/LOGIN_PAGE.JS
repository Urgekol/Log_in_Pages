import { initFirebase } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  const {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged
  } = await initFirebase();

  const emailInput = document.getElementById("liEmail");
  const passwordInput = document.getElementById("liPass");
  const togglePassword = document.getElementById("toggleLiPass");
  const loginForm = document.getElementById("form-box");
  const loginBtn = document.getElementById("primary-btn");
  const googleBtn = document.getElementById("google-btn");

  togglePassword.addEventListener("click", () => {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  });

  loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    try {
      loginBtn.disabled = true;
      loginBtn.textContent = "Signing in...";

      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );

      window.location.href = "alreadyRegistered.html";
    } catch (err) {
      alert(err.message);
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  });

  googleBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = "alreadyRegistered.html";
    } catch (err) {
      alert(err.message);
    }
  });

  onAuthStateChanged(auth, user => {
    if (user) window.location.href = "alreadyRegistered.html";
  });
});
