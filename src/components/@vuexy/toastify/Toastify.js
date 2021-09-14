import React from "react"
import ExtensionsHeader from "../ExtensionHeader"
import { Row, Col } from "reactstrap"
import ToastrTypes from "./ToastTypes"
import ToastrPositions from "./ToastPositions"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

class Toastr extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <ToastrPositions />
          </Col>
          <ToastContainer />
        </Row>
      </React.Fragment>
    )
  }
}

export default Toastr
