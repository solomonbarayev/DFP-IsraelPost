import { Box, Paper, Typography, Stack, Chip } from '@mui/material';
import { useMemo } from 'react';
import type { Stats } from '../../types/stats';

interface DashboardRecentActivityProps {
    stats: Stats;
}

const DashboardRecentActivity = ({ stats }: DashboardRecentActivityProps) => {
    const recentSubmissions = useMemo(() => {
        if (!stats?.formSubmissions || !stats?.forms) return [];

        // Create a map of form titles by ID
        const formTitles = stats.forms.reduce((acc, form) => {
            acc[form.formId] = form.formTitle;
            return acc;
        }, {});

        // Create a copy of the array and sort it
        return [...stats.formSubmissions]
            .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
            .slice(0, 4)
            .map(submission => ({
                ...submission,
                formTitle: formTitles[submission.formId] || `Form ${submission.formId}`
            }));
    }, [stats]);

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const submissionDate = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - submissionDate.getTime()) / 1000);

        if (diffInSeconds < 60) return 'לפני מספר שניות';
        if (diffInSeconds < 3600) return `לפני ${Math.floor(diffInSeconds / 60)} דקות`;

        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);

        switch (hours) {
            case 1:
                return minutes < 30 ? 'לפני שעה' : 'לפני שעה וחצי';
            case 2:
                return minutes < 30 ? 'לפני שעתיים' : 'לפני שעתיים וחצי';
            default:
                if (hours < 24) return `לפני ${hours} שעות`;
                return `לפני ${Math.floor(diffInSeconds / 86400)} ימים`;
        }
    };

    if (!recentSubmissions.length) {
        return (
            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    borderRadius: 1,
                    height: '100%'
                }}
            >
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                    פעילות אחרונה
                </Typography>
                <Typography color="text.secondary">
                    אין פעילות אחרונה להצגה
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={1}
            sx={{
                p: 3,
                borderRadius: 1,
                height: '100%'
            }}
        >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                פעילות אחרונה
            </Typography>
            <Stack spacing={2}>
                {recentSubmissions.map((submission, index) => (
                    <Box
                        key={submission.submissionId}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: 1.5,
                            bgcolor: 'grey.50',
                            borderRadius: 1
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                bgcolor: index === 0 ? 'success.main' : index === 1 ? 'info.main' : 'warning.main',
                                borderRadius: '50%'
                            }} />
                            <Typography fontWeight="500">{submission.formTitle}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            pl: 3
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                מספר פנייה: {submission.submissionId}
                            </Typography>
                            <Chip
                                label={getTimeAgo(submission.submittedAt)}
                                size="small"
                                sx={{
                                    bgcolor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

export default DashboardRecentActivity; 