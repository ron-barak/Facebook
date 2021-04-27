const Textarea = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        rows="8"
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Textarea;
