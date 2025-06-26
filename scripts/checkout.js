"use strict";

const form = document.getElementById("checkout-Form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;


  const fName = document.getElementById("fName");
  const errorName = document.getElementById("errorName");

  if (fName.value.trim().length < 3 || !/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(fName.value)) {
    fName.classList.add("is-invalid");
    errorName.textContent = "Name must be at least 3 characters long and contain only letters.";
    isValid = false;
  } else {
    fName.classList.remove("is-invalid");
    fName.classList.add("is-valid")
    errorName.textContent = "";
  }


  const fLastN = document.getElementById("fLastN");
  const errorLastN = document.getElementById("errorLastN");

  if (fLastN.value.trim().length < 3 || !/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(fLastN.value)) {
    fLastN.classList.add("is-invalid");
    errorLastN.textContent = "Last name must be at least 3 characters long and contain only letters.";
    isValid = false;
  } else {
    fLastN.classList.remove("is-invalid");
    fLastN.classList.add("is-valid");
    errorLastN.textContent = "";
  }


  const fEmail = document.getElementById("fEmail");
  const errorEmail = document.getElementById("errorEmail");

  if (
    fEmail.value.trim().length < 3 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value)
  ) {
    fEmail.classList.add("is-invalid");
    errorEmail.textContent = "Invalid email address.";
    isValid = false;
  } else {
    fEmail.classList.remove("is-invalid");
    fEmail.classList.add("is-valid")
    errorEmail.textContent = "";
  }


  const fAddress = document.getElementById("fAddress");
  const errorAddress = document.getElementById("errorAddress");

  if (fAddress.value.trim().length < 3) {
    fAddress.classList.add("is-invalid");
    errorAddress.textContent = "Address must be at least 3 characters long.";
    isValid = false;
  } else {
    fAddress.classList.remove("is-invalid");
    fAddress.classList.add("is-valid");
    errorAddress.textContent = "";
  }


  const fPassword = document.getElementById("fPassword");
  const errorPassword = document.getElementById("errorPassword");

  if (
    fPassword.value.trim().length < 4 ||
    fPassword.value.trim().length > 8 ||
    !/(?=.*[A-Za-z])(?=.*\d)/.test(fPassword.value)
  ) {
    fPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "Must be between 4 and 8 characters long, containing both letters and numbers.";
    isValid = false;
  } else {
    fPassword.classList.remove("is-invalid");
    fPassword.classList.add("is-valid");
    errorPassword.textContent = "";
  }


  const fPhone = document.getElementById("fPhone");
  const errorPhone = document.getElementById("errorPhone");

  if (!/^\d{9}$/.test(fPhone.value)) {
    fPhone.classList.add("is-invalid");
    errorPhone.textContent = "Phone number must have exactly 9 digits.";
    isValid = false;
  } else {
    fPhone.classList.remove("is-invalid");
    fPhone.classList.add("is-valid");
    errorPhone.textContent = "";
  }

  
  if (isValid) {
    const successModal = new bootstrap.Modal(document.getElementById("successModal"));
    successModal.show();
    form.reset();
  }
});
