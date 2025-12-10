document.addEventListener("DOMContentLoaded", function () {
    // ---- HTML ELEMENTY ----
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");

    const loginBtn = document.getElementById("open-login-modal");
    const registerBtn = document.getElementById("open-register-modal");
    const logoutBtn = document.getElementById("logout-button");

    // odkazy v navigaci
    const myPlanLink = document.getElementById("nav-my-plan");
    const myRecipesLink = document.getElementById("nav-my-recipes");

    // odkaz na stránku Můj profil v navigaci
    const profileLink = document.querySelector('a[href="muj-profil.html"]');

    // tlačítka „Přidat plán“ – buď s vlastní class, nebo konkrétní na stránce jídelníčku
    const addPlanButtons = document.querySelectorAll(
        ".add-to-plan-btn, .recipe-intro-text .button.button-primary"
    );

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

    // ---- INFO O STRÁNCE ----
    const path = window.location.pathname.toLowerCase();

    const isAdminPage =
        path.includes("admin.html") || path.endsWith("/admin");

    const isMyPlanPage =
        path.includes("muj-plan.html") || path.includes("muj-plan");

    const isMyRecipesPage =
        path.includes("moje-recepty.html") || path.includes("moje-recepty");

    const isRecipeDetailPage =
        path.includes("recept_detail.html") || path.includes("recept_detail");

    const isCreateRecipePage =
        path.includes("tvorba-receptu.html") || path.includes("tvorba-receptu");

    // ---- SPRÁVA LOGIN STAVU ----
    const AUTH_KEY = "mealprep_logged_in"; // true/false v localStorage

    function isLoggedIn() {
        return localStorage.getItem(AUTH_KEY) === "true";
    }

    function setLoggedIn(value) {
        localStorage.setItem(AUTH_KEY, value ? "true" : "false");
        updateNavbar();
    }

    function updateNavbar() {
        // ADMIN STRÁNKA – tlačítko Odhlásit se je vždy vidět, ostatní věci schovat
        if (isAdminPage) {
            if (logoutBtn) logoutBtn.style.display = "inline-flex";

            if (loginBtn) loginBtn.style.display = "none";
            if (registerBtn) registerBtn.style.display = "none";
            if (myPlanLink) myPlanLink.style.display = "none";
            if (myRecipesLink) myRecipesLink.style.display = "none";
            if (profileLink) profileLink.style.display = "none";

            return;
        }

        // OSTATNÍ STRÁNKY
        if (isLoggedIn()) {
            // Přihlášený → ukázat Odhlásit se + Moje recepty + Můj plán + Můj profil
            if (logoutBtn) logoutBtn.style.display = "inline-flex";
            if (loginBtn) loginBtn.style.display = "none";
            if (registerBtn) registerBtn.style.display = "none";

            if (myPlanLink) myPlanLink.style.display = "inline-flex";
            if (myRecipesLink) myRecipesLink.style.display = "inline-flex";
            if (profileLink) profileLink.style.display = "inline-flex";
        } else {
            // Nepřihlášený → Přihlášení + Registrace, schovat „Moje recepty / Můj plán / Můj profil“
            if (logoutBtn) logoutBtn.style.display = "none";
            if (loginBtn) loginBtn.style.display = "inline-flex";
            if (registerBtn) registerBtn.style.display = "inline-flex";

            if (myPlanLink) myPlanLink.style.display = "none";
            if (myRecipesLink) myRecipesLink.style.display = "none";
            if (profileLink) profileLink.style.display = "none";
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

    // ---- MOCK PŘIHLÁŠENÍ (na adminu se nepoužije) ----
    if (loginForm && !isAdminPage) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // tady by normálně byla validace, ale pro účely projektu stačí „mock“ login
            setLoggedIn(true);
            alert("Přihlášení úspěšné (mock).");

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

    // ---- PŘIDÁNÍ PLÁNU Z DETAILU JÍDELNÍČKU ----
    addPlanButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "muj-plan.html";
        });
    });

    // ---- ODHLAŠENÍ ----
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // všude odhlásíme
            setLoggedIn(false);
            alert("Byl(a) jste úspěšně odhlášen(a).");

            const shouldRedirectAfterLogout =
                isAdminPage ||
                isMyPlanPage ||
                isMyRecipesPage ||
                isRecipeDetailPage ||
                isCreateRecipePage;

            if (shouldRedirectAfterLogout) {
                window.location.href = "index.html";
            }
        });
    }
});
