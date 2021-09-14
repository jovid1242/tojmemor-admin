import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Table
} from "reactstrap"
import { Edit, Trash, Lock, Check } from "react-feather"
import { Link } from "react-router-dom"
import userImg from "../../../assets/img/portrait/small/avatar-s-18.jpg"
import "../../../assets/scss/pages/users.scss"

var user = JSON.parse(localStorage.getItem("user"))

class UserView extends React.Component {

//   <Button.Ripple className="mr-1" color="primary" outline>
//   <Link to="#">
//     <Edit size={15} />
//     <span className="align-middle ml-50">Редактировать</span>
//   </Link>
// </Button.Ripple>
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Учетная запись пользователя</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        <Media
                          className="rounded mr-2"
                          object
                          src={user.img}
                          alt="упс картинка пропало добавьте"
                          height="112"
                          width="112"
                        />
                      </Media>
                      <Media body>
                        <Row>
                          <Col sm="9" md="6" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Username
                                </div>
                                <div>{user.username}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Имя
                                </div>
                                <div>{user.name}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Email
                                </div>
                                <div className="text-truncate">
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="12" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                Статус
                                </div>
                                <div>{user.status === true ? 'Активно' : 'Нет активирован'}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                Роль
                                </div>
                                <div>{user.role}</div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                  <Col className="mt-1 pl-0" sm="12">
                  
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>                     
        </Row>
      </React.Fragment>
    )
  }
}
export default UserView
