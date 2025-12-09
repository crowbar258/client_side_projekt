document.addEventListener("DOMContentLoaded", function () {

    // ---- HTML ELEMENTY ----
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");

    const loginBtn = document.getElementById("open-login-modal");
    const registerBtn = document.getElementById("open-register-modal");
    const logoutBtn = document.getElementById("logout-button");

    // nové odkazy v navigaci
    const myPlanLink = document.getElementById("nav-my-plan");
    const myRecipesLink = document.getElementById("nav-my-recipes");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    const closeLoginBtns = [
        document.getElementById("close-login-modal"),
        document.getElementById("cancel-login")
    ].filter(Boolean);

    const closeRegisterBtns = [
        document.getElementById("close-register-modal"),
        document.getElementById("cancel-register")
    ].filter(Boolean);

    // zjištění, jestli jsme na admin stránce
    const isAdminPage = window.location.pathname.includes("admin.html");


    // ---- SPRÁVA LOGIN STAVU (mimo admin) ----
    const AUTH_KEY = "mealprep_logged_in";  // true/false

    function isLoggedIn() {
        return localStorage.getItem(AUTH_KEY) === "true";
    }

    function setLoggedIn(value) {
        localStorage.setItem(AUTH_KEY, value ? "true" : "false");
        updateNavbar();
    }

    function updateNavbar() {
        // ⭐ ADMIN STRÁNKA – tlačítko Odhlásit se je vždy vidět
        if (isAdminPage) {
            if (logoutBtn) logoutBtn.style.display = "inline-flex";

            // na admin stránce login/registrace / moje recepty / můj plán neukazujeme
            if (loginBtn) loginBtn.style.display = "none";
            if (registerBtn) registerBtn.style.display = "none";
            if (myPlanLink) myPlanLink.style.display = "none";
            if (myRecipesLink) myRecipesLink.style.display = "none";

            return;
        }

        // ⭐ OSTATNÍ STRÁNKY
        if (isLoggedIn()) {
            // Přihlášený → ukázat Odhlásit se + Moje recepty + Můj plán
            if (logoutBtn) logoutBtn.style.display = "inline-flex";
            if (loginBtn) loginBtn.style.display = "none";
            if (registerBtn) registerBtn.style.display = "none";

            if (myPlanLink) myPlanLink.style.display = "inline-flex";
            if (myRecipesLink) myRecipesLink.style.display = "inline-flex";
        } else {
            // Nepřihlášený → Přihlšení + Registrace, schovat „Moje recepty / Můj plán“
            if (logoutBtn) logoutBtn.style.display = "none";
            if (loginBtn) loginBtn.style.display = "inline-flex";
            if (registerBtn) registerBtn.style.display = "inline-flex";

            if (myPlanLink) myPlanLink.style.display = "none";
            if (myRecipesLink) myRecipesLink.style.display = "none";
        }
    }

    // Spustíme po načtení
    updateNavbar();


    // ---- OTEVÍRÁNÍ MODÁLŮ (na admin stránce stejně nejsou) ----
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            if (loginModal) loginModal.classList.add("active");
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            if (registerModal) registerModal.classList.add("active");
        });
    }


    // ---- ZAVÍRÁNÍ MODÁLŮ ----
    closeLoginBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            if (loginModal) loginModal.classList.remove("active");
        });
    });

    closeRegisterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            if (registerModal) registerModal.classList.remove("active");
        });
    });

    [loginModal, registerModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    });


    // ---- MOCK LOGIN (na adminu se nepoužije) ----
    if (loginForm && !isAdminPage) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const pass = document.getElementById("login-password").value.trim();

            if (!email || !pass) {
                alert("Vyplňte prosím e-mail i heslo.");
                return;
            }

            // PŘIHLÁŠENÍ (mock)
            setLoggedIn(true);
            alert("Úspěšně přihlášen (mock).");

            if (loginModal) loginModal.classList.remove("active");
        });
    }


    // ---- MOCK REGISTRACE (na adminu se nepoužije) ----
    if (registerForm && !isAdminPage) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("register-email").value.trim();
            const nick = document.getElementById("register-nickname").value.trim();
            const pass = document.getElementById("register-password").value;
            const pass2 = document.getElementById("register-password-confirm").value;
            const terms = document.getElementById("register-terms").checked;

            if (!email || !nick || !pass || !pass2) {
                alert("Vyplňte prosím všechna pole.");
                return;
            }

            if (pass !== pass2) {
                alert("Hesla se neshodují.");
                return;
            }

            if (!terms) {
                alert("Musíte přijmout podmínky.");
                return;
            }

            // REGISTRACE = rovnou přihlášení
            setLoggedIn(true);
            alert("Registrace úspěšná (mock).");

            if (registerModal) registerModal.classList.remove("active");
        });
    }


    // ---- ODHLAŠENÍ ----
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // všude odhlásíme
            setLoggedIn(false);
            alert("Byl(a) jste úspěšně odhlášen(a).");

            // ⭐ na admin stránce navíc přesměrovat na index1.html
            if (isAdminPage) {
                window.location.href = "index1.html";
            }
        });
    }
});
