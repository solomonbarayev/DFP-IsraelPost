import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface StatsRefreshButtonProps {
    isRefreshing: boolean;
    onRefresh: () => void;
}

const StatsRefreshButton = ({ isRefreshing, onRefresh }: StatsRefreshButtonProps) => {
    return (
        <Button
            variant="outlined"
            onClick={onRefresh}
            sx={{
                color: 'primary.main',
                px: 2,
                borderRadius: 1,
            }}
            startIcon={
                <RefreshIcon
                    sx={{
                        transition: 'transform 0.3s ease-in-out',
                        transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)',
                    }}
                />
            }
        >
            רענן
        </Button>
    );
};

export default StatsRefreshButton; 