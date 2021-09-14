import React, { useEffect, useState } from 'react'
import {
    Table,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    UncontrolledTooltip
} from "reactstrap"
import { Search } from "react-feather"
import * as Icon from "react-feather"
import ModalWarning from './ModalDeleteVideo'
import ModalAdd from './ModalAddVideo'
import ModalEdit from './ModalEditVideo'
import Paginate from '../../pagination/Index'
import http from '../../../../http'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import Tst from '../../toastify/Toastify'
import ReactHtmlParser from 'react-html-parser'
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import './Index.css'

export default function Index() {
    const [post, setPost] = useState([])
    const [paginat, setPaginat] = useState([])
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [video, setVideo] = useState([])
    const [idVideo, setIdVideo] = useState()

    const closeModal = (act) => {
        setModal(false)
    }

    const addVideo = (url, img) => {
        const newVideo = {
            url: url,
            img: img
        }
        setPost(prevState => [...prevState, { ...newVideo }]);
    }

    const editVideo = (id, url, img) => {
        let index = post.findIndex(element => element.id === id)
        post[index].url = url
        post[index].img = img
    }

    const deleteProjects = id => {
        let res = post.findIndex(element => element.id === id)
        post.splice(res, 1)
        console.log('res', res, "post", post);
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
        http.get(`get_video?page=${pagePost}`)
            .then((response) => {
                setPost(response.data.videogallery)
                setPagTotal(response.data.count)
            })
    }, [pagePost])


    const onUpdateCurrentPage = async (page) => {
        await setPagePost(page)
        console.log('async update', page);
    }

    return (
        <>
            <Card>
                <ModalWarning show={modal} deleteProjects={deleteProjects} closeModal={closeModal} id={idVideo} />
                <ModalAdd show={modalAdd} addVideo={addVideo} closeModalAdd={closeModalAdd} />
                <ModalEdit show={modalEdit} editVideo={editVideo} closeModalEdit={closeModalEdit} video={video} />
                <CardHeader>
                    <CardTitle>Видео</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                    <Tst />
                    <div className="d-flex flex-wrap justify-content-between mb-2">
                        <div className="add-new">
                            <><Button.Ripple color="primary" onClick={() => { setModalAdd(true) }}>Добавить новое</Button.Ripple></>
                        </div>
                    </div>
                    <Table className="table-hover-animation" responsive>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Изображение</th>
                                <th>Ссылка на видео</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                post?.map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td> <img src={el.img} alt="img-news" className="img__news" /> </td>
                                            <td>{el.url}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Icon.Edit
                                                        size={20}
                                                        outline
                                                        id="positionTop"
                                                        onClick={() => { setModalEdit(true); setVideo(el) }}
                                                    />
                                                    <UncontrolledTooltip placement="top" target="positionTop">
                                                        Изменить
                          </UncontrolledTooltip>
                                                    <Icon.Trash2
                                                        size={20}
                                                        className="ml-2"
                                                        outline
                                                        id="positionBottom"
                                                        onClick={() => { setModal(true); setIdVideo(el.id) }}
                                                    />
                                                    <UncontrolledTooltip placement="bottom" target="positionBottom">
                                                        Удалить
                          </UncontrolledTooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Paginate total={pagTotal} currentPage={pagePost} onChangeCurrentPage={onUpdateCurrentPage} />
                </CardBody>
            </Card>

        </>
    )
}



