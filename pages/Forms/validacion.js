function validateForm(form, validationRules) {
  let errors = {};

  // Limpia los mensajes que quedaron anteriores
  const errorElements = form.querySelectorAll(".error-text");
  errorElements.forEach((element) => {
    element.innerText = "";
  });

  // Validacion de los campos
  for (let field in validationRules) {
    const value = form[field].value;
    const rules = validationRules[field];

    if (rules.required && !value) {
      errors[field] = rules.requiredMessage || "Este campo es requerido";
    } else if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.patternMessage || "Formato inválido";
    } else if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `Debe tener al menos ${rules.minLength} caracteres`;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `Debe tener como máximo ${rules.maxLength} caracteres`;
    } else if (rules.custom && !rules.custom(value)) {
      errors[field] = rules.customMessage || "Valor inválido";
    }
  }

  if (form.terms) {
    if (!form.terms.checked) {
      errors.terms = "Debes aceptar los términos y condiciones";
    }
  }

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

  // vuelve al index
  window.location.href = "../../index.html";
  return false;
}

const registerValidationRules = {
  nombre: {
    required: true,
    requiredMessage: "El nombre es requerido",
    pattern: /^[a-zA-Z ]+$/,
    patternMessage: "Solo se aceptan letras",
  },
  apellido: {
    required: true,
    requiredMessage: "El apellido es requerido",
    pattern: /^[a-zA-Z ]+$/,
    patternMessage: "Solo se aceptan letras",
  },
  email: {
    required: true,
    requiredMessage: "El correo electrónico es requerido",
    pattern: /\S+@\S+\.\S+/,
    patternMessage: "Correo electrónico inválido",
  },
  password: {
    required: true,
    requiredMessage: "La contraseña es requerida",
    minLength: 6,
    minLengthMessage: "La contraseña debe tener al menos 6 caracteres",
  },
  fechaNacimiento: {
    required: true,
    requiredMessage: "La fecha de nacimiento es requerida",
  },
  pais: {
    required: true,
    requiredMessage: "El país es requerido",
  },
  terms: {
    required: true,
    requiredMessage: "Debes aceptar los términos y condiciones",
  },
};

const loginValidationRules = {
  email: {
    required: true,
    requiredMessage: "El correo electrónico es requerido",
    pattern: /\S+@\S+\.\S+/,
    patternMessage: "Correo electrónico inválido",
  },
  password: {
    required: true,
    requiredMessage: "La contraseña es requerida",
    minLength: 6,
    minLengthMessage: "La contraseña debe tener al menos 6 caracteres",
  },
  terms: {
    required: true,
    requiredMessage: "Debes aceptar los términos y condiciones",
  },
};
