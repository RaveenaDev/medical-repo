import React, {useState} from 'react'
import imageMed from '../assets/imagemed.png'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };
    return (
        <div style={{color:'black',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',padding:'4rem 2rem 1rem 4rem'}}>
            <div>
                <img src={imageMed} alt="Medicine" style={{height:'85vh',width:'40vw'}}/>
            </div>
            <div >
                <h3 style={{color:'#5663C2',fontSize:'25px',fontWeight:500,height:'35px'}}>Contact Us</h3>
                <h2 style={{color:'#25307F',fontSize:'35px'}}>We're Here to Help !</h2>
                <div style={{marginTop:"2rem"}}>
                    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                height:'32px',
                                width:'70%',
                                padding: "10px 20px",
                                marginBottom: "10px",
                                border: "1px solid #E9EDF0",
                                borderRadius: "2px",
                                backgroundColor:'#E9EDF0',
                                fontSize:'14px',
                                outline: "none" // Removes the black border on focus
                            }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                height:'32px',
                                width:'70%',
                                padding: "10px 20px",
                                marginBottom: "10px",
                                border: "1px solid #E9EDF0",
                                borderRadius: "2px",
                                backgroundColor:'#E9EDF0',
                                fontSize:'14px',
                                outline: "none"
                            }}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                                height:'32px',
                                width:'70%',
                                padding: "10px 20px",
                                marginBottom: "10px",
                                border: "1px solid #E9EDF0",
                                borderRadius: "2px",
                                backgroundColor:'#E9EDF0',
                                fontSize:'14px',
                                outline: "none"
                            }}
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{
                                width:'70%',
                                height:'7rem',
                                padding: "10px 20px",
                                marginBottom: "10px",
                                border: "1px solid #E9EDF0",
                                borderRadius: "2px",
                                backgroundColor:'#E9EDF0',
                                fontSize:'14px',
                                outline: "none"
                            }}
                        ></textarea>
                        <button
                            type="submit"
                            style={{
                                background: "#25307F",
                                color: "white",
                                padding: "10px 3.5rem",
                                borderRadius: "12px",
                                cursor: "pointer",
                                border: "none",
                                width:'fit-content',
                                outline: "none"
                            }}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ContactUs
