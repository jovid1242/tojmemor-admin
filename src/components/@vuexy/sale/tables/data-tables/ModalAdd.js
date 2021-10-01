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
    CustomInput,
} from 'reactstrap'

import 'flatpickr/dist/themes/light.css'
import '../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../../../../assets/scss/plugins/extensions/editor.scss'
import '../../../../../assets/scss/plugins/extensions/dropzone.scss'
import http from '../../../../../http'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

const formSchema = Yup.object().shape({
    required: Yup.string().required('Required'),
    minlength: Yup.string().min(4, 'Too Short!').required('Required'),
    maxlength: Yup.string().max(5, 'Too Long!').required('Required'),
})

export default function ModalAdd({ show, closeModalAdd, addSale }) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)

    const [preloadImg, setpreloadImg] = useState({ image: null })
    const [files, setFiles] = useState([])
    const [post, setPost] = useState({
        title: null,
        text: null,
        url: null,
        file: null,
    })

    const handleFileInput = (e) => {
        setPost({ ...post, file: e.target.files[0] })
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setpreloadImg({
                image: URL.createObjectURL(img),
            })
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    const toggleModal = () => {
        if (show) {
            closeModalAdd(false)
        }
        closeModalAdd(true)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('title', post.title)
        data.append('text', post.text)
        data.append('url', post.url)
        data.append('image', post.file)
        http.post('/events/create', data)
            .then((response) => {
                addSale(post, preloadImg.image)
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
                            required: '',
                            name: '',
                            date: '',
                            minlength: '',
                            maxlength: '',
                        }}
                        validationSchema={formSchema}
                    >
                        {({ errors, touched }) => (
                            <Form className="w-100" onSubmit={submitForm}>
                                <Card>
                                    <CardBody className="rdt_Wrapper">
                                        <FormGroup className="my-3">
                                            <Label for="required">
                                                Заголовок
                                            </Label>
                                            <Field
                                                name="title"
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">
                                                Описание
                                            </Label>
                                            <Field
                                                name="text"
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        text: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Ссылка</Label>
                                            <Field
                                                name="url"
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        url: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <section>
                                            <div
                                                {...getRootProps({
                                                    className: 'dropzone',
                                                })}
                                            >
                                                <input
                                                    {...getInputProps()}
                                                    onChange={handleFileInput}
                                                />
                                                <p className="mx-1">
                                                    Перетащите сюда файл или
                                                    щелкните, чтобы выбрать файл
                                                </p>
                                            </div>
                                            <aside className="thumb-container">
                                                <div className="dz-thumb">
                                                    <div className="dz-thumb-inner">
                                                        {preloadImg.image !==
                                                        null ? (
                                                            <img
                                                                src={
                                                                    preloadImg.image
                                                                }
                                                                className="dz-img"
                                                                alt="dd"
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </aside>
                                        </section>
                                    </CardBody>
                                </Card>
                                <Button.Ripple
                                    color="primary"
                                    type="submit"
                                    className="mt-2"
                                >
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
