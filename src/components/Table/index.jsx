import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const Table = ({ tab }) => {
    const rows = tab.rows;

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
        <DataGrid
            rows={tab?.rows}
            columns={tab?.columns}
            pageSize={10}
            hideFooter
            disableSelectionOnClick
            sx={{
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader': {
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-root': {
                    overflow: 'auto'
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
                    width: 'calc(100% + 40px)'
                },
                '& .MuiDataGrid-topContainer': {
                    color: '#000000',
                    fontWeight: '500',
                    fontSize: '16px',
                    backgroundColor: '#FFFFFF'
                },
                '& .MuiDataGrid-columnHeaders': {
                    width: 'calc(100% - 40px)',
                    margin: '0 auto'
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
                    backgroundColor: 'var(--color-ongoing)'
                },
                border: 'none'
            }}
            getRowClassName={getRowClassName}
        />
    );
};

