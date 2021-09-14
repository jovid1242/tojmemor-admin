import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { Line } from "react-chartjs-2"
import http from '../../../http'

export default function LineCharts() {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        http.get(`index.wsgi/analytics/`)
            .then((res) => {
                setDatas(res.data)
            })
            .catch((err) => {
                console.log(`ошибка: ${err}`)
            })
    }, [])

    const $primary = "#1b1b1b",
        $success = "#28C76F",
        $danger = "#EA5455",
        $warning = "#FF9F43",
        $label_color = "#1E1E1E",
        grid_line_color = "#dae1e7"

    const data = {
        labels: datas.labels,
        datasets: [
            {
                label: "Заявки",
                data: datas.datasets,
                borderColor: $primary
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            position: "top"
        },

        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        color: grid_line_color
                    },
                    scaleLabel: {
                        display: true
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: grid_line_color
                    },
                    scaleLabel: {
                        display: true
                    }
                }
            ]
        },
        title: {
            display: true,
            text: "Количество полученных заявок (в месяц)"
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardBody>
                <Line data={data} options={options} height={300} />
            </CardBody>
        </Card>
    )
}

