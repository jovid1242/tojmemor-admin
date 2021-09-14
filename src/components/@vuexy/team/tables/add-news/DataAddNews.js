import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../breadCrumbs/BreadCrumb"
import AddNews from "./AddNews"

class DataAddNews extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Новости"
                    breadCrumbParent="Новости"
                    breadCrumbActive="Добавление новостей"
                />
                <Row>
                    <Col sm="12">
                        <AddNews />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataAddNews
