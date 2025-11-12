import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Typography } from '@mui/material';
import type { Stats } from '../../types/stats';

interface DashboardColumnChartProps {
    stats: Stats;
}

const DashboardColumnChart = ({ stats }: DashboardColumnChartProps) => {
    const chartOptions = useMemo(() => {
        if (!stats) {
            console.log('No stats data available');
            return null;
        }

        // Get current month and year
        const now = new Date();
        const currentMonth = now.getUTCMonth();
        const currentYear = now.getUTCFullYear();

        // Get days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        // Create a map of form titles by ID
        // const formTitles = stats.forms.reduce((acc, form) => {
        //     acc[form.formId] = form.formTitle;
        //     return acc;
        // }, {});

        // Group submissions by day and form
        const submissionsByDay = days.reduce((acc: Record<number, Record<string, number>>, day: number) => {
            const daySubmissions = stats.formSubmissions.filter(sub => {
                const subDate = new Date(sub.submittedAt);
                const subDay = subDate.getUTCDate();
                const subMonth = subDate.getUTCMonth();
                const subYear = subDate.getUTCFullYear();

                return subDay === day &&
                    subMonth === currentMonth &&
                    subYear === currentYear;
            });

            const formCounts = daySubmissions.reduce((counts, sub) => {
                counts[sub.formId] = (counts[sub.formId] || 0) + 1;
                return counts;
            }, {});

            acc[day] = formCounts;
            return acc;
        }, {});

        // Prepare series data
        const series = stats.forms.map(form => {
            const data = days.map(day => submissionsByDay[day]?.[form.formId] || 0);
            return {
                name: form.formTitle,
                data: data
            };
        });

        const options = {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: `הגשות טפסים לפי יום - ${currentMonth + 1}/${currentYear}`
            },
            xAxis: {
                categories: days,
                title: {
                    text: 'יום בחודש'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'מספר הגשות'
                },
                stackLabels: {
                    enabled: true
                },
                tickInterval: 5,
                max: Math.ceil(Math.max(...Object.values(submissionsByDay).map(day =>
                    Object.values(day).reduce((sum, count) => sum + count, 0)
                )) / 5) * 5
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 0,
                y: 100,
                rtl: true
            },
            tooltip: {
                formatter: function (this: any) {
                    const day = ((this.x as number) + 1).toString().padStart(2, "0");
                    const month = (currentMonth + 1).toString().padStart(2, "0");
                    let tooltip = `<b>${day}/${month}</b><br/>`;

                    // Get the hovered point
                    const hoveredPoint = this.series.chart.hoverPoint;

                    if (hoveredPoint) {
                        // For a specific segment
                        tooltip += `${hoveredPoint.series.name}: ${hoveredPoint.y}<br/>`;
                        tooltip += `סה"כ לעמודה: ${hoveredPoint.stackTotal}`;
                    } else {
                        // For the whole column
                        this.points?.forEach((point: any) => {
                            tooltip += `${point.series.name}: ${point.y}<br/>`;
                        });
                        tooltip += `סה"כ: ${(this.points?.[0] as any)?.total}`;
                    }

                    return tooltip;
                },
                shared: true,
                useHTML: true,
                followPointer: true,
                hideDelay: 0,
                positioner: function (this: any, labelWidth: number, labelHeight: number, point: any) {
                    // Calculate the x position, ensuring it doesn't go off the left edge
                    let x = point.plotX + this.chart.plotLeft - labelWidth / 2;
                    x = Math.max(10, x); // Keep at least 10px from the left edge

                    // Calculate the y position
                    const y = point.plotY + this.chart.plotTop - labelHeight - 10;

                    return { x, y };
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    },
                    point: {
                        events: {
                            mouseOver: function (this: any) {
                                this.series.chart.tooltip.refresh(this);
                            }
                        }
                    }
                }
            },
            series: series
        };

        return options;
    }, [stats]);

    return (
        <Paper
            elevation={1}
            sx={{
                p: 3,
                borderRadius: 1
            }}
        >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                סטטיסטיקות הגשות
            </Typography>
            {chartOptions && (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            )}
        </Paper>
    );
};

export default DashboardColumnChart; 