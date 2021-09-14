import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardHeader,
    CustomInput,
    CardBody,
    FormGroup,
    Label
} from "reactstrap"
import {
    EditorState,
    convertToRaw,
    ContentState
} from "draft-js"
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg"
import {
    Formik,
    Field,
    Form
} from "formik"
import * as Yup from "yup"
import { useDropzone } from "react-dropzone"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../../../assets/scss/plugins/extensions/editor.scss"
import "../../../../../assets/scss/plugins/extensions/dropzone.scss"
import http from '../../../../../http'
import FormData from 'form-data'
import { toast } from "react-toastify"
import htmlToDraft from 'html-to-draftjs';

const formSchema = Yup.object().shape({
    required: Yup.string().required("Required"),
    minlength: Yup.string()
        .min(4, "Too Short!")
        .required("Required"),
    maxlength: Yup.string()
        .max(5, "Too Long!")
        .required("Required")
})

export default function ModalEdit({ show, closeModalEdit, editSale, saleEdit }) {
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

    useEffect(() => {
        setPost({
            id: saleEdit.id,
            desc: saleEdit.desc,
            title_second: saleEdit.title_second,
            text: saleEdit.text,
            title: saleEdit.title,
            status: saleEdit.status,
            data_start: saleEdit.data_start,
            data_end: saleEdit.data_end
        })
    }, [saleEdit])

    const toggleModal = () => {
        if (show) {
            closeModalEdit(false)
        } closeModalEdit(true)
    }

    const submitForm = (e) => {
        e.preventDefault()
        http.put(`/sale/update/${post.id}`, post)
            .then((response) => {
                toggleModal()
                editSale(post)
                notifySuccess('Акция успешно изменена!')
            })
            .catch(function (errors) {
                notifyError(`О нет, ${errors.message}`)
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
                Редактирование акции
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
                                value={post.title}
                                onChange={e => setPost({...post, title: e.target.value})}
                                className="form-control" />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Label for="required">Описание</Label>
                            <Field
                                name="title"
                                value={post.desc}
                                onChange={e => setPost({...post, desc: e.target.value})}
                                className="form-control" />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Label for="required">Заголовок</Label>
                            <Field
                                name="title"
                                value={post.title_second}
                                onChange={e => setPost({...post, title_second: e.target.value})}
                                className="form-control" />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Label for="required">Текст</Label>
                            <Field
                                name="title"
                                value={post.text}
                                onChange={e => setPost({...post, text: e.target.value})}
                                className="form-control" />
                        </FormGroup>
                        <Label for="required">Статус</Label>
                                        <CustomInput type="select" name="paragraph" id="city" onChange={e => {setPost({...post, status: e.target.value})}}>
                                            <option value=""></option>
                                            <option value="1">Опубликовано</option>
                                            <option value="0">не опубликовано</option>
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
                                    Изменить
                                </Button.Ripple>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>

        </>
    )
}
