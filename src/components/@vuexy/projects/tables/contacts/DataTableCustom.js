import React, { useEffect, useState } from 'react'
import {
    Table,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledTooltip,
} from 'reactstrap'
import { Search } from 'react-feather'
import * as Icon from 'react-feather'
import ModalWarning from './ModalWarning'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import http from '../../../../../http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Tst from '../../../toastify/Toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/scss/plugins/extensions/toastr.scss'
import './Index.css'

export default function Index() {
    const [post, setPost] = useState([])
    const [projects, setProjects] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [project, setProject] = useState([])
    const [idNews, setIdNews] = useState()

    useEffect(() => {
        http.get('/pr_contact').then((res) => {
            setPost(res.data.pr_layouts)
        })
        http.get('/projects').then((res) => {
            setProjects(res.data.projects)
        })
    }, [])

    const closeModal = (act) => {
        setModal(false)
    }

    const addProjects = (el) => {
        setPost((prevState) => [...prevState, { el }])
    }

    const handleSearchValue = (e) => {
        setSearchPost(e.target.value)
    }

    const editProjects = (el) => {
        let index = post.findIndex((element) => element.id === el.id)
        post[index].project_id = el.project_id
        post[index].adress = el.adress
        post[index].phone = el.phone
        post[index].email = el.email
        post[index].url = el.url
    }

    const deleteProjects = (id) => {
        let res = post.findIndex((element) => element.id === id)
        post.splice(res, 1)
    }

    const closeModalAdd = (act) => {
        setModalAdd(false)
    }
    const closeModalEdit = (act) => {
        setModalEdit(false)
    }

    const findProject = (el) => {
        return projects.map((item, index) => {
            if (item.id === el.project_id) {
                return <div key={index}>{item.title}</div>
            }
            return
        })
    }

    return (
        <>
            <Card>
                <ModalWarning
                    show={modal}
                    deleteProjects={deleteProjects}
                    closeModal={closeModal}
                    id={idNews}
                />
                <ModalAdd
                    show={modalAdd}
                    addProjects={addProjects}
                    closeModalAdd={closeModalAdd}
                    projects={projects}
                />
                <ModalEdit
                    show={modalEdit}
                    editProjects={editProjects}
                    closeModalEdit={closeModalEdit}
                    project={project}
                    projects={projects}
                />
                <CardHeader>
                    <CardTitle>Контакты</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                    <Tst />
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="add-new">
                            <>
                                <Button.Ripple
                                    color="primary"
                                    onClick={() => {
                                        setModalAdd(true)
                                    }}
                                >
                                    Добавить новое
                                </Button.Ripple>
                            </>
                        </div>
                        <div className="position-relative has-icon-left mb-1">
                            {/* <Input onChange={handleSearchValue} />
                            <div className="form-control-position">
                                <Search size="15" />
                            </div> */}
                        </div>
                    </div>
                    <Table className="table-hover-animation" responsive>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Проекты</th>
                                <th>Адрес</th>
                                <th>Телефон</th>
                                <th>E-mail</th>
                                <th>Ссылка на карту</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post?.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{findProject(el)}</td>
                                        <td>{el.adress} </td>
                                        <td>{el.phone} </td>
                                        <td>{el.email} </td>
                                        <td>
                                            <a href={el.url} target="_blanck">
                                                {el.url}
                                            </a>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <Icon.Edit
                                                    size={20}
                                                    outline
                                                    id="positionTop"
                                                    onClick={() => {
                                                        setModalEdit(true)
                                                        setProject(el)
                                                    }}
                                                />
                                                <UncontrolledTooltip
                                                    placement="top"
                                                    target="positionTop"
                                                >
                                                    Изменить
                                                </UncontrolledTooltip>
                                                <Icon.Trash2
                                                    size={20}
                                                    className="ml-2"
                                                    outline
                                                    id="positionBottom"
                                                    onClick={() => {
                                                        setModal(true)
                                                        setIdNews(el.id)
                                                    }}
                                                />
                                                <UncontrolledTooltip
                                                    placement="bottom"
                                                    target="positionBottom"
                                                >
                                                    Удалить
                                                </UncontrolledTooltip>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}
