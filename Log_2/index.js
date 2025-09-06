const loginBtn = document.getElementById("p_login");
const signupBtn = document.getElementById("p_signin");
const loginLine = document.getElementById("login-line");
const signupLine = document.getElementById("signup-line");
const formFeed = document.querySelector(".form-feed form");
const container = document.querySelector(".container");
const forgot = document.getElementById("forgot");
const submitBtn = document.querySelector(".submit");

// --- Reset to Default Login ---
function setLoginView() 
{
    const existingEmailInput = document.getElementById("email");
    const typedEmail = existingEmailInput ? existingEmailInput.value : "";

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

    const loginEmailInput = document.getElementById("email");
    loginEmailInput.value = typedEmail;

    forgot.style.display = "block";
    container.style.height = "470px";
}

// --- Reset to Signup View ---
function setSignupView() 
{
    const existingEmailInput = document.getElementById("email");
    const typedEmail = existingEmailInput ? existingEmailInput.value : "";

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

    const signupEmailInput = document.getElementById("email");
    signupEmailInput.value = typedEmail;

    forgot.style.display = "none";
    container.style.height = "650px";
}

// --- Forgot Password View ---
function setForgotView() 
{
    const existingEmailInput = document.getElementById("email");
    const typedEmail = existingEmailInput ? existingEmailInput.value : "";

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

    const forgotEmailInput = document.getElementById("email");
    forgotEmailInput.value = typedEmail;

    forgot.style.display = "none";
    container.style.height = "350px";

    const sendOtpBtn = formFeed.querySelector(".submit");
    sendOtpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showLoader();
    });
}


// --- Event Listeners ---
loginBtn.addEventListener("click", setLoginView);

signupBtn.addEventListener("click", () => {
    if (signupBtn.innerHTML === "Back") 
    {
        setLoginView();
    } 
    else 
    {
        setSignupView();
    }
});

forgot.addEventListener("click", setForgotView);

// --- Default State ---
setLoginView();


submitBtn.addEventListener("click", (e) => {
    const container = document.querySelector(".container"); 
    
    container.innerHTML = `
        <div class="center">
            <div class="loader"></div>
        </div>
    `;
});

