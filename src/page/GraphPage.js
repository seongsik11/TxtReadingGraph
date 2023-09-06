import React, { useEffect, useRef } from 'react';
import { Chart, Title, Tooltip, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';

// "point" 요소를 등록
Chart.register(Title, Tooltip, CategoryScale, LinearScale, LineController, LineElement, PointElement);

const GraphPage = ({ graphData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let chart = null;

        if (graphData) {
            const ctx = document.getElementById('myChart');

            // X 축 레이블을 포함하는 배열
            const labels = Array.from({ length: graphData.LHS.length }, (_, i) => i + 1);

            const chartData = {
                labels: labels, // X 축 레이블
                datasets: [
                    {
                        label: 'LHS',
                        data: graphData.LHS, // LHS 데이터 배열
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(75,192,192,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                    {
                        label: 'LKS',
                        data: graphData.LKS, // LKS 데이터 배열
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(255,99,132,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                    {
                        label: 'RHS',
                        data: graphData.RHS, // RHS 데이터 배열
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(54,162,235,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                    {
                        label: 'RKS',
                        data: graphData.RKS, // RKS 데이터 배열 (수정 필요)
                        fill: false,
                        borderWidth: 2, // 선의 두께
                        borderColor: 'rgba(255,206,86,1)', // 선의 색상
                        pointRadius: 0, // 점의 반경을 0으로 설정하여 숨김
                    },
                ],
            };

            chart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'XY 그래프', // 그래프 제목
                            font: {
                                size: 16 // 제목 폰트 크기 조정
                            }
                        }
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
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Y 축 레이블' // Y 축 제목
                            },
                            ticks: {
                                autoSkip: true, // Y 축 눈금 자동 스킵 활성화
                                maxTicksLimit: 10, // 최대 눈금 개수 제한
                            }
                        },
                    },
                    legend: {
                        display: true,
                        position: 'top', // 범례 위치를 그래프 위로 이동
                    },
                },
            });
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [graphData]);

    return (
        <div>
            {graphData ? (
                <canvas id="myChart" ref={canvasRef} width={1366} height={600} />
            ) : (
                <div style={{ width: '1366px', height: '600px', lineHeight:"600px", textAlign:"center",fontSize:"24px", color:"#808080"}}>데이터가 없습니다.</div>
            )}
        </div>
    );
};

export default GraphPage;
