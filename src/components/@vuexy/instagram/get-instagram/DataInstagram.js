import React from 'react'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '../../breadCrumbs/BreadCrumb'
import Video from './Index'

class DataTables extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Instagram"
                    breadCrumbParent="Главная"
                    breadCrumbActive="Instagram"
                />
                <Row>
                    <Col sm="12">
                        <Video />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataTables
