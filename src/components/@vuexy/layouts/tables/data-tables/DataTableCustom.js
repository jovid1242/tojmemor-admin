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
import ModalWarning from './ModalWarning'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import Paginate from '../../../pagination/Index'
import http from '../../../../../http'
import Tst from '../../../toastify/Toastify'
import "react-toastify/dist/ReactToastify.css"
import "../../../../../assets/scss/plugins/extensions/toastr.scss"
import './Index.css'

export default function Index() {
  const [post, setPost] = useState([])
  const [paginat, setPaginat] = useState([])
  const [pagePost, setPagePost] = useState(1)
  const [pagTotal, setPagTotal] = useState()
  const [searchPost, setSearchPost] = useState("")
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [layouts, setLayouts] = useState([])
  const [idLayout, setIdLayout] = useState()

  const closeModal = (act) => {
    setModal(false)
  }

  const addLayout = (floor, square, rooms, residences, paragraph, file) => {
    const newPost = {
      floor: floor,
      square: square,
      rooms: rooms,
      residences: residences,
      paragraph: paragraph,
      img: file
    }
    setPost(prevState => [...prevState, { ...newPost }])
  }

  const deleteLayout = id => {
    let res = post.findIndex(element => element.id === id)
    post.splice(res, 1)
  }

  const handleSearchValue = e => {
    setSearchPost(e.target.value)
  }

  const editLayout = (el, img) => {
    let index = post.findIndex(element => element.id === el.id)
    post[index].floor = el.floor
    post[index].square = el.square
    post[index].rooms = el.rooms
    post[index].title = el.title
    post[index].residences = el.residences
    post[index].paragraph = el.paragraph
    if (img === null) {
      return
    } else {
      post[index].img = img
    }
  }

  const closeModalAdd = (act) => {
    setModalAdd(false)
  }
  const closeModalEdit = (act) => {
    setModalEdit(false)
  }

  useEffect(() => {
    http.get(`get_layout?page=${pagePost}`)
      .then((response) => {
        setPost(response.data.Layout)
        setPagTotal(response.data.count)
      })
  }, [pagePost])


  const onUpdateCurrentPage = async (page) => {
    await setPagePost(page)
  }

  return (
    <>
      <Card>
        <ModalWarning show={modal} closeModal={closeModal} id={idLayout} deleteLayout={deleteLayout} />
        <ModalAdd show={modalAdd} addLayout={addLayout} closeModalAdd={closeModalAdd} />
        <ModalEdit show={modalEdit} editLayout={editLayout} closeModalEdit={closeModalEdit} layouts={layouts} />
        <CardHeader>
          <CardTitle>Планировки</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <Tst />
          <div className="d-flex flex-wrap justify-content-between">
            <div className="add-new">
              <><Button.Ripple color="primary" onClick={() => { setModalAdd(true) }}>Добавить новое</Button.Ripple></>
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
                <th>Этаж</th>
                <th>Жилой Комплекс</th>
                <th>Комнаты</th>
                <th>Квадратный метр</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>

              {
                post?.filter((val) => {
                  if (!searchPost === null) {
                    return val
                  } else if (
                    val.residences?.toLowerCase().includes(searchPost.toLowerCase())
                  ) {
                    return val
                  }
                }).map((el, index) => {
                  return (
                    <tr key={index}>
                    <th scope="row">{((pagePost-1) * 12) + (index + 1)}</th>
                      <td> <img src={el.img} alt="img-news" className="img__news" /> </td>
                      <th>{el.floor}</th>
                      <td>{el.residences}</td>
                      <td>{el.rooms}</td>
                      <td>{el.square}</td>
                      <td>
                        <div className="d-flex">
                          <Icon.Edit
                            size={20}
                            outline
                            id="positionTop"
                            onClick={() => { setModalEdit(true); setLayouts(el) }}
                          />
                          <UncontrolledTooltip placement="top" target="positionTop">
                            Изменить
                          </UncontrolledTooltip>
                          <Icon.Trash2
                            size={20}
                            className="ml-2"
                            outline
                            id="positionBottom"
                            onClick={() => { setModal(true); setIdLayout(el.id) }}
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



