import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
  Button,
  CardHeader, CardTitle
} from "reactstrap"
import { Award } from "react-feather"
import BarChart from './home/chart-js'
import Customer from './home/analyticsProduct'

import "../../assets/scss/plugins/charts/apex-charts.scss"

import decorLeft from "../../assets/img/elements/decore-left.png"
import decorRight from "../../assets/img/elements/decore-right.png"
import "../../assets/scss/pages/dashboard-analytics.scss"
import http from '../../http'

export default function Home() {

  var user = JSON.parse(localStorage.getItem("user"))
  let $primary = "#7367F0",
    $success = "#28C76F",
    $danger = "#EA5455",
    $warning = "#FF9F43",
    $primary_light = "#9c8cfc",
    $warning_light = "#FFC085",
    $danger_light = "#f29292",
    $stroke_color = "#b9c3cd",
    $label_color = "#e7eef7";
  return (
    <>
      <Row>
        <Col lg="12" md="12" >
          <Card className="bg-analytics text-white sales-card">
            <CardBody className="text-center">
              <img src={decorLeft} alt="card-img-left" className="img-left" />
              <img src={decorRight} alt="card-img-right" className="img-right" />
              <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
                <div className="avatar-content">
                  <Award className="text-white" size={28} />
                </div>
              </div>
              <div className="award-info text-center">
                <h1 className="mb-2 text-white">Добро пожаловать {user.name} </h1>
                <p className="m-auto mb-0 w-75">
                Это Ваша панель администратора. Здесь Вы можете редактировать и добавлять информацию на сайте, а также управлять некоторыми настройками. <strong> Давайте начнем  </strong>
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12">
          <BarChart />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" className="text-center align-middle">
          <Customer
            primary={$primary}
            warning={$warning}
            danger={$danger}
            primaryLight={$primary_light}
            warningLight={$warning_light}
            dangerLight={$danger_light}
          />
        </Col>
      </Row>
    </>
  )
}
