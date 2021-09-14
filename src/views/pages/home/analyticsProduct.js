import React from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap"
import Chart from "react-apexcharts"
import http from '../../../http'

class Productorders extends React.Component {
    state = {
        options: {
            chart: {
                dropShadow: {
                    enabled: false,
                    blur: 5,
                    left: 1,
                    top: 1,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: [this.props.danger, this.props.warning, this.props.danger, this.props.primaryLight, this.props.warningLight, this.props.dangerLight],
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: [
                        this.props.danger,
                        this.props.warning,
                        this.props.danger,
                        this.props.primaryLight,
                        this.props.warningLight,
                        this.props.dangerLight
                    ]
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: { show: false },
            stroke: {
                width: 6
            },
            labels: ["Новости", "Проекты", "Видео", "Instagram", "Планировки", "Заявки"]
        },
        series: []
    }

    componentDidMount() {
        http.get(`static/get`)
            .then((response) => {
                this.setState({ series: response.data[0].Count });
            })
    }
    render() {

        console.log(this.state.series);
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <Row>
                    <Col lg="6" sm="6">
                        <CardBody className="pt-0">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="pie"
                                height={290} />
                        </CardBody>
                    </Col>
                    <Col lg="6" sm="6">
                        <ListGroup flush>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-primary"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Новости</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[0]}</span>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-warning"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Проекты</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[1]}</span>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-danger"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Видео</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[2]}</span>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-primary"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Instagram</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[3]}</span>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-warning"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Планировки</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[4]}</span>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                                <div className="item-info">
                                    <div
                                        className="bg-danger"
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            margin: "0 5px"
                                        }}
                                    />
                                    <span className="text-bold-600">Заявки</span>
                                </div>
                                <div className="product-result">
                                    <span>{this.state.series[5]}</span>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>



            </Card>
        )
    }
}
export default Productorders
