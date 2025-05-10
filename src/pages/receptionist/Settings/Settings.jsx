import React, { useState } from 'react'
import Faq from './Faq'
import styles from './Settings.module.scss'


const Settings = () => {
  return (
    <div>
       className= {styles.settings}
        <div className={styles.component_panel}>
          <Faq/>
        </div>
      
    </div>
  )
}

export default Settings