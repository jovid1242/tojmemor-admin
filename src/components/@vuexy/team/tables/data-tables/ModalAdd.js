import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Label,
    CustomInput,
} from 'reactstrap'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDropzone } from 'react-dropzone'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../../../../assets/scss/plugins/extensions/editor.scss'
import '../../../../../assets/scss/plugins/extensions/dropzone.scss'
import http from '../../../../../http'
import FormData from 'form-data'
import { toast } from 'react-toastify'

const formSchema = Yup.object().shape({
    required: Yup.string().required('Required'),
    minlength: Yup.string().min(4, 'Too Short!').required('Required'),
    maxlength: Yup.string().max(5, 'Too Long!').required('Required'),
})

export default function ModalAdd({ show, closeModalAdd, addTeam }) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)
    const [files, setFiles] = useState([])
    const [preloadImg, setpreloadImg] = useState({ image: null })
    const [post, setPost] = useState({
        name: null,
        profession: null,
        file: null,
    })

    const toggleModal = () => {
        if (show) {
            closeModalAdd(false)
        }
        closeModalAdd(true)
    }

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

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', post.name)
        data.append('profession', post.profession)
        data.append('image', post.file)
        http.post('/team/create ', data)
            .then((response) => {
                addTeam(post, preloadImg.image)
                toggleModal()
                notifySuccess('Соотрудник успешно добавлен!')
            })
            .catch(function (errors) {
                notifyError(`О боже ошибка , ${errors.message}`)
            })
    }

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        },
        [files]
    )

    return (
        <>
            <Modal
                isOpen={show}
                toggle={toggleModal}
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader toggle={toggleModal} className="bg-primary">
                    Добавление сотрудника
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
                                            <Label for="required">Имя</Label>
                                            <Field
                                                name="text"
                                                id="required"
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        name:
                                                            e.target.value,
                                                    })
                                                }
                                                className={`form-control ${
                                                    errors.required &&
                                                    touched.required &&
                                                    'is-invalid'
                                                }`}
                                            />
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">
                                                Профессия
                                            </Label>
                                            <Field
                                                name="text"
                                                id="required"
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        profession:
                                                            e.target.value,
                                                    })
                                                }
                                                className={`form-control ${
                                                    errors.required &&
                                                    touched.required &&
                                                    'is-invalid'
                                                }`}
                                            />
                                            {errors.required &&
                                            touched.required ? (
                                                <div className="invalid-tooltip mt-25">
                                                    {errors.required}
                                                </div>
                                            ) : null}
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="rdt_Wrapper">
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
