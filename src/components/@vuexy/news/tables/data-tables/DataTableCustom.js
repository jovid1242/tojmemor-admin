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
    const [count, setCount] = useState()
    const [paginat, setPaginat] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [news, setNews] = useState([])
    const [idNews, setIdNews] = useState()

    const closeModal = (act) => {
        setModal(false)
    }
    console.log('count', count)

    const addNews = (title, text, file) => {
        const newsPost = {
            title: title,
            text: text,
            image: file,
        }
        setPost((prevState) => [...prevState, { ...newsPost }])
    }

    const handleSearchValue = (e) => {
        setSearchPost(e.target.value)
    }

    const deleteNews = (id) => {
        let res = post.findIndex((element) => element.id === id)
        post.splice(res, 1)
    }

    const editNews = (el, file) => {
        let index = post.findIndex((element) => element.id === el.id)
        post[index].title = el.title
        post[index].text = el.text
        post[index].data = el.data
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
        http.get(`get_news?page=${pagePost}`).then((response) => {
            setPost(response.data.news.rows)
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
                    deleteNews={deleteNews}
                />
                <ModalAdd
                    show={modalAdd}
                    addNews={addNews}
                    closeModalAdd={closeModalAdd}
                />
                <ModalEdit
                    show={modalEdit}
                    editNews={editNews}
                    closeModalEdit={closeModalEdit}
                    news={news}
                />
                <CardHeader>
                    <CardTitle>Новости</CardTitle>
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
                                <th>Изображение</th>
                                <th>Заголовок</th>
                                <th>Текст</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post
                                ?.filter((val) => {
                                    if (!searchPost === null) {
                                        return val
                                    } else if (
                                        val.title
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
                                            <th scope="row">
                                                {(pagePost - 1) * 6 +
                                                    (index + 1)}
                                            </th>
                                            <td>
                                                {' '}
                                                <img
                                                    src={el.image}
                                                    alt="img-news"
                                                    className="img__news"
                                                />{' '}
                                            </td>
                                            <td>{el.title}</td>
                                            <td>
                                                {ReactHtmlParser(
                                                    el.text.substr(0, 65) +
                                                        '...'
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <Icon.Edit
                                                        size={20}
                                                        outline
                                                        id="positionTop"
                                                        onClick={() => {
                                                            setModalEdit(true)
                                                            setNews(el)
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
