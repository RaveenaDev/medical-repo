import React, {useEffect, useState} from 'react'
import rav from "../styles.module.scss";
import {Box, Container, Typography} from "@mui/material";
import EntityBasedTable from "../EntityBasedTable/index.jsx";

const Help = (props) => {

  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  return (
      <>
        <div className={rav.receptionist}>
          {!props.entity ?
              <>
                <div style={{color: 'black'}}>Help & Support</div>
              </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex}/>}
        </div>
      </>
  )
}

export default Help