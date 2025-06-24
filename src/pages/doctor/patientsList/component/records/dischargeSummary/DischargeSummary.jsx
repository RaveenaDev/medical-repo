import React from 'react';
import './DischargeSummary.scss';

const DischargeSummary = () => {
    return (
        <div className="discharge-summary">
            {/* Patient Info */}
            <div className="section">
                <h3>Patient info</h3>
                <div className="info-grid">
                    <div><strong>Patient name:</strong> Jasmeet Kaur</div>
                    <div><strong>Admitted On:</strong> 3 June 2025</div>
                    <div><strong>Patient ID:</strong> XXXXX</div>
                    <div><strong>Emergency Contact:</strong> Amanjeet Singh</div>
                    <div><strong>Contact info:</strong> (+91)9894896909</div>
                    <div><strong>Relationship:</strong> Spouse</div>
                    <div><strong>Age:</strong> 27</div>
                    <div><strong>Contact:</strong> (+91)9478492408</div>
                </div>
            </div>

            {/* Clinical Summary */}
            <div className="section">
                <h3>Clinical Summary</h3>
                <p><strong>Reason for Admission:</strong> Chest pain and shortness of breath</p>
                <p><strong>Findings:</strong> ECG showed mild ischemia. Elevated cardiac enzymes.</p>
            </div>

            {/* Treatment + Diagnosis */}
            <div className="section treatment-diagnosis">
                <div>
                    <h4>Treatment Given</h4>
                    <p>IV Nitroglycerin, Aspirin, Beta-blockers, Oxygen support</p>
                </div>
                <div>
                    <h4>Diagnosis</h4>
                    <p>Unstable Angina.</p>
                </div>
            </div>

            {/* Hospital Course */}
            <div className="section hospital-course">
                <h4>Hospital Course</h4>
                <p>Patient responded well to treatment, vitals stabilized. No further chest pain episodes. Discharged in stable condition.</p>
            </div>

            {/* Advice & Medications */}
            <div className="section advice-medication">
                <div className="box">
                    <h4>Advice & Follow-Up</h4>
                    <p><strong>Diet:</strong> Low salt, low fat</p>
                    <p><strong>Activity:</strong> Light walking, avoid exertion</p>
                    <p><strong>Follow-Up:</strong> Cardiology OPD after 1 week</p>
                    <p><strong>Warning Signs:</strong> Chest pain, fainting, breathlessness – seek immediate care</p>
                </div>
                <div className="box">
                    <h4>Medications on Discharge</h4>
                    <ul>
                        <li>Aspirin 75mg – Once daily</li>
                        <li>Metoprolol 25mg – Twice daily</li>
                        <li>Atorvastatin 20mg – Once at night</li>
                    </ul>
                </div>
            </div>

            {/* Signature */}
            <div className="signature">
                <div>
                    <hr/>
                    <p>Dr. Anjali Verma<br/>Cardiology Department</p></div>
            </div>
        </div>
    );
};

export default DischargeSummary;
