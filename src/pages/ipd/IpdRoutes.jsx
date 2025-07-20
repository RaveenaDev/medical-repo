import React, {useEffect} from 'react'
import {Route, Routes} from "react-router-dom";
import IpdOverview from "./index.jsx";

const IpdRoutes = (props) => {
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);
    return (
        <Routes>
            <Route index element={<IpdOverview/>} />
        </Routes>
    )
}
export default IpdRoutes
