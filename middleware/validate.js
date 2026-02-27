const validate = (schema) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }
  req.body = result.value;
  next();
};
module.exports = validate;
