const role = document.getElementById("role");

const studentFields =
    document.getElementById("studentFields");

const industryFields =
    document.getElementById("industryFields");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


// =========================
// ROLE SELECTION
// =========================

role.addEventListener("change", function () {

    studentFields.classList.remove("active");
    industryFields.classList.remove("active");

    if (role.value === "student") {

        studentFields.classList.add("active");

    }

    if (role.value === "industry") {

        industryFields.classList.add("active");

    }

});


// =========================
// SHOW / HIDE PASSWORD
// =========================

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        password.type = "password";
        togglePassword.textContent = "Show";

    }

});


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "Hide";

    } else {

        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "Show";

    }

});


// =========================
// SIGNUP FORM
// =========================

const signupForm =
    document.getElementById("signupForm");


signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const selectedRole = role.value;


    // -------------------------
    // BASIC VALIDATION
    // -------------------------

    if (!selectedRole) {

        alert("Please select your account type.");

        return;

    }


    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        return;

    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;

    }


    // -------------------------
    // CITIZEN
    // -------------------------

    if (selectedRole === "citizen") {

        alert(
            `Account Created Successfully!\n\n` +
            `Name: ${name}\n` +
            `Role: Citizen\n\n` +
            `Your Citizen account is ready to use.`
        );

        return;
    }


    // -------------------------
    // STUDENT
    // -------------------------

    if (selectedRole === "student") {

        const collegeName =
            document.getElementById("collegeName").value.trim();

        const studentId =
            document.getElementById("studentId").value.trim();


        if (!collegeName || !studentId) {

            alert(
                "Please enter your college/university name " +
                "and student/enrollment ID."
            );

            return;

        }


        alert(
            `Registration Submitted!\n\n` +
            `Name: ${name}\n` +
            `Requested Role: Student\n` +
            `College: ${collegeName}\n` +
            `Student ID: ${studentId}\n\n` +
            `Verification Status: PENDING`
        );

        return;
    }


    // -------------------------
    // INDUSTRY / ORGANIZATION
    // -------------------------

    if (selectedRole === "industry") {

        const organizationName =
            document
                .getElementById("organizationName")
                .value
                .trim();

        const officialEmail =
            document
                .getElementById("officialEmail")
                .value
                .trim();

        const registrationDetails =
            document
                .getElementById("registrationDetails")
                .value
                .trim();


        if (
            !organizationName ||
            !officialEmail ||
            !registrationDetails
        ) {

            alert(
                "Please complete all organization verification details."
            );

            return;

        }


        alert(
            `Registration Submitted!\n\n` +
            `Organization: ${organizationName}\n` +
            `Requested Role: Industry / Organization\n` +
            `Official Email: ${officialEmail}\n\n` +
            `Verification Status: PENDING`
        );

        return;
    }

});