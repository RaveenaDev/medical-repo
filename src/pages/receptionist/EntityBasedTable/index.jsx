import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Grid from '@mui/material/Grid2';
import { Table as CustomTable } from '../../../components/Table';
import Select from '../../../components/Select';
import { Box } from '@mui/material';

function EntityBasedTable(props) {
	const [branches, setBranches] = useState(["All Branches", "Cardiology", "Therapy", "Dermatology"]);
    const [entityTable, setEntityTable] = useState({});
    const table = [
        {
            label: 'Scheduled',
            contentTitle: 'Content for Tab 1',
            rows: Array.from({ length: 100 }, (_, index) => ({
                id: index + 1,
                name: `Name ${index + 1}`,
                appointmentWith: `Appointment ${index + 1}`,
                typeVisit: `Visit ${index + 1}`,
                branch: `Branch ${index + 1}`,
                tokenNumber: `XXXXX ${index + 1}`,
                status: `Ongoing`,
            })),
            columns: [
                { 
                    field: 'id', 
                    headerName: 'Case Id', 
                    width: 90,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.id}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { 
                    field: 'name', 
                    headerName: 'Name', 
                    width: 150,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.name}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { field: 'appointmentWith', headerName: 'Appointment With', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'typeVisit', headerName: 'Type Visit', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'branch', headerName: 'Branch', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'tokenNumber', headerName: 'Token Number', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'status', 
                    headerName: 'Status', 
                    width: 150,
                    renderCell: (params) => (
                        params.row.status === "Ongoing" ? <Box sx={{ color: '#FFFFFF', fontWeight: '500', fontSize: '14px' }}>
                          <span style={{backgroundColor: '#3DB461', borderRadius: '20px', padding: '7px 14px'}}>{params.row.status}</span>
                        </Box> : <Box sx={{ color: '#747474', fontWeight: '500', fontSize: '16px' }}>
                          <span>{params.row.status}</span>
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                // {
                //     field: 'edit',
                //     headerName: 'Edit',
                //     width: 100,
                //     renderCell: (params) => (
                //         <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>
                //             Edit
                //         </Button>
                //     ),
                // },
                // {
                //     field: 'delete',
                //     headerName: 'Delete',
                //     width: 100,
                //     renderCell: (params) => (
                //         <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
                //             Delete
                //         </Button>
                //     ),
                // },
            ],
            isTable: true,
            style: {padding: '0px'},
            headerStyle: {
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#F1F1F1',
                display: 'flex',
                justifyContent: 'center'
            },
            headerContainerTopStyle: {
                backgroundColor: '#F1F1F1'
            },
            rowBgWhite: true
        },
        {
            label: 'Ongoing',
            contentTitle: 'Content for Tab 2',
            rows: Array.from({ length: 100 }, (_, index) => ({
                id: index + 101,
                profile: `Profile`,
                doctorId: `XXXXX${index + 101}`,
                name: `Name ${index + 101}`,
                phone: `+91 79327728`,
                specialization: `Doctor`,
                branch: `Branch ${index + 101}`,
                tokenNumber: `XXXXX ${index + 101}`,
                status: `Ongoing`,
            })),
            columns: [
                { 
                    field: 'profile', 
                    headerName: 'Profile', 
                    width: 90,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px', width: '48px', height: '48px', textAlign: 'center', margin: 'auto' }}>
                          {/* {params.row.profile} */}
                          <img src='src/assets/profileDefault.png' alt={params.row.id}/>
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { field: 'doctorId', headerName: 'Doctor ID', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'name', 
                    headerName: 'Name', 
                    width: 150,
                    sortable: false, 
                    disableColumnMenu: true
                },
                { field: 'phone', headerName: 'Phone Number', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'specialization', 
                    headerName: 'Specialization', 
                    width: 150, 
                    renderCell: (params) => (
                        <Box sx={{  fontWeight: '600', fontSize: '16px' }}>
                          {['Cardiologist', 'Dentist', 'Physician', 'ENT Specialist'][Math.floor(Math.random() * 4)]}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true 
                },
                { field: 'branch', headerName: 'Branch', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'tokenNumber', headerName: 'Token Number', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'status', 
                    headerName: 'Status', 
                    width: 150,
                    renderCell: (params) => (
                        params.row.status === "Ongoing" ? <Box sx={{ color: '#FFFFFF', fontWeight: '500', fontSize: '14px' }}>
                          <span style={{backgroundColor: '#3DB461', borderRadius: '20px', padding: '7px 14px'}}>{params.row.status}</span>
                        </Box> : <Box sx={{ color: '#747474', fontWeight: '500', fontSize: '16px' }}>
                          <span>{params.row.status}</span>
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true 
                },
            ],
            isTable: true,
            style: {padding: '0px'},
            headerStyle: {
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#F1F1F1',
                display: 'flex',
                justifyContent: 'center'
            },
            headerContainerTopStyle: {
                backgroundColor: '#F1F1F1'
            },
            rowBgWhite: true
        },
        {
            label: 'Waiting',
            contentTitle: 'Content for Tab 3',
            rows: Array.from({ length: 100 }, (_, index) => ({
                id: index + 201,
                name: `Name ${index + 201}`,
                appointmentWith: `Appointment ${index + 201}`,
                typeVisit: `Visit ${index + 201}`,
                branch: `Branch ${index + 201}`,
                tokenNumber: `XXXXX ${index + 201}`,
                status: `Waiting`,
            })),
            columns: [
                { 
                    field: 'id', 
                    headerName: 'Case Id', 
                    width: 90,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.id}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { 
                    field: 'name', 
                    headerName: 'Name', 
                    width: 150,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.name}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { field: 'appointmentWith', headerName: 'Appointment With', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'typeVisit', headerName: 'Type Visit', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'branch', headerName: 'Branch', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'tokenNumber', headerName: 'Token Number', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'status', 
                    headerName: 'Status', 
                    width: 150,
                    renderCell: (params) => (
                        params.row.status === "Ongoing" ? <Box sx={{ color: '#FFFFFF', fontWeight: '500', fontSize: '14px' }}>
                          <span style={{backgroundColor: '#3DB461', borderRadius: '20px', padding: '7px 14px'}}>{params.row.status}</span>
                        </Box> : <Box sx={{ color: '#747474', fontWeight: '500', fontSize: '16px' }}>
                          <span>{params.row.status}</span>
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
            ],
            isTable: true,
            style: {padding: '0px'},
            headerStyle: {
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#F1F1F1',
                display: 'flex',
                justifyContent: 'center'
            },
            headerContainerTopStyle: {
                backgroundColor: '#F1F1F1'
            },
            rowBgWhite: true
        },
        {
            label: 'Completed',
            contentTitle: 'Content for Tab 4',
            rows: Array.from({ length: 100 }, (_, index) => ({
                id: index + 301,
                name: `Name ${index + 301}`,
                appointmentWith: `Appointment ${index + 301}`,
                typeVisit: `Visit ${index + 301}`,
                branch: `Branch ${index + 301}`,
                tokenNumber: `XXXXX ${index + 301}`,
                status: `Completed`,
            })),
            columns: [
                { 
                    field: 'id', 
                    headerName: 'Case Id', 
                    width: 90,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.id}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { 
                    field: 'name', 
                    headerName: 'Name', 
                    width: 150,
                    renderCell: (params) => (
                        <Box sx={{ color: '#25307F', fontWeight: '600', fontSize: '16px' }}>
                          {params.row.name}
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true
                },
                { field: 'appointmentWith', headerName: 'Appointment With', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'typeVisit', headerName: 'Type Visit', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'branch', headerName: 'Branch', width: 150, sortable: false, disableColumnMenu: true },
                { field: 'tokenNumber', headerName: 'Token Number', width: 150, sortable: false, disableColumnMenu: true },
                { 
                    field: 'status', 
                    headerName: 'Status', 
                    width: 150,
                    renderCell: (params) => (
                        params.row.status === "Ongoing" ? <Box sx={{ color: '#FFFFFF', fontWeight: '500', fontSize: '14px' }}>
                          <span style={{backgroundColor: '#3DB461', borderRadius: '20px', padding: '7px 14px'}}>{params.row.status}</span>
                        </Box> : <Box sx={{ color: '#EAA000', fontWeight: '500', fontSize: '16px' }}>
                          <span>{params.row.status}</span>
                        </Box>
                    ),
                    sortable: false, 
                    disableColumnMenu: true 
                },
            ],
            isTable: true,
            style: {padding: '0px'},
            headerStyle: {
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#F1F1F1',
                display: 'flex',
                justifyContent: 'center'
            },
            headerContainerTopStyle: {
                backgroundColor: '#F1F1F1'
            },
            rowBgWhite: true
        },
    ];
    const matchEntityObj = ["Patients", "Doctors", "Staffs", "Rooms"];
    const statusReference = [
        {
            name: "Available",
            bgColor: "#3DB461"
        },
        {
            name: "Occupied",
            bgColor: "#FFA412"
        },
        {
            name: "Under maintenance",
            bgColor: "#AEC3FF"
        }
    ]
    useEffect(() => {
        setEntityTable(props?.tableIndex);
    }, [props?.entity]);

  return (
    <>
		<div className={styles.entityTable}>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{padding: '10px 0 10px 0', borderBottom: '1px solid #4A4A4A8C', borderTop: matchEntityObj[props?.tableIndex] === "Patients" ? '1px solid #4A4A4A8C' : 'none'}}>
                <Grid size={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <img src="src/assets/arrow_back.svg"/> */}
                    <span className={styles.entityTable__tableTitle}>{`Total ${matchEntityObj[props?.tableIndex]}: 8`}</span>
                </Grid>
                {matchEntityObj[props?.tableIndex] === "Patients" || matchEntityObj[props?.tableIndex] === "Doctors" ? <Grid size={3}>
                    <Select 
                        inputId="input-department"
                        selectId="select-department"
                        label="Department"
                        list={branches}
                        size="small"
                    />
                </Grid> : null}
                {matchEntityObj[props?.tableIndex] === "Rooms" ? <Grid size={6} sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                    {/* <img src="src/assets/arrow_back.svg"/> */}
                    <div className={styles.status}>
                        {statusReference.map((item) => {
                            return (
                                <div className={styles.status_content}>
                                    <span className={styles.status__bullet} style={{backgroundColor: item.bgColor}}></span>
                                    <span className={styles.status__title}>{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </Grid> : null}
            </Grid>
            
            <div style={{ height: '506px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <CustomTable
                    tab={Object.keys(entityTable).length ? entityTable : table[props?.tableIndex]}
                />
            </div>
		</div>
    </>
  );
}

export default EntityBasedTable;