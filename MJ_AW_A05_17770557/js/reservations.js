"use strict"
const getElement = (selector) => document.querySelector(selector);
// Helper Functions

// Functions

// Form Elements
// -- General Info
// -- Room Type
// -- Bed Type
// -- Contact Info
const inputName = getElement("#name");
const inputEmail = getElement("#email");
const inputPhone = getElement("#phone");
// -- Buttons
const submitButton = getElement("#submit");
const resetButton = getElement("#reset");
// -- Error Messages
const dateMessage = getElement("#date-message");
const nightsMessage = getElement("#nights-message");
const nameMessage = getElement("#name-message");
const emailMessage = getElement("#email-message");
const phoneMessage = getElement("#phone-message");
// Event Listeners
