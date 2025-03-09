    async function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMsg = document.getElementById("error-msg");

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("role", data.role);
                sessionStorage.setItem("user", JSON.stringify(data.user)); // Store full user data

                // Redirect based on role
                if (data.role === "admin") {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "user-dashboard.html";
                }
            } else {
                errorMsg.innerText = data.message;
            }
        } catch (error) {
            errorMsg.innerText = "Error logging in.";
        }
    }

    // Check role on page load
    function checkAuth() {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");

        if (!token) {
            window.location.href = "index.html"; // Redirect to login if not authenticated
        }

        if (role === "admin" && window.location.pathname !== "/admin-dashboard.html") {
            window.location.href = "admin-dashboard.html";
        } else if (role === "user" && window.location.pathname !== "/user-dashboard.html") {
            window.location.href = "user-dashboard.html";
        }
    }

    // Run checkAuth on dashboard pages
    if (window.location.pathname.includes("dashboard")) {
        checkAuth();
    }

    // Logout function
    function logout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }
