const loginBtn = document.getElementById("p_login");
const signupBtn = document.getElementById("p_signin");
const loginLine = document.getElementById("login-line");
const signupLine = document.getElementById("signup-line");
const formFeed = document.querySelector(".form-feed form");
const container = document.querySelector(".container");
const forgot = document.getElementById("forgot");

// --- Reset to Default Login ---
function setLoginView() {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    loginLine.classList.add("active-line");
    signupLine.classList.remove("active-line");

    loginBtn.innerHTML = "Login";
    signupBtn.innerHTML = "Sign Up";

    formFeed.innerHTML = `
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <label for="password">Password</label>
        <input type="password" id="password" required>
        <button type="submit" class="submit">Submit</button>
    `;

    forgot.style.display = "block";
    container.style.height = "470px";
}

// --- Reset to Signup View ---
function setSignupView() {
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
    signupLine.classList.add("active-line");
    loginLine.classList.remove("active-line");

    loginBtn.innerHTML = "Login";
    signupBtn.innerHTML = "Sign Up";

    formFeed.innerHTML = `
        <label for="fullname">Full Name</label>
        <input type="text" id="fullname" required>
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <label for="password">Password</label>
        <input type="password" id="password" required>
        <label for="retype-password">Retype Password</label>
        <input type="password" id="retype-password" required>
        <button type="submit" class="submit">Sign Up</button>
    `;

    forgot.style.display = "none";
    container.style.height = "650px";
}

// --- Forgot Password View ---
function setForgotView() {
    loginBtn.innerHTML = "Reset Password";
    signupBtn.innerHTML = "Back";
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    loginLine.classList.add("active-line");
    signupLine.classList.remove("active-line");

    formFeed.innerHTML = `
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <button type="submit" class="submit">Send OTP</button>
    `;

    forgot.style.display = "none";
    container.style.height = "350px";

    // OTP button loader trigger
    const sendOtpBtn = formFeed.querySelector(".submit");
    sendOtpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showLoader();
    });
}

// --- Event Listeners ---
loginBtn.addEventListener("click", setLoginView);

signupBtn.addEventListener("click", () => {
    if (signupBtn.innerHTML === "Back") {
        setLoginView();
    } else {
        setSignupView();
    }
});

forgot.addEventListener("click", setForgotView);

// --- Default State ---
setLoginView();

function showLoader() {
    formFeed.innerHTML = `<span class="loader"></span>`;
    container.style.height = "200px";
}
