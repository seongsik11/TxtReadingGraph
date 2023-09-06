import React, { useEffect, useRef, useState } from 'react';
import { Chart, Title, Tooltip, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';

// "point" 요소를 등록
Chart.register(Title, Tooltip, CategoryScale, LinearScale, LineController, LineElement, PointElement);

const GraphDisplay = ({ responseData }) => {
    const canvasRef = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        if (responseData) {
            // X 축 레이블을 포함하는 배열
            const labels = Array.from({ length: responseData.lgrf.length }, (_, i) => i + 1);

            const chartData = {
                labels: labels, // X 축 레이블
                datasets: [
                    {
                        label: 'LGRF',
                        data: responseData.lgrf, // LGRF 데이터 배열
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(75,192,192,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                    {
                        label: 'RGRF',
                        data: responseData.rgrf, // RGRF 데이터 배열
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(255,99,132,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                ],
            };

            if (chart) {
                chart.destroy();
            }

            const newChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '응답 데이터 그래프', // 그래프 제목
                            font: {
                                size: 16, // 제목 폰트 크기 조정
                            },
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'X 축 레이블', // X 축 제목
                            },
                            ticks: {
                                autoSkip: true, // X 축 눈금 자동 스킵 활성화
                                maxTicksLimit: 10, // 최대 눈금 개수 제한
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Y 축 레이블', // Y 축 제목
                            },
                            ticks: {
                                autoSkip: true, // Y 축 눈금 자동 스킵 활성화
                                maxTicksLimit: 10, // 최대 눈금 개수 제한
                            },
                        },
                    },
                    legend: {
                        display: true,
                        position: 'top', // 범례 위치를 그래프 위로 이동
                    },
                },
            });

            setChart(newChart);
        } else {
            // responseData가 없을 때 대체 콘텐츠 표시
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('데이터가 없습니다.', ctx.canvas.width / 2, ctx.canvas.height / 2);
        }
    }, [responseData]);

    return (
        <canvas id="myChart" ref={canvasRef} width={1366} height={600} />
    );
};

export default GraphDisplay;
