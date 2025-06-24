import React from 'react';
import './Procedures.scss';
import { Eye } from 'lucide-react'; // for the Details eye icon (optional)

const Procedures = () => {
    const procedureData = [
        { date: "12 June 2025", name: "ECG", performedBy: "Nurse Kavita", status: "Completed" },
        { date: "2 June 2025", name: "Blood Work (CBC)", performedBy: "Lab Tech Rahul", status: "Completed" },
        { date: "25 May 2025", name: "IV Cannula Insertion", performedBy: "Nurse Rohan", status: "Completed" },
    ];

    return (
        <div className="procedures">
            <div className="procedures__header">
                <button className="btn-outline">Download Summary</button>
                <button className="btn-primary">Send for Review</button>
            </div>

            <div className="procedures__summary">
                <div className="summary-item">
                    <div className="count">11</div>
                    <div>Total Procedures</div>
                </div>
                <div className="summary-item">
                    <div className="count critical">2</div>
                    <div>Critical Interventions</div>
                </div>
                <div className="summary-item last-performed">
                    <div>Last Performed</div>
                    <div className="sub">ECG - 12 June 2025</div>
                </div>
            </div>

            <div className="procedures__log">
                <h4>📋 Procedure Log</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Procedure Name</th>
                        <th>Performed By</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {procedureData.map((proc, index) => (
                        <tr key={index}>
                            <td>{proc.date}</td>
                            <td>{proc.name}</td>
                            <td>{proc.performedBy}</td>
                            <td className="status completed">{proc.status}</td>
                            <td className="action">
                                <button className="details-btn"><Eye size={16} /> Details</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Procedures;
