import React, {useEffect, useState} from 'react'
import ReceptionPage from "./ReceptionPage.jsx";
import CommonPanel from "../Components/CommonPanel.jsx";

function Reception(props) {
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);
    return (
        <>
            <CommonPanel/>
            <ReceptionPage/>
        </>
    );
}

export default Reception;
