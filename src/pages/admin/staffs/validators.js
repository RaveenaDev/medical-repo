export const validateStaff = (data, isEdit = false) => {
  const errors = {};
  // profile is optional

  const required = [
    "staff_id",
    "name",
    "phone",
    "department",
    "designation",
    "status",
  ];
  required.forEach((k) => {
    if (!data?.[k]) errors[k] = "This field is required";
  });

  if (data?.phone && !/^\d{10}$/.test(String(data.phone).trim())) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  // for edit, require staffId (backend expects it)
  if (isEdit && !data?.staffId) {
    errors.staffId = "Missing staffId";
  }

  return { ok: Object.keys(errors).length === 0, errors };
};
