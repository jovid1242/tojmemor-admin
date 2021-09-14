import React from 'react'
import Main from '../../components/@vuexy/user/EditProfile'
import {
    Card,
    CardBody,
    Row,
    Col,
  } from "reactstrap"
export default function UserEditProfile() {
    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody className="pt-2">
                            <Main />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
