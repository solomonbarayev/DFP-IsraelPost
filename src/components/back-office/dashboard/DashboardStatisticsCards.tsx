import { Grid } from '@mui/material';
import type { Stats } from '../../../types/stats';
import StatisticsCard from './StatisticsCard';

interface DashboardStatisticsCardsProps {
    stats: Stats;
}

const DashboardStatisticsCards = ({ stats }: DashboardStatisticsCardsProps) => {
    // Early return with empty or loading state if stats is undefined
    if (!stats) {
        return (
            <Grid container spacing={3}>
                <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                    <StatisticsCard
                        title="טפסים פעילים"
                        value="-"
                        color="primary"
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                    <StatisticsCard
                        title="טפסים שהושלמו היום"
                        value="-"
                        color="success"
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                    <StatisticsCard
                        title="סה״כ הגשות"
                        value="-"
                        color="info"
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                    <StatisticsCard
                        title="טפסים ממתינים לאישור"
                        value="-"
                        color="warning"
                    />
                </Grid>
            </Grid>
        );
    }

    // Once we have stats, calculate the values
    const activeForms = stats.forms?.length || 0;

    // Get today's date in the same format as submittedAt
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    // Get submissions from today
    const submittedFormsToday = stats.formSubmissions?.filter(submission => {
        const submissionDate = submission.submittedAt.split(' ')[0];
        return submissionDate === todayString;
    })?.length || 0;

    // Get total submissions
    const totalSubmissions = stats.formSubmissions?.length || 0;

    // Get submissions by status
    // const pendingSubmissions = stats.formSubmissions?.filter(
    //     submission => submission.status === 'pending'
    // )?.length || 0;

    // Calculate most active form
    const formSubmissionCounts = stats.formSubmissions?.reduce((acc: Record<string, number>, submission) => {
        acc[submission.formId] = (acc[submission.formId] || 0) + 1;
        return acc;
    }, {}) || {};

    // Find the form with the most submissions
    const [mostActiveFormId, _] = Object.entries(formSubmissionCounts)
        .reduce((max: [string, number], [formId, count]: [string, number]) => count > max[1] ? [formId, count] : max, ['', 0]);

    const mostActiveFormName: string = stats.forms?.find(
        form => form.formId === mostActiveFormId
    )?.formTitle || 'N/A';

    return (
        <Grid container spacing={3}>
            <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                <StatisticsCard
                    title="טפסים פעילים"
                    value={activeForms}
                    color="error"
                />
            </Grid>
            <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                <StatisticsCard
                    title="טפסים שהושלמו היום"
                    value={submittedFormsToday}
                    color="success"
                />
            </Grid>
            <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                <StatisticsCard
                    title="סה״כ הגשות"
                    value={totalSubmissions}
                    color="info"
                />
            </Grid>
            <Grid size={{ sm: 12, md: 6, lg: 3 }}>
                <StatisticsCard
                    title={`הטופס הפעיל ביותר`}
                    value={mostActiveFormName}
                    color="warning"
                    type="text"
                />
            </Grid>
        </Grid>
    );
};

export default DashboardStatisticsCards; 