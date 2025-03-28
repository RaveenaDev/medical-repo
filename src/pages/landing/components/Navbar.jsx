import React from 'react'
import Logo from "../../../components/Logo/index.jsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', color: 'black',alignItems:'center',justifyContent:'space-between'}}>
            <img
                style={{width: "90px", height: "90px"}}
                src="/stepcarelogo.png"
            />
            <div style={{display:'flex',gap:'4.5rem',alignItems:'center'}}>
                <h4 style={{color:'white',cursor:'pointer',fontWeight:500}}>Home</h4>
                <h4 style={{color:'white',cursor:'pointer',fontWeight:500}}>About</h4>
                <h4 style={{color:'white',cursor:'pointer',fontWeight:500}}>Products</h4>
                <h4 style={{color:'white',cursor:'pointer',fontWeight:500}}>Contact Us</h4>
                <div style={{display:"flex",gap:'16px'}}>
                    <button style={{color:'#25307F',padding:'8px 28px',
                        backgroundColor:'white',borderRadius:'16px',outline: "none",}}>
                        Register
                    </button>
                    <button onClick={() => navigate('/login')}
                        style={{color:'#25307F',padding:'8px 28px',backgroundColor:'white',borderRadius:'16px',outline:'none'}}>Login</button>
                </div>
            </div>
        </div>
    )
}
export default Navbar
