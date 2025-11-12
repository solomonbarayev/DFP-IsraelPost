import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { downloadCSV } from '../../utils/helperFunctions';


const DownloadReport = ({ isDownloading, onDownload }) => {
    const data = useSelector(state => state.api?.queries?.getAccountPlatformStats?.data?.accountFormsSubmissions);

    const handleDownloadReport = () => {
        // const csv = convertToCSV(data);
        // const blob = new Blob([csv], { type: 'text/csv' });
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'report.csv';
        // a.click();
        downloadCSV(data, 'report.csv');
    };

    return (
        <Button
            variant="outlined"
            onClick={handleDownloadReport}
            sx={{
                color: 'primary.main',
                px: 2,
                borderRadius: 1,
            }}
            startIcon={
                <Download
                    sx={{
                        transition: 'transform 0.3s ease-in-out',
                        transform: isDownloading ? 'rotate(360deg)' : 'rotate(0deg)',
                    }}
                />
            }
        >
            ייצא
        </Button>
    );
};

export default DownloadReport; 