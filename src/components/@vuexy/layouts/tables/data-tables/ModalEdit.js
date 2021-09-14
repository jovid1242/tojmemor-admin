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
    CustomInput
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

export default function ModalEdit({ show, closeModalEdit, editLayout, layouts }) {
    const notifySuccess = (txt) => toast.success(txt)
    const notifyError = (txt) => toast.error(txt)
    const [groupRes, setGroupRes] = useState([])
    const [layoutcategory, setLayoutcategory] = useState([])
    const [preloadImg, setpreloadImg] = useState({ image: null })
    const [files, setFiles] = useState([])
    // const [title, setTitle] = useState("")
    const [edit, setEdit] = useState({
        editorState: EditorState.createEmpty()
    })

    const [imageFile, setImageFile] = useState({
        file: null
    })

    const [post, setPost] = useState({
        id: null,
        file: null,
        floor: null,
        square: null,
        rooms: null,
        residences: 1,
        paragraph: 1
    })

    useEffect(() => {
        setPost({
            id: layouts.id,
            file: layouts.img,
            floor: layouts.floor,
            square: layouts.square,
            rooms: layouts.rooms,
            residences: layouts.residences,
            layoutcategory: layouts.paragraph
        })
        setpreloadImg({image: layouts.img})
    }, [layouts])

    const toggleModal = () => {
        if (show) {
            closeModalEdit(false)
        } closeModalEdit(true)
    }

    const handleFileInput = (e) => {
        setImageFile({ file: e.target.files[0] });
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setpreloadImg({
                image: URL.createObjectURL(img)
            });
        }
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = post
        data[name] = value
        setPost(data);
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

    useEffect(() => {
        http.get(`get_residences`)
            .then((response) => {
                setGroupRes(response.data)
            })
    }, [])

    useEffect(() => {
        http.get(`get_layoutcategory/${post.paragraph}`)
            .then((response) => {
                setLayoutcategory(response.data)
            })
    }, [post.paragraph])

    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('floor', post.floor);
        data.append('square', post.square);
        data.append('rooms', post.rooms);
        data.append('residences', post.residences);
        data.append('layoutcategory', post.paragraph);
        data.append('file', post.file);
        // console.log(post);
        // console.log(post);
        // editLayout(post)
        http.put(`update_layout/${post.id}`, data)
            .then((response) => {
                toggleModal()
                editLayout(post, preloadImg.image)
                notifySuccess('Планировок успешно изменено!')
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
                Редактирование планировки
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
                                            <Label for="required">Этаж</Label>
                                            <Field
                                                name="floor"
                                                value={post.floor}
                                                id="required"
                                                onChange={e => setPost({ ...post, floor: e.target.value })}
                                                className={`form-control ${errors.required &&
                                                    touched.required &&
                                                    "is-invalid"}`}
                                            />
                                            {errors.required && touched.required ? (
                                                <div className="invalid-tooltip mt-25">{errors.required}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Комнаты</Label>
                                            <Field
                                                name="rooms"
                                                value={post.rooms}
                                                id="required"
                                                onChange={e => setPost({ ...post, rooms: e.target.value })}
                                                className={`form-control ${errors.required &&
                                                    touched.required &&
                                                    "is-invalid"}`}
                                            />
                                            {errors.required && touched.required ? (
                                                <div className="invalid-tooltip mt-25">{errors.required}</div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Жилой комплекс</Label>
                                            <CustomInput type="select" name="select" id="city" onChange={e => { setPost({ ...post, paragraph: e.target.value }) }} >
                                                <option value=""></option>
                                                {
                                                    groupRes?.map((el, index) => {
                                                        return (
                                                            <option value={el.id} key={index} >{el.name}</option>
                                                        )
                                                    })
                                                }
                                            </CustomInput>
                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Блок</Label>
                                            <CustomInput type="select" name="paragraph" id="city" onChange={handleInput}>
                                                <option value="" disabled></option>
                                                {
                                                    layoutcategory?.map((el, index) => {
                                                        return (
                                                            <option value={el.id} key={index}>{el.name}</option>
                                                        )
                                                    })
                                                }
                                            </CustomInput>

                                        </FormGroup>
                                        <FormGroup className="my-3">
                                            <Label for="required">Квадратный метр</Label>
                                            <Field
                                                name="square"
                                                value={post.square}
                                                id="required"
                                                onChange={e => setPost({ ...post, square: e.target.value })}
                                                className={`form-control ${errors.required &&
                                                    touched.required &&
                                                    "is-invalid"}`}
                                            />
                                            {errors.required && touched.required ? (
                                                <div className="invalid-tooltip mt-25">{errors.required}</div>
                                            ) : null}
                                        </FormGroup>

                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="rdt_Wrapper">
                                        <section>
                                            <div {...getRootProps({ className: "dropzone" })}>
                                                <input
                                                    onChange={handleFileInput}
                                                    {...getInputProps()} />
                                                <p className="mx-1">
                                                Перетащите сюда файл или щелкните, чтобы выбрать файл
                                            </p>
                                            </div>
                                            <aside className="thumb-container">{thumbs}</aside>
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
