const LegalUploadsForm = ({ handleNext }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input_Group">
        <label>Upload License</label>
        <input type="file" required />
      </div>
      <div className="input_Group">
        <label>Upload Compliance Documents</label>
        <input type="file" required />
      </div>
      <button className="next_Button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
};

export default LegalUploadsForm;
