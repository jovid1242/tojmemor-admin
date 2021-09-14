import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardImg,
    Row,
    Col,
    Button,
    CardHeader, CardTitle
} from "reactstrap"
import http from '../../../../http'
import Paginate from '../../pagination/Index'
import ModalAdd from './ModalAddInsta'
import ModalDeleteInsta from './ModalDeleteInsta'
import ModalEdit from './ModalEditInsta'

export default function Index() {
    const [insta, setInsta] = useState([])
    const [post, setPost] = useState([])
    // const [paginat, setPaginat] = useState([])
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [pagePost, setPagePost] = useState(1)
    const [pagTotal, setPagTotal] = useState()
    const [idInsta, setIdInsta] = useState()


    useEffect(() => {
        http.get(`get_insta?page=${pagePost}`)
            .then((response) => {
                setPost(response.data.Instagram)
                setPagTotal(response.data.count)
            })
    }, [pagePost])


    const onUpdateCurrentPage = async (page) => {
        await setPagePost(page)
        console.log('async update', page);
    }


    const addPostInsta = (url, img) => {
        const newPost = {
            url: url,
            img: img
        }
        setPost(prevState => [...prevState, { ...newPost }]);
    }

    const deleteInsta = id => {
        let res = post.findIndex(element => element.id === id)
          post.splice(res, 1)
    }

    const editInsta = (id, url, img) => {
        let index = post.findIndex(element => element.id === id)
        post[index].url = url
        post[index].img = img
    }

    const closeModal = () => {
        setModal(false)
    }

    const closeModalAdd = () => {
        setModalAdd(false)
    }
    const closeModalEdit = () => {
        setModalEdit(false)
    }

    return (
        <>
            <ModalEdit show={modalEdit} editInsta={editInsta} closeModalEdit={closeModalEdit} insta={insta} />
            <ModalDeleteInsta show={modal} deleteInsta={deleteInsta} closeModal={closeModal} id={idInsta} />
            <ModalAdd show={modalAdd} addPostInsta={addPostInsta} closeModalAdd={closeModalAdd} />
            <Card>
                <CardHeader>
                    <CardTitle>Инстаграм</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="add-new">
                            <Button.Ripple color="primary" onClick={() => { setModalAdd(true) }}>Добавить новое</Button.Ripple>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Row>
                {
                    post?.map((el, index) => {
                        return (
                            <Col lg="4" md="12" key={index}>
                                <Card>
                                    <CardBody>
                                        <a href={el.url}>
                                            <CardImg
                                                className="img-fluid mb-2"
                                                src={el.img}
                                                alt="card image cap"
                                            />
                                        </a>
                                        <div className="card-btns d-flex mt-2">
                                            <Button.Ripple
                                                onClick={() => { setModalEdit(true); setInsta(el) }}
                                                color="primary">Изменить</Button.Ripple>
                                            <Button.Ripple
                                                className="ml-1"
                                                color="primary"
                                                onClick={() => { setModal(true); setIdInsta(el.id) }}
                                                outline>Удалить</Button.Ripple>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

            <Paginate total={pagTotal} currentPage={pagePost} onChangeCurrentPage={onUpdateCurrentPage} />
        </>
    )
}
