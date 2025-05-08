function ValidationUserDetail(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_pattern = /^0\d{9}$/;

  if (!values.userName || values.userName.trim() === "") {
    error.userName = "Name should not be empty";
  }

  if (!values.userEmail || values.userEmail.trim() === "") {
    error.userEmail = "Email should not be empty";
  } else if (!email_pattern.test(values.userEmail)) {
    error.userEmail = "Email format is invalid";
  }

  if (values.userPhone && !phone_pattern.test(values.userPhone)) {
    error.userPhone = "Phone must start with 0 and be exactly 10 digits";
  }
  return error;
}

export default ValidationUserDetail;
