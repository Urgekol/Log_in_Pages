export async function initFirebase() {
  const firebaseConfig = await fetch("/config").then(res => res.json());

  const { initializeApp } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
  );

  const {
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
  } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
  );

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  return {
    auth,
    googleProvider,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
  };
}
