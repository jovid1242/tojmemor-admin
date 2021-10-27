import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CustomInput,
    CardBody,
    FormGroup,
    Label,
} from 'reactstrap'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDropzone } from 'react-dropzone'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../../../../../assets/scss/plugins/extensions/editor.scss'
import '../../../../../assets/scss/plugins/extensions/dropzone.scss'
import http from '../../../../../http'
import FormData from 'form-data'
import { toast } from 'react-toastify'
import htmlToDraft from 'html-to-draftjs'

const formSchema = Yup.object().shape({
    required: Yup.string().required('Required'),
    minlength: Yup.string().min(4, 'Too Short!').required('Required'),
    maxlength: Yup.string().max(5, 'Too Long!').required('Required'),
})

export default function ModalEdit({
    show,
    closeModalEdit,
    editProjects,
    project,
    projects,
}) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)
    const [post, setPost] = useState({
        id: null,
        project_id: null,
        text: null,
    })

    useEffect(() => {
        setPost({
            id: project.id,
            project_id: project.project_id,
            text: project.text,
        })
    }, [project])

    const toggleModal = () => {
        if (show) {
            closeModalEdit(false)
        }
        closeModalEdit(true)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('project_id', post.project_id)
        data.append('text', post.text)
        http.put(`pr_advantages/update/${post.id}`, data)
            .then((response) => {
                editProjects(post)
                toggleModal()
                notifySuccess('Преимущества успешно изменено!')
            })
            .catch(function (errors) {
                notifyError(`О нет ошибка , ${errors.message}`)
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
                    Редактирование проекта
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
                                                Жилой комплекс
                                            </Label>
                                            <CustomInput
                                                type="select"
                                                name="select"
                                                id="city"
                                                onChange={(e) => {
                                                    setPost({
                                                        ...post,
                                                        project_id:
                                                            e.target.value,
                                                    })
                                                }}
                                            >
                                                <option value=""></option>
                                                {projects?.map((el, index) => {
                                                    return (
                                                        <option
                                                            value={el.id}
                                                            key={index}
                                                        >
                                                            {el.title}
                                                        </option>
                                                    )
                                                })}
                                            </CustomInput>
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Текст</Label>
                                            <Field
                                                name="url"
                                                id="required"
                                                value={post.text}
                                                onChange={(e) =>
                                                    setPost({
                                                        ...post,
                                                        text: e.target.value,
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

                                <Button.Ripple
                                    color="primary"
                                    type="submit"
                                    className="mt-2"
                                >
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
