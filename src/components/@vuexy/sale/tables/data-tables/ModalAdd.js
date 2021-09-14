import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardBody,
    FormGroup,
    Label,
    CustomInput
} from "reactstrap"

import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import {
    Formik,
    Field,
    Form
} from "formik"
import * as Yup from "yup"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../../../assets/scss/plugins/extensions/editor.scss"
import "../../../../../assets/scss/plugins/extensions/dropzone.scss"
import http from '../../../../../http'
import { toast } from "react-toastify"

const formSchema = Yup.object().shape({
    required: Yup.string().required("Required"),
    minlength: Yup.string()
        .min(4, "Too Short!")
        .required("Required"),
    maxlength: Yup.string()
        .max(5, "Too Long!")
        .required("Required")
})

export default function ModalAdd({ show, closeModalAdd, addSale }) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)
    const [post, setPost] = useState({
        title: null,
        desc: null,
        title_second: null,
        text: null,
        status: null,
        data_start: null,
        data_end: null
    })
    const [data, setData] = useState({
        start: null,
        end: null
    })

    const toggleModal = () => {
        if (show) {
            closeModalAdd(false)
        } closeModalAdd(true)
    }

    const submitForm = e => {
        e.preventDefault()
        http.post('/sale/create', post)
            .then((response) => {
                addSale(post)
                toggleModal()
                notifySuccess('Акция успешно добавлена!')
            })
            .catch(function (errors) {
                notifyError(`О боже ошибка , ${errors.message}`)
            })
    }

    return (
        <>
            <Modal
                isOpen={show}
                toggle={toggleModal}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader toggle={toggleModal} className="bg-primary">
                Добавление акции
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                    <Formik
                        initialValues={{
                            required: "",
                            name: "",
                            date: "",
                            minlength: "",
                            maxlength: ""
                        }}
                        validationSchema={formSchema}
                    >
                        {({ errors, touched }) => (
                            <Form className="w-100" onSubmit={submitForm}>

                                <Card>
                                    <CardBody className="rdt_Wrapper">
                                <FormGroup className="my-3">
                                    <Label for="required">Название</Label>
                                    <Field
                                        name="title"
                                        onChange={e => setPost({...post, title: e.target.value})}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <Label for="required">Описание</Label>
                                    <Field
                                        name="title"
                                        onChange={e => setPost({...post, desc: e.target.value})}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <Label for="required">Заголовок</Label>
                                    <Field
                                        name="title"
                                        onChange={e => setPost({...post, title_second: e.target.value})}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup className="my-3">
                                    <Label for="required">Текст</Label>
                                    <Field
                                        name="title"
                                        onChange={e => setPost({...post, text: e.target.value})}
                                        className="form-control" />
                                </FormGroup>
                                <Label for="required">Статус</Label>
                                        <CustomInput type="select" name="paragraph" id="city" onChange={e => {setPost({...post, status: e.target.value})}}>
                                            <option value=""></option>
                                            <option value="1">Опубликовано</option>
                                            <option value="0">Не опубликовано</option>
                                        </CustomInput>
                                <FormGroup className="my-3">
                                  <Label for="endDate">Дата начала</Label>
                                    <Field 
                                    value={data.start}
                                    className="form-control"
                                    onChange={date => {
                                        setPost({...post , data_start: `${new Date(String(date.target.value)).getFullYear()}-${1 + new Date(String(date.target.value)).getMonth()}-${new Date(String(date.target.value)).getDate()} ${new Date(String(date.target.value)).getHours()}:${new Date(String(date.target.value)).getMinutes()}`});
                                        setData({...data, start: date.target.value})
                                    } } type="datetime-local" />
                                </FormGroup>
                                <FormGroup className="my-3">
                                  <Label for="endDate">Дата окончания</Label>
                                  <Field 
                                  value={data.end}
                                  className="form-control"
                                  onChange={date => {
                                      setPost({...post , data_end: `${new Date(String(date.target.value)).getFullYear()}-${1 + new Date(String(date.target.value)).getMonth()}-${new Date(String(date.target.value)).getDate()} ${new Date(String(date.target.value)).getHours()}:${new Date(String(date.target.value)).getMinutes()}`});
                                      setData({...data, end: date.target.value})
                                  } } type="datetime-local" />
                                </FormGroup>
                                    </CardBody>
                                </Card>
                                <Button.Ripple color="primary" type="submit" className="mt-2" >
                                    Добавить
                                </Button.Ripple>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>

        </>
    )
}
