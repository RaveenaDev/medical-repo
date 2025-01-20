import React, { useState } from 'react';
import { Tab, Tabs, Box, Button, Table } from '@mui/material';
import {Table as CustomTable} from '../Table';

const TabbedData = ({ tabs }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} 
            onChange={handleChange} 
            aria-label="tabbed data grid example" 
            variant="fullWidth"
            sx={{
                '& .MuiButtonBase-root': {
                    color: '#747474',
                    textTransform: 'capitalize',
                    fontSize: '32px',
                    fontWeight: '500',
                    borderRadius: '5px'
                },
                // '& .MuiButtonBase-root:first-child': {
                //     marginLeft: '25px'
                // },
                '& .MuiButtonBase-root:last-child': {
                    marginRight: '0px'
                },
                '& .Mui-selected': {
                    backgroundColor: '#DAE4FF',
                    color: '#000000'
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: '#25307F'
                },
                margin: '0 20px'
            }}>
                {tabs?.map((tab, index) => (
                    <Tab label={tab?.label} key={index} sx={{backgroundColor: '#F1F1F1', marginRight: '46px'}} />
                ))}
            </Tabs>
            {tabs?.map((tab, index) => (
                <TabPanel value={tabValue} index={index} key={index} style={tab.style}>
                    {/* <h2>{tab?.contentTitle}</h2> */}
                    <div style={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        {tab?.isTable ? <CustomTable
                            tab={tab}
                        /> : null}
                    </div>
                </TabPanel>
            ))}
        </Box>
    );
};

const TabPanel = (props) => {
    const { children, value, index, style, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={style} p={3}>{children}</Box>}
        </div>
    );
};

export default TabbedData;

