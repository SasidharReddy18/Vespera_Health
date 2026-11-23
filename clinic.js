// Vespera Health — appointment form interaction and date guard.
const patientForm = document.querySelector("#patientForm");
const formStatus = document.querySelector("#formStatus");
const dateField = document.querySelector("#visitDate");

// Prevent selecting a date earlier than today.
const localToday = new Date();
const dateStamp = new Date(
  localToday.getTime() - localToday.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);
dateField.min = dateStamp;

patientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!patientForm.checkValidity()) {
    patientForm.reportValidity();
    return;
  }

  const submittedValues = new FormData(patientForm);
  const patient = String(submittedValues.get("patientName") || "").trim();
  const department = submittedValues.get("department");

  if (patient.length < 2) {
    formStatus.textContent = "Please enter a name with at least two characters.";
    document.querySelector("#patientName").focus();
    return;
  }

  formStatus.textContent =
    `Thank you, ${patient}. Your ${department} appointment request is ready for review.`;
  patientForm.reset();
  dateField.min = dateStamp;
  formStatus.focus();
});
