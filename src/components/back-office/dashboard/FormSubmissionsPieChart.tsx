import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Stats } from '../../../types/stats';

interface FormSubmissionsPieChartProps {
    stats: Stats;
}

const FormSubmissionsPieChart = ({ stats }: FormSubmissionsPieChartProps) => {
    if (!stats?.formSubmissions || !stats?.forms) {
        return null;
    }

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();

    // Filter submissions for current month
    const monthlySubmissions = stats.formSubmissions.filter(submission => {
        const subDate = new Date(submission.submittedAt);
        return subDate.getUTCMonth() === currentMonth &&
            subDate.getUTCFullYear() === currentYear;
    });

    // Create a map of form titles by ID
    const formTitles = stats.forms.reduce((acc, form) => {
        acc[form.formId] = form.formTitle;
        return acc;
    }, {});

    // Count submissions per form
    const formSubmissionCounts = monthlySubmissions.reduce((acc, submission) => {
        acc[submission.formId] = (acc[submission.formId] || 0) + 1;
        return acc;
    }, {});

    // Prepare data for pie chart
    const pieData = Object.entries(formSubmissionCounts).map(([formId, count]) => ({
        name: formTitles[formId] || `Form ${formId}`,
        y: count
    }));

    const options = {
        legend: {
            rtl: true
        },
        chart: {
            type: 'pie',
            height: '400px'
        },
        title: {
            text: `חלוקת הגשות טפסים - ${currentMonth + 1}/${currentYear}`,
            align: 'right'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        fontSize: '12px'
                    },
                    distance: 80,
                    overflow: 'justify',
                    crop: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'הגשות',
            colorByPoint: true,
            data: pieData
        }],
        credits: {
            enabled: false
        }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default FormSubmissionsPieChart; 