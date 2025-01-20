import React from 'react';
import TabbedData from '../../components/TabbedData';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const TabsWithTable = () => {
    const tabs = [
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
            style: {padding: '0px'}
        },
        {
            label: 'Ongoing',
            contentTitle: 'Content for Tab 2',
            rows: Array.from({ length: 100 }, (_, index) => ({
                id: index + 101,
                name: `Name ${index + 101}`,
                appointmentWith: `Appointment ${index + 101}`,
                typeVisit: `Visit ${index + 101}`,
                branch: `Branch ${index + 101}`,
                tokenNumber: `XXXXX ${index + 101}`,
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
            ],
            isTable: true,
            style: {padding: '0px'}
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
            style: {padding: '0px'}
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
            style: {padding: '0px'}
        },
    ];

    const handleEdit = (id) => {
        console.log('Edit row with id:', id);
        //TODO: Implement your edit logic here
    };

    const handleDelete = (id) => {
        console.log('Delete row with id:', id);
        //TODO: Implement your delete logic here
    };

    return <TabbedData tabs={tabs} />;
};

export default TabsWithTable;