import React, { useState, Suspense } from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { useHistory } from "react-router-dom";

import { Spinner } from "reactstrap"
// import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner"
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import http from '../../../../http'
import Tsb from '../../../../components/@vuexy/toastify/Toastify'
import googleSvg from "../../../../assets/img/svg/google.svg"

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
import lStorage from './LStorage';
import { toast } from "react-toastify"

function Login() {
  const [user, setUser] = useState({
    username: null,
    password: null
  })

  const notifySuccess = (txt) => toast.success(txt)
  const notifyError = (txt) => toast.error(txt)

  const history = useHistory()

  const handleUserInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const data = user
    data[name] = value
    setUser(data)
  }
const [post , setPost] = useState({
  file: null
})

  const submitForm = (e) => {
    e.preventDefault()

    http.post('login', user)
      .then((response) => {
        notifySuccess("successfully")
        lStorage.LoginStorage(response)
        history.push({ pathname: '/' })
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        notifyError("О нет, пароль и логин неверны")
      })
  }

  // const toggle = tab => {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({
  //       activeTab: tab
  //     })
  //   }
  // } https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-4/extensions/toastification
  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Tsb />
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h4>Авторизоваться</h4>
                  <p>С возвращением, пожалуйста, войдите в свою учетную запись.</p>
                  <Form onSubmit={submitForm} className="mt-2">
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="text"
                        name="username"
                        placeholder="Имя"
                        onChange={handleUserInput}
                        required
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleUserInput}
                        required
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between align-items-center">
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Remember me"
                      />
                      {/* <div className="float-right">
                        Forgot Password?
                            </div> */}
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple color="primary" type="submit">
                        Отправить
                        </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default Login
