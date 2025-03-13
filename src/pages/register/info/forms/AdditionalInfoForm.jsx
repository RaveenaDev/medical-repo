const AdditionalInfoForm = ({ handleNext }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="input_Group">
        <label>Additional Notes</label>
        <textarea required></textarea>
      </div>
      <button className="next_Button" onClick={handleNext}>
        Submit
      </button>
    </form>
  );
};

export default AdditionalInfoForm;
