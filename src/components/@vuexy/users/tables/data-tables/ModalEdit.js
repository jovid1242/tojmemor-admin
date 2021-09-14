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

export default function ModalEdit({ show, closeModalEdit, editUser, user }) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)
    const [files, setFiles] = useState([])
    const [preloadImg, setpreloadImg] = useState({ image: null })

    const [post, setPost] = useState({
        id: null,
        name: null,
        username: null,
        email: null,
        role: null,
        status: null,
        file: null,
        password: null
    })

    useEffect(() => {
        setPost({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            file: user.img,
            password: user.password
        })
        setpreloadImg({image: user.img})
    }, [user])
    

    const toggleModal = () => {
        if (show) {
            closeModalEdit(false)
        } closeModalEdit(true)
    }
    const handleFileInput = (e) => {
        setPost({ ...post, file: e.target.files[0] });
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setpreloadImg({
                image: URL.createObjectURL(img)
            });
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            )
        }
    })

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', post.name);
        data.append('username', post.username);
        data.append('email', post.email);
        data.append('password', post.password);
        data.append('role', post.role);
        data.append('status', post.status === 1 ? true : false);
        data.append('file', post.file);
        // console.log(post);
        console.log(post);
        // editNews(post)
        http.put(`/update_user/${post.id}`, data)
            .then((response) => {
                toggleModal()
                editUser(post, preloadImg.image)
                notifySuccess('Ползователь успешно изменено!')
                // console.log(response.data);
                // setPost(response.data.news)
            })
            .catch(function (errors) {
                notifyError(`О нет, ${errors.message}`)
            })
    }

    const thumbs = files.map(file => (
        <div className="dz-thumb" key={file.name}>
            <div className="dz-thumb-inner">
                <img src={file.preview} className="dz-img" alt={file.name} />
            </div>
        </div>
    ))

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview))
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
                Редактирование пользователя
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
                            <Label for="required">Имя</Label>
                            <Field
                                name="text"
                                value={post.name}
                                onChange={e => setPost({...post, name: e.target.value})}
                                className="form-control" />
                        </FormGroup>

                                <FormGroup className="my-3">
                                <Label for="required"> Логин (Username)</Label>
                                <Field
                                    name="username"
                                    id="required"
                                    value={post.username}
                                    onChange={e => setPost({...post, username: e.target.value})}
                                    className={`form-control ${errors.required &&
                                        touched.required &&
                                        "is-invalid"}`}
                                />
                                {errors.required && touched.required ? (
                                    <div className="invalid-tooltip mt-25">{errors.required}</div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="my-3">
                                    <Label for="required">E-mail</Label>
                                    <Field
                                        name="email"
                                        id="required"
                                        value={post.email}
                                        onChange={e => setPost({...post, email: e.target.value})}
                                        className={`form-control ${errors.required &&
                                            touched.required &&
                                            "is-invalid"}`}
                                    />
                                    {errors.required && touched.required ? (
                                        <div className="invalid-tooltip mt-25">{errors.required}</div>
                                    ) : null}
                                </FormGroup>

                                <FormGroup className="my-3">
                                <Label for="required">Пароль</Label>
                                <Field
                                    name="password"
                                    id="required"
                                    value={post.password}
                                    onChange={e => setPost({...post, password: e.target.value})}
                                    className={`form-control ${errors.required &&
                                        touched.required &&
                                        "is-invalid"}`}
                                />
                                {errors.required && touched.required ? (
                                    <div className="invalid-tooltip mt-25">{errors.required}</div>
                                ) : null}
                            </FormGroup>

                                <FormGroup className="my-3">
                                <Label for="required">Рол</Label>
                                <CustomInput type="select" name="select" id="city"  value={post.role} onChange={e => { setPost({ ...post, role: e.target.value }) }} >
                                    <option value="-1"></option>
                                    <option value="admin">Админ</option>
                                    <option value="manager">Менеджер</option>
                                </CustomInput>
                            </FormGroup>

                                <FormGroup className="my-3">
                                    <Label for="required">Статус</Label>
                                    <CustomInput type="select" name="select" id="city" value={post.status} onChange={e => { setPost({ ...post, status: e.target.value }) }} >
                                        <option value="-1"></option>
                                        <option value="1">Активный</option>
                                        <option value="2">Не активный</option>
                                    </CustomInput>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="rdt_Wrapper">
                                <section>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} onChange={handleFileInput} />
                                        <p className="mx-1">
                                            Перетащите сюда файл или щелкните, чтобы выбрать файл
                                    </p>
                                    </div>
                                    <aside className="thumb-container">
                                        <div className="dz-thumb">
                                            <div className="dz-thumb-inner">
                                                {preloadImg.image !== null ? <img src={preloadImg.image} className="dz-img" alt="dd" /> : null}
                                            </div>
                                        </div>
                                    </aside>
                                </section>
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
