
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { downloadCSV } from '../../../utils/helper-functions/downloadCsv';
// import { useAppSelector } from '../../store/hooks';

interface DownloadReportProps {
    isDownloading: boolean;
    onDownload: () => void;
}

const stats = {
    forms: [],
    formSubmissions: [],
    features: [],
}


const DownloadReport = ({ isDownloading, onDownload }: DownloadReportProps) => {
    // const data = useAppSelector(state => state.api?.queries?.getAccountPlatformStats?.data?.accountFormsSubmissions);
    const data = stats.formSubmissions;
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