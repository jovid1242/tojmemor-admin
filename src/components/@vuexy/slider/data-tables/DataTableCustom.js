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
  const [searchPost, setSearchPost] = useState("")
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [news, setNews] = useState([])
  const [idNews, setIdNews] = useState()

  const closeModal = (act) => {
    setModal(false)
  }

  const addSlider = (title, text, url, position, img) => {
    const newsPost = {
      title,
      text,
      url,
      position,
      img
    }
    setPost(prevState => [...prevState, { ...newsPost }])
  }

  const handleSearchValue = e => {
    setSearchPost(e.target.value)
  }

  const deleteSlider = id => {
    let res = post.findIndex(element => element.id === id)
    post.splice(res, 1)
  }

  const editSlider = (el, img) => {
    let index = post.findIndex(element => element.id === el.id)
    post[index].title = el.title
    post[index].text = el.text
    post[index].url = el.url
    post[index].position = el.position
    post[index].img = img
  }

  const closeModalAdd = (act) => {
    setModalAdd(false)
  }
  const closeModalEdit = (act) => {
    setModalEdit(false)
  }

  // useEffect(() => {
  //   http.get('/get_news')
  //     .then((response) => {
  //       setPost(response.data.news)
  //     })
  //     .catch(function (errors) {
  //       console.log('Ошибка', `${errors.message}`);
  //     })
  // }, [])

  const [pagePost, setPagePost] = useState(1)
  const [pagTotal, setPagTotal] = useState()
  useEffect(() => {
    http.get(`get_slider?page=${pagePost}`)
      .then((response) => {
        setPost(response.data)
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
        <ModalWarning show={modal} closeModal={closeModal} id={idNews} deleteSlider={deleteSlider} />
        <ModalAdd show={modalAdd} addSlider={addSlider} closeModalAdd={closeModalAdd} />
        <ModalEdit show={modalEdit} editSlider={editSlider} closeModalEdit={closeModalEdit} news={news} />
        <CardHeader>
          <CardTitle>Слайдер</CardTitle>
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
                <th>Заголовок</th>
                <th>Ссылка</th>
                <th>Текст</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {
                post?.filter((val) => {
                  if (!searchPost === null) {
                    return val
                  } else if (val.title?.toLowerCase().includes(searchPost.toLowerCase()) || val.text?.toLowerCase().includes(searchPost.toLowerCase())) {
                    return val
                  }
                }).map((el, index) => {
                  return (
                    <tr key={index}>
                    <th scope="row">{((pagePost-1) * 6) + (index + 1)}</th>
                      <td> <img src={el.img} alt="img-news" className="img__news" /> </td>
                      <td>{el.title}</td>
                      <td>{el.url}</td>
                      <td>{el.text}</td>
                      <td>
                        <div className="d-flex">
                          <Icon.Edit
                            size={20}
                            outline
                            id="positionTop"
                            onClick={() => { setModalEdit(true); setNews(el) }}
                          />
                          <UncontrolledTooltip placement="top" target="positionTop">
                            Изменить
                          </UncontrolledTooltip>
                          <Icon.Trash2
                            size={20}
                            className="ml-2"
                            outline
                            id="positionBottom"
                            onClick={() => { setModal(true); setIdNews(el.id) }}
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



