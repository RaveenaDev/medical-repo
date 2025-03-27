import React from 'react'
import Navbar from "./components/Navbar.jsx";
import background from "../../assets/image 7.png"

const Base = () => {
    return (
        <>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: "94.9vh", // ye full screen height 100vh isliye nhi di because humne padding use kr rkhi hai
                padding:'18px 3rem 18px 22px'
            }}>
                <Navbar/>

                <div style={{
                    marginLeft:'20px',
                    marginTop:'10rem',
                    width:'31rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white
                    backdropFilter: 'blur(10px)', // Blurred effect
                    padding: '15px 22px',
                    borderRadius: '10px' // Optional for a softer look
                }}>
                    <h2 style={{fontSize:'31px',fontWeight:400,color:'gray'}}>Transform Hospital Operations with Our</h2>
                    <h2 style={{fontSize:'31px',fontWeight:400,color:'#25307F',marginBottom:'4px'}}>All-in-One Management Portal</h2>
                    <p style={{color:'gray',fontSize:'17px',width:"460px"}}>Streamline workflows, enhance patient care, and optimize revenue with role-based access for Admin,Reception, and Doctors.</p>
                    <button style={{color:'white',marginTop:"22px",padding:'6px 28px',
                        backgroundColor:'#25307F',borderRadius:'16px',outline: "none",}}>
                        Show More
                    </button>
                </div>
            </div>
        </>

    )
}
export default Base
