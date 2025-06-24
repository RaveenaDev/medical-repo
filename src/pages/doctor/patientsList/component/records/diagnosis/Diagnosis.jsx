import React from "react";
import "./Diagnosis.scss";
const Diagnosis = () => {
  return (
    <div className="diagnosis-container">
      <section className="diagnosis_info">
        <div className="diagnosis_info_row">
          <div>Medical Record - Visit date: 22 May 2025</div>
          <div>#MR-2024-1847</div>
        </div>
        <div className="diagnosis_info_row">
          <div>Dr. Amit Patel - Cardiologist</div>
          <div className="last_updated">Last Updated: 22 May 2025</div>
        </div>
      </section>
      <section className="diagnosis_actions">
        <div className="action_button">Print Report</div>
        <div className="action_button">Edit Note</div>
        <div className="action_button">Share to Referral</div>
      </section>
      <section className="diagnosis_details">
        <div className="diagnosis">
          <div className="diagnosis_icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.93007 10.3759L12.0801 15.3939C12.1469 15.5503 12.2526 15.6869 12.387 15.7911C12.5214 15.8952 12.6801 15.9633 12.8481 15.9891C13.0162 16.0148 13.188 15.9972 13.3474 15.9381C13.5068 15.8789 13.6485 15.7801 13.7591 15.6509L13.8321 15.5549L15.5351 12.9999H21.4421C19.5271 17.7379 13.2771 20.9999 12.0001 20.9999C10.7501 20.9999 4.73007 17.8729 2.68407 13.2939L2.55807 12.9999H8.00007C8.16466 13 8.32671 12.9594 8.47185 12.8817C8.61699 12.8041 8.74072 12.6919 8.83207 12.5549L8.89407 12.4469L9.93007 10.3759ZM12.0001 4.33894C14.0721 2.65294 16.5341 2.65894 18.4941 3.80094C20.5891 5.02194 22.0631 7.50094 21.9981 10.3929L21.9841 10.6979L21.9571 10.9999H15.0001C14.8564 10.9999 14.7145 11.0307 14.5839 11.0904C14.4532 11.1501 14.337 11.2373 14.2431 11.3459L14.1681 11.4459L13.1921 12.9089L10.9191 7.60594C10.8482 7.44068 10.7341 7.29757 10.5888 7.19168C10.4435 7.08579 10.2723 7.02105 10.0933 7.00426C9.91428 6.98748 9.73404 7.01927 9.57157 7.09629C9.40909 7.17332 9.27039 7.29272 9.17007 7.44194L9.10607 7.55194L7.38207 10.9999H2.04207C2.01994 10.7983 2.0066 10.5958 2.00207 10.3929C1.93707 7.50094 3.41107 5.02294 5.50607 3.80094C7.46607 2.65994 9.92807 2.65194 12.0001 4.33894Z"
                fill="#25307F"
              />
            </svg>
          </div>
          <div className="diagnosis_text">
            <div className="diagnosis_head">Primary Condition</div>
            <div className="diagnosis_desc">Hypertension (Stage 2)</div>
          </div>
          <div className="diagnosis_info_icon">
            <img src="/infoicon.svg" alt="infoicon" />
          </div>
        </div>
        <div className="diagnosis">
          <div className="diagnosis_icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.93007 10.3759L12.0801 15.3939C12.1469 15.5503 12.2526 15.6869 12.387 15.7911C12.5214 15.8952 12.6801 15.9633 12.8481 15.9891C13.0162 16.0148 13.188 15.9972 13.3474 15.9381C13.5068 15.8789 13.6485 15.7801 13.7591 15.6509L13.8321 15.5549L15.5351 12.9999H21.4421C19.5271 17.7379 13.2771 20.9999 12.0001 20.9999C10.7501 20.9999 4.73007 17.8729 2.68407 13.2939L2.55807 12.9999H8.00007C8.16466 13 8.32671 12.9594 8.47185 12.8817C8.61699 12.8041 8.74072 12.6919 8.83207 12.5549L8.89407 12.4469L9.93007 10.3759ZM12.0001 4.33894C14.0721 2.65294 16.5341 2.65894 18.4941 3.80094C20.5891 5.02194 22.0631 7.50094 21.9981 10.3929L21.9841 10.6979L21.9571 10.9999H15.0001C14.8564 10.9999 14.7145 11.0307 14.5839 11.0904C14.4532 11.1501 14.337 11.2373 14.2431 11.3459L14.1681 11.4459L13.1921 12.9089L10.9191 7.60594C10.8482 7.44068 10.7341 7.29757 10.5888 7.19168C10.4435 7.08579 10.2723 7.02105 10.0933 7.00426C9.91428 6.98748 9.73404 7.01927 9.57157 7.09629C9.40909 7.17332 9.27039 7.29272 9.17007 7.44194L9.10607 7.55194L7.38207 10.9999H2.04207C2.01994 10.7983 2.0066 10.5958 2.00207 10.3929C1.93707 7.50094 3.41107 5.02294 5.50607 3.80094C7.46607 2.65994 9.92807 2.65194 12.0001 4.33894Z"
                fill="#25307F"
              />
            </svg>
          </div>
          <div className="diagnosis_text">
            <div className="diagnosis_head">Secondary Issues</div>
            <div className="diagnosis_desc">
              <div> Mild arrhythmia</div> <div>cholesterol elevation</div>
            </div>
          </div>
          <div className="diagnosis_info_icon">
            <img src="/infoicon.svg" alt="infoicon" />
          </div>
        </div>
        <div className="diagnosis">
          <div className="diagnosis_icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V9M4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8M4 9H20M20 9V7C20 6.46957 19.7893 5.96086 19.4142 5.58579C19.0391 5.21071 18.5304 5 18 5H16M8 5H16M8 5V3M16 5V3"
                stroke="#25307F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="diagnosis_text">
            <div className="diagnosis_head">Diagnosis Date</div>
            <div className="diagnosis_desc">Diagnosed on - 10 April 2025</div>
          </div>
          <div className="diagnosis_info_icon">
            <img src="/infoicon.svg" alt="infoicon" />
          </div>
        </div>
      </section>
      <section className="diagnosis_button_container">
        <div className="diagnosis_button">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1537 5.75093C10.6193 5.05675 9.89417 4.53337 9.06701 4.24484C8.23984 3.9563 7.34651 3.91512 6.49631 4.12633C5.6461 4.33754 4.8759 4.79198 4.27992 5.43406C3.68394 6.07613 3.28803 6.878 3.14062 7.74156M11.3749 3.44434V5.97211H8.84708M4.01144 11.2489C4.54568 11.9433 5.27079 12.4669 6.09803 12.7556C6.92526 13.0444 7.81872 13.0856 8.66905 12.8744C9.51937 12.6631 10.2897 12.2086 10.8856 11.5663C11.4816 10.924 11.8774 10.1219 12.0245 9.25823M3.7909 13.5554V11.0277H6.31867"
              stroke="#DAE4FF"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Compare Past Diagnosis
        </div>
      </section>
    </div>
  );
};

export default Diagnosis;
