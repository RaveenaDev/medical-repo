import React from 'react';
import './DoctorNotes.scss';
import { MoreHorizontal, Edit3, Trash2, Filter } from 'lucide-react';

const DoctorNotes = () => {
    return (
        <div className="doctor-notes">
            {/* Top Action Buttons */}
            <div className="top-bar1">
                <button className="btn-outline">
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.5 7H5.5V3H16.5V7ZM16.5 12.5C16.7597 12.5 16.9774 12.4042 17.1531 12.2125C17.3288 12.0208 17.4167 11.7833 17.4167 11.5C17.4167 11.2167 17.3288 10.9792 17.1531 10.7875C16.9774 10.5958 16.7597 10.5 16.5 10.5C16.2403 10.5 16.0226 10.5958 15.8469 10.7875C15.6712 10.9792 15.5833 11.2167 15.5833 11.5C15.5833 11.7833 15.6712 12.0208 15.8469 12.2125C16.0226 12.4042 16.2403 12.5 16.5 12.5ZM14.6667 19V15H7.33333V19H14.6667ZM16.5 21H5.5V17H1.83333V11C1.83333 10.15 2.10069 9.4375 2.63542 8.8625C3.17014 8.2875 3.81944 8 4.58333 8H17.4167C18.1958 8 18.849 8.2875 19.376 8.8625C19.9031 9.4375 20.1667 10.15 20.1667 11V17H16.5V21Z"
                            fill="#25307F"/>
                    </svg>
                    <p>Print Notes</p>
                </button>
                <button className="btn-primary">
                    <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.4173 11.9144H11.9173V17.4144H10.084V11.9144H4.58398V10.0811H10.084V4.58105H11.9173V10.0811H17.4173V11.9144Z"
                            fill="#25307F"/>
                    </svg>

                    <p>Add New Note</p>
                </button>
                <button className="btn-primary">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M18.5483 5.21221C18.9443 4.11679 17.8828 3.05529 16.7874 3.45221L3.39951 8.29404C2.30042 8.69188 2.16751 10.1915 3.17859 10.7773L7.45209 13.2514L11.2682 9.43529C11.4411 9.26831 11.6726 9.17592 11.913 9.17801C12.1533 9.1801 12.3832 9.2765 12.5532 9.44646C12.7231 9.61642 12.8195 9.84633 12.8216 10.0867C12.8237 10.327 12.7313 10.5586 12.5643 10.7315L8.74826 14.5475L11.2233 18.821C11.8081 19.8321 13.3078 19.6983 13.7056 18.6001L18.5483 5.21221Z"
                            fill="#25307F"/>
                    </svg>
                    <p>Send Summary</p>
                </button>
            </div>

            {/* Search + Filter */}
            <div className="search-filter">
                <input type="text" placeholder="Search"/>
                <button className="filter-btn">
                    <Filter size={16}/>
                    Filter
                </button>
            </div>

            {/* Doctor Note Card */}
            <div className="note-card">
                <div className="card-header">
                    <div className="left">
                        <div className='doctor-image'>
                            <img
                                src="https://randomuser.me/api/portraits/women/12.jpg"
                                alt="Patient"
                                className="doctor-image"
                            />
                        </div>
                        <div>
                            <h4>Dr. Amit Patil</h4>
                            <p className="datetime">22 May 2025 - 3:42 PM</p>
                            <p className="dept">Dept: Cardiology</p>
                        </div>
                    </div>
                    <div className="right">
                        <span className="follow-up">⚠️ Follow-up needed</span>
                        <MoreHorizontal size={18} />
                    </div>
                </div>

                <div className="observation">
                    <p className="label">Observation</p>
                    <p className="text">
                        “Patient reports occasional chest tightness post exertion. Advised to monitor BP daily for 7
                        days. Prescribed Amlodipine adjustment.”
                    </p>
                </div>

                <div className="note-meta">
                    <div className="meta-item">
                        <p className="label">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
                                    fill="#25307F"/>
                            </svg>
                            Diagnosis Context
                        </p>
                        <p>Hypertension Stage II</p>
                    </div>
                    <div className="meta-item" style={{marginTop: '1px'}}>
                        <p className="label">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.33249 2.5L6.66583 4.16667V5.83333H4.16583C3.20749 5.83333 2.59916 6.66667 2.49916 7.5L1.66583 15.8333C1.56583 16.6667 2.11583 17.5 3.33249 17.5H16.6658C17.8825 17.5 18.4325 16.6667 18.3325 15.8333L17.4992 7.5C17.3992 6.66667 16.7158 5.83333 15.8325 5.83333H13.3325V4.16667L11.6658 2.5H8.33249ZM8.33249 4.16667H11.6658V5.83333H8.33249V4.16667ZM9.16583 8.33333H10.8325V10.8333H13.3325V12.5H10.8325V15H9.16583V12.5H6.66583V10.8333H9.16583V8.33333Z"
                                    fill="#2E823B"/>
                            </svg>
                            Action Taken
                        </p>
                        <p>Modified Amlodipine dosage</p>
                    </div>
                    <div className="meta-item">
                        <p className="label">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.25 18C6.51667 18 5.04167 17.3917 3.825 16.175C2.60833 14.9583 2 13.4833 2 11.75C2 10.0167 2.60833 8.54167 3.825 7.325C5.04167 6.10833 6.51667 5.5 8.25 5.5H17.5C18.75 5.5 19.8127 5.93767 20.688 6.813C21.5633 7.68833 22.0007 8.75067 22 10C21.9993 11.2493 21.562 12.312 20.688 13.188C19.814 14.064 18.7513 14.5013 17.5 14.5H8.75C7.98333 14.5 7.33333 14.2333 6.8 13.7C6.26667 13.1667 6 12.5167 6 11.75C6 10.9833 6.26667 10.3333 6.8 9.8C7.33333 9.26667 7.98333 9 8.75 9H18V11H8.75C8.53333 11 8.35433 11.071 8.213 11.213C8.07167 11.355 8.00067 11.534 8 11.75C7.99933 11.966 8.07033 12.1453 8.213 12.288C8.35567 12.4307 8.53467 12.5013 8.75 12.5H17.5C18.2 12.4833 18.7917 12.2377 19.275 11.763C19.7583 11.2883 20 10.7007 20 10C20 9.29933 19.7583 8.70767 19.275 8.225C18.7917 7.74233 18.2 7.50067 17.5 7.5H8.25C7.06667 7.48333 6.06267 7.89167 5.238 8.725C4.41333 9.55833 4.00067 10.5667 4 11.75C4 12.9167 4.41267 13.9083 5.238 14.725C6.06333 15.5417 7.06733 15.9667 8.25 16H18V18H8.25Z"
                                    fill="#25307F"/>
                            </svg>
                            Attachments
                        </p>
                        <p>None</p>
                    </div>
                </div>

                <div className="actions">
                    <button className="edit"><Edit3 size={16}/> Edit</button>
                    <button className="delete"><Trash2 size={16}/> Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorNotes;
