import React from 'react'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '../../../breadCrumbs/BreadCrumb'
import DataTableCustom from './DataTableCustom'

class DataTables extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Карьера"
                    breadCrumbParent="Главная"
                    breadCrumbActive="Карьера"
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
