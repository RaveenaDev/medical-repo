import React, {useState} from 'react'
import styles from "./sidebar.module.scss"
import {useNavigate} from "react-router-dom";

const sideOptions = [
    {title:"Overview",path:"/receptionist"},
    {title:"Patients",path:"patients"},
    {title:"Departments",path:"/departments"},
    {title:"Settings",path:"/settings"}
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = (index,option) => {
        setActiveIndex(index);
        navigate(`${option.path}`)
    }
    return (
        <div className={styles.sidebar}>
            <>
                {
                    sideOptions.map((option,index) => (
                        <div key={index} className={`${styles.sideElement} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => handleClick(index,option)}
                        >
                            {option.title}
                        </div>
                    ))
                }
            </>
        </div>
    )
}
export default Sidebar
