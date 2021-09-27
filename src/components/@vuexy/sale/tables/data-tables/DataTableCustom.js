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
import Moment from 'react-moment'
import 'moment/locale/ru'
import 'moment-timezone'
import { Search } from 'react-feather'
import * as Icon from 'react-feather'
import ModalWarning from './ModalWarning'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import Paginate from '../../../pagination/Index'
import http from '../../../../../http'
import { toast } from 'react-toastify'
import Tst from '../../../toastify/Toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../../assets/scss/plugins/extensions/toastr.scss'
import './Index.css'

export default function Index() {
    const [post, setPost] = useState([])
    const [searchPost, setSearchPost] = useState('')
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [saleEdit, setSaleEdit] = useState([])
    const [idNews, setIdNews] = useState()

    const closeModal = (act) => {
        setModal(false)
    }

    const addSale = (el, image) => {
        setPost((prevState) => [
            ...prevState,
            {
                title: el.title,
                text: el.text,
                url: el.url,
                image: image,
            },
        ])
    }

    const handleSearchValue = (e) => {
        setSearchPost(e.target.value)
    }

    const deleteSale = (id) => {
        let res = post.findIndex((element) => element.id === id)
        post.splice(res, 1)
    }

    const editSale = (el, image) => {
        let index = post.findIndex((element) => element.id === el.id)
        post[index].title = el.title
        post[index].text = el.text
        post[index].url = el.url
        if (image === null) {
            post[index].image = el.file
        } else {
            post[index].image = image
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
        http.get(`/get_events?page=${pagePost}`).then((response) => {
            setPost(response.data.events.rows)
            setPagTotal(response.data.pages)
        })
    }, [pagePost])

    const onUpdateCurrentPage = async (page) => {
        await setPagePost(page)
    }

    return (
        <>
            <Card>
                <ModalWarning
                    show={modal}
                    closeModal={closeModal}
                    id={idNews}
                    deleteSale={deleteSale}
                />
                <ModalAdd
                    show={modalAdd}
                    addSale={addSale}
                    closeModalAdd={closeModalAdd}
                />
                <ModalEdit
                    show={modalEdit}
                    editSale={editSale}
                    closeModalEdit={closeModalEdit}
                    saleEdit={saleEdit}
                />
                <CardHeader>
                    <CardTitle>Акция</CardTitle>
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
                                <th>Описание</th>
                                <th>Ссылка</th>
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
                                            <td>{el.text}</td>
                                            <td>{el.url}</td>
                                            {/* <td>
                                                <Moment
                                                    locale="ru"
                                                    format="LLL"
                                                >
                                                    {el.data_end}
                                                </Moment>
                                            </td> */}
                                            <td>
                                                <div className="d-flex">
                                                    <Icon.Edit
                                                        size={20}
                                                        outline
                                                        id="positionTop"
                                                        onClick={() => {
                                                            setModalEdit(true)
                                                            setSaleEdit(el)
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
