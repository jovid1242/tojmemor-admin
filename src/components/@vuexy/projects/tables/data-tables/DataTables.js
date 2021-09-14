import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../breadCrumbs/BreadCrumb"
import DataTableCustom from "./DataTableCustom"

class DataTables extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Проекты"
          breadCrumbParent="Главный"
          breadCrumbActive="Проекты"
        />
        <Row>
          <Col sm="12">
            <DataTableCustom />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default DataTables
