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
import Paginate from '../../../pagination/Index'
import http from '../../../../../http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Tst from '../../../toastify/Toastify'
import ReactHtmlParser from 'react-html-parser'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/scss/plugins/extensions/toastr.scss'
import './Index.css'

export default function Index() {
    const [post, setPost] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [user, setUser] = useState([])
    const [idNews, setIdNews] = useState()

    const closeModal = (act) => {
        setModal(false)
    }

    const addUser = (el, file) => {
        setPost((prevState) => [
            ...prevState,
            {
                name: el.name,
                email: el.email,
                password: el.password,
                status: el.status,
                image: file,
            },
        ])
    }

    const handleSearchValue = (e) => {
        setSearchPost(e.target.value)
    }

    const deleteUser = (id) => {
        let res = post.findIndex((element) => element.id === id)
        post.splice(res, 1)
    }

    const editUser = (el, file) => {
        let index = post.findIndex((element) => element.id === el.id)
        post[index].name = el.name
        post[index].email = el.email
        post[index].status = el.status
        if (file === null) {
            post[index].image = el.file
        } else {
            post[index].image = file
        }
    }

    const closeModalAdd = (act) => {
        setModalAdd(false)
    }
    const closeModalEdit = (act) => {
        setModalEdit(false)
    }

    const [pagePost, setPagePost] = useState(1)
    const [pagTotal, setPagTotal] = useState()
    useEffect(() => {
        http.get(`get_users?page=${pagePost}`).then((response) => {
            setPost(response.data.user.rows)
            setPagTotal(response.data.pages)
        })
    }, [pagePost])

    const onUpdateCurrentPage = async (page) => {
        await setPagePost(page)
        console.log('async update', page)
    }

    return (
        <>
            <Card>
                <ModalWarning
                    show={modal}
                    closeModal={closeModal}
                    id={idNews}
                    deleteUser={deleteUser}
                />
                <ModalAdd
                    show={modalAdd}
                    addUser={addUser}
                    closeModalAdd={closeModalAdd}
                />
                <ModalEdit
                    show={modalEdit}
                    editUser={editUser}
                    closeModalEdit={closeModalEdit}
                    user={user}
                />
                <CardHeader>
                    <CardTitle>Ползователи</CardTitle>
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
                            <Input onChange={handleSearchValue} />
                            <div className="form-control-position">
                                <Search size="15" />
                            </div>
                        </div>
                    </div>
                    <Table className="table-hover-animation" responsive>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Картинка</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Рол</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post
                                ?.filter((val) => {
                                    if (!searchPost === null) {
                                        return val
                                    } else if (
                                        val.name
                                            ?.toLowerCase()
                                            .includes(
                                                searchPost.toLowerCase()
                                            ) ||
                                        val.text
                                            ?.toLowerCase()
                                            .includes(searchPost.toLowerCase())
                                    ) {
                                        return val
                                    }
                                })
                                .map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>
                                                {(pagePost - 1) * 6 +
                                                    (index + 1)}
                                            </th>
                                            <td className="p-1">
                                                <ul className="list-unstyled users-list m-0 d-flex">
                                                    <li className="avatar pull-up">
                                                        <img
                                                            src={el.image}
                                                            alt="avatar"
                                                            height="30"
                                                            width="30"
                                                            id={
                                                                'avatar' + el.id
                                                            }
                                                        />
                                                        <UncontrolledTooltip
                                                            placement="bottom"
                                                            target={
                                                                'avatar' + el.id
                                                            }
                                                        >
                                                            {el.name}
                                                        </UncontrolledTooltip>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>{el.name}</td>
                                            <td>{el.email}</td>
                                            <td>{el.status}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Icon.Edit
                                                        size={20}
                                                        outline
                                                        id="positionTop"
                                                        onClick={() => {
                                                            setModalEdit(true)
                                                            setUser(el)
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
                    <Paginate
                        total={pagTotal}
                        currentPage={pagePost}
                        onChangeCurrentPage={onUpdateCurrentPage}
                    />
                </CardBody>
            </Card>
        </>
    )
}
