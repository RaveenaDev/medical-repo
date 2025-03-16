import React from "react";

const SuccessModal = ({ message, onClose }) => {
    return (
        <div style={{position:"fixed",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{backgroundColor:"black",padding:"16px",borderRadius:"12px",boxShadow:"4px",textAlign:"center"}}>
                <h2 className="text-green-600 text-xl font-semibold" style={{color:"green"}}>Success</h2>
                <p className="mt-2">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
