function ValidationStaff(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_pattern = /^0\d{9}$/;

  if (!values.staffName || values.staffName.trim() === "") {
    error.staffName = "Name should not be empty";
  }

  if (!values.staffEmail || values.staffEmail.trim() === "") {
    error.staffEmail = "Email should not be empty";
  } else if (!email_pattern.test(values.staffEmail)) {
    error.staffEmail = "Email format is invalid";
  }

  if (!values.staffPhone || values.staffPhone.trim() === "") {
    error.staffPhone = "Phone number is required";
  } else if (!phone_pattern.test(values.staffPhone)) {
    error.staffPhone = "Phone must start with 0 and be exactly 10 digits";
  }

  if (values.staffPassword && values.staffPassword.trim() !== "") {
    if (values.staffPassword.length < 6) {
      error.staffPassword = "Password must be at least 6 characters";
    }
  }

  return error;
}

export default ValidationStaff;
