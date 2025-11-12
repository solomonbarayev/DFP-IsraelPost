import { Paper, Typography } from '@mui/material';

interface StatisticsCardProps {
    title: string;
    value: string | number;
    color?: string;
    type?: string;
}

const StatisticsCard = ({ title, value, color = 'primary', type = 'number' }: StatisticsCardProps) => {
    return (
        <Paper
            elevation={1}
            sx={{
                p: 3,
                borderRadius: 1,
                height: '100%'
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={`${color}.main`} sx={{ fontSize: type === 'text' ? '.9rem' : '1.4rem' }}>
                {value}
            </Typography>
        </Paper>
    );
};

export default StatisticsCard; 