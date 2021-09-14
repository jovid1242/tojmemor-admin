import React, { useState, useEffect } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Button,
    Label
} from "reactstrap"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { useDropzone } from "react-dropzone"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../../../assets/scss/plugins/extensions/editor.scss"
import "../../../../../assets/scss/plugins/extensions/dropzone.scss"

const formSchema = Yup.object().shape({
    required: Yup.string().required("Required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Required"),
    number: Yup.number().required("Required"),
    url: Yup.string()
        .url()
        .required("Required"),
    date: Yup.date().required("Required"),
    minlength: Yup.string()
        .min(4, "Too Short!")
        .required("Required"),
    maxlength: Yup.string()
        .max(5, "Too Long!")
        .required("Required")
})

export default function ModalAddNews() {
    const [edit, setEdit] = useState({
        editorState: EditorState.createEmpty()
    })

    const onEditorStateChange = editorState => {
        setEdit({
            editorState
        })
    }

    const [files, setFiles] = useState([])
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
            <Card>
                <CardHeader>
                    <CardTitle>Добавление новостей</CardTitle>
                </CardHeader>
                <CardBody>
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
                            <Form>
                                <FormGroup className="my-3">
                                    <Label for="required">Заголовок</Label>
                                    <Field
                                        name="required"
                                        id="required"
                                        className={`form-control ${errors.required &&
                                            touched.required &&
                                            "is-invalid"}`}
                                    />
                                    {errors.required && touched.required ? (
                                        <div className="invalid-tooltip mt-25">{errors.required}</div>
                                    ) : null}
                                </FormGroup>
                                <section>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <p className="mx-1">
                                            Перетащите сюда файл или щелкните, чтобы выбрать файлы
                                        </p>
                                    </div>
                                    <aside className="thumb-container">{thumbs}</aside>
                                </section>

                                <FormGroup className="my-3">
                                    <Label for="date">Date</Label>
                                    <Field
                                        type="date"
                                        name="date"
                                        id="date"
                                        className={`form-control ${errors.date &&
                                            touched.date &&
                                            "is-invalid"}`}
                                    />
                                    {errors.date && touched.date ? (
                                        <div className="invalid-tooltip mt-25">{errors.date}</div>
                                    ) : null}
                                </FormGroup>
                                <Editor
                                    editorState={edit.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={onEditorStateChange}
                                />
                                <Button.Ripple color="primary" type="submit" className="mt-2">
                                    Отправить
                                </Button.Ripple>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </>
    )
}
