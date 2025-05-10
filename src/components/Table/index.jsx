import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const Table = ({ tab }) => {
    const rows = tab?.rows || [];
    const columns = tab?.columns || [];

    const responsiveColumns = columns.map(col => ({
        ...col,
        flex: 1,
    }));

    const getRowClassName = (params) => {
        switch (params.row.status) {
            case 'Ongoing':
                return 'status-ongoing';
            case 'Waiting':
                return 'status-waiting';
            case 'Cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={responsiveColumns}  
                pageSize={10}
                hideFooter
                disableSelectionOnClick
                sx={{
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader': {
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-root': {
                        overflow: 'auto',
                    },
                    '& .MuiDataGrid-viewport': {
                        overflow: 'auto',
                    },
                    '& .MuiDataGrid-row': {
                        '--rowBorderColor': 'transparent',
                        margin: '6px 0',
                        color: '#747474',
                        fontWeight: '600',
                        fontSize: '16px',
                        position: 'relative',
                    },
                    '& .MuiDataGrid-topContainer': {
                        color: '#000000',
                        fontWeight: '500',
                        fontSize: '16px',
                        backgroundColor: '#FFFFFF',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        width: '100%',
                        margin: '0 auto',
                    },
                    '& .status-ongoing': {
                        backgroundColor: 'var(--color-ongoing)',
                    },
                    '& .status-waiting': {
                        backgroundColor: 'var(--color-waiting)',
                    },
                    '& .status-cancelled': {
                        backgroundColor: 'lightcoral',
                    },
                    '& .MuiDataGrid-row:before': {
                        content: '""',
                        position: 'absolute',
                        left: '-20px',
                        top: '0',
                        width: '20px',
                        height: '100%',
                        backgroundColor: 'var(--color-ongoing)',
                    },
                    border: 'none',
                }}
                getRowClassName={getRowClassName}
            />
        </div>
    );
};
