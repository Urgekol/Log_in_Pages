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
    createUserWithEmailAndPassword
  } = await initFirebase();

  const form = document.getElementById("loginForm");
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");
  const remember = document.getElementById("remember");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  function getErrorMessage(code) {
    switch (code) {
      case "auth/email-already-in-use": return "Email already registered.";
      case "auth/invalid-email": return "Invalid email format.";
      case "auth/weak-password": return "Password should be at least 6 characters.";
      default: return "Signup failed. Please try again.";
    }
  }

  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }

  async function applyPersistence() {
    await setPersistence(auth, remember.checked ? browserLocalPersistence : browserSessionPersistence);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    try {
      await applyPersistence();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("New user created:", userCredential.user);
      window.location.href = "/welcome.html";
    } catch (error) {
      console.error(error.code, error.message);
      alert(getErrorMessage(error.code));
    }
  });

  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      try {
        await applyPersistence();
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google user:", result.user);
        window.location.href = "/welcome.html";
      } catch (error) {
        console.error(error.code, error.message);
        alert(getErrorMessage(error.code));
      }
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener("click", async () => {
      try {
        await applyPersistence();
        const result = await signInWithPopup(auth, githubProvider);
        console.log("GitHub user:", result.user);
        window.location.href = "/welcome.html";
      } catch (error) {
        console.error(error.code, error.message);
        alert(getErrorMessage(error.code));
      }
    });
  }
});
