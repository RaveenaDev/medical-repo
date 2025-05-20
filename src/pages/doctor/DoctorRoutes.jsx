import React from 'react'
import {Route, Routes} from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";

const DoctorRoutes = () => {
    return (
        <Routes>
            <Route index element={<DoctorOverview />} />
            <Route path="/calendar" element={<Calender />} />
        </Routes>
    )
}
export default DoctorRoutes
