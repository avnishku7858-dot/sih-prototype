const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        password.type = "password";
        togglePassword.textContent = "Show";

    }

});


// Show / Hide Confirm Password

toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "Hide";

    } else {

        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "Show";

    }

});


// Signup Form

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const role = document.getElementById("role").value;

    // Password check

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match!");

        return;
    }


    // Mobile number check

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;
    }


    alert(
        `Account UI working!\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Role: ${role}`
    );

});