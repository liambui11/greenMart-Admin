function ValidationStaff(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phone_pattern = /^0\d{9}$/;

  if (!values.name || values.name.trim() === "") {
    error.name = "Name should not be empty";
  }

  if (!values.pass || values.pass.trim() === "") {
    error.pass = "Pass should not be empty";
  }

  if (!values.position || values.position.trim() === "") {
    error.position = "Position should not be empty";
  }

  if (!values.email || values.email.trim() === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  }

  if (!values.phone || values.phone.trim() === "") {
    error.phone = "Phone number is required";
  } else if (!/^0\d{9}$/.test(values.phone)) {
    error.phone = "Phone must start with 0 and be exactly 10 digits";
  }

  return error;
}

export default ValidationStaff;
