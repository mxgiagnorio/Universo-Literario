
//Validaciones para el registro:

document.addEventListener("DOMContentLoaded", () => {
  async function validateForm(event) {
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
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const fullName = form.fullName.value.trim();
    const terms = form.terms.checked;

    // Validación del nombre de usuario
    if (!username) {
      errors.username = "El nombre de usuario es requerido";
    }

    // Validación del email
    const emailPattern = /\S+@\S+\.\S+/;
    if (!email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!emailPattern.test(email)) {
      errors.email = "Correo electrónico inválido";
    }

    // Validación de la contraseña
    if (!password) {
      errors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // Validación del nombre completo
    if (!fullName) {
      errors.fullName = "El nombre completo es requerido";
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
      email: email,
      password: password,
      fullName: fullName
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
        window.location.href = "./inicio.html"; // Redirigir al inicio si la solicitud es exitosa
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    return false;
  }

  // Agregar el event listener para manejar el envío del formulario de registro
  document.getElementById("registerForm").addEventListener("submit", validateForm);
});


