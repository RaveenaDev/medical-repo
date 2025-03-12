const AdminDetailsForm = ({ handleNext }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input_Group">
        <label>Administrator Name</label>
        <input type="text" required />
      </div>
      <div className="input_Group">
        <label>Administrator Contact</label>
        <input type="tel" required />
      </div>
      <button className="next_Button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
};

export default AdminDetailsForm;
