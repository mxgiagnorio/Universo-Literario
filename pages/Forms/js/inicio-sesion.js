//Inicio de las validaciones para el inicio de sesión:

document.addEventListener("DOMContentLoaded", () => {
    async function validateLoginForm(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const form = event.target;
        let errors = {};

        // Limpia los mensajes de error anteriores
        const errorElements = form.querySelectorAll(".text-red-500");
        errorElements.forEach((element) => {
            element.innerText = "";
        });

        // Obtener valores de los campos
        const username = form.username.value.trim();
        const password = form.password.value.trim();
        const terms = form.terms.checked;

        // Validación del nombre de usuario
        if (!username) {
            errors.username = "El nombre de usuario es requerido";
        }

        // Validación de la contraseña
        if (!password) {
            errors.password = "La contraseña es requerida";
        }

        // Validación de términos
        if (!terms) {
            errors.terms = "Debes aceptar los términos y condiciones";
        }

        // Mostrar errores en el formulario
        for (let field in errors) {
            const errorElement = form.querySelector(`#${field}Error`);
            if (errorElement) {
                errorElement.innerText = errors[field];
            }
        }

        // Si hay errores, evitar el envío del formulario
        if (Object.keys(errors).length > 0) {
            return false;
        }

        // Si no hay errores, enviar datos al backend
        const data = {
            username: username,
            password: password
        };

        const actionUrl = form.action; // Usar la URL de acción del formulario

        try {
            const response = await fetch(actionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                localStorage.setItem("authToken", result.token); // Guardar el token en localStorage
                window.location.href = "../../index.html"; // Redirigir al index si la solicitud es exitosa
            } else {
                const error = await response.json();
                console.error("Error:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        return false;
    }

    // Agregar el event listener para manejar el envío del formulario
    document.getElementById("loginForm").addEventListener("submit", validateLoginForm);
});
