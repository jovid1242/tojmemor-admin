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
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import Tst from '../../../toastify/Toastify'
import ReactHtmlParser from 'react-html-parser'
import "react-toastify/dist/ReactToastify.css"
import "../../../../../assets/scss/plugins/extensions/toastr.scss"
import './Index.css'

export default function Index() {
  const [post, setPost] = useState([])
  const [paginat, setPaginat] = useState([])
  const [searchPost, setSearchPost] = useState("")
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [project, setProject] = useState([])
  const [idNews, setIdNews] = useState()

  const closeModal = (act) => {
    setModal(false)
  }

  const addProjects = (title, text, url, img, address, phone) => {
    const newprojects = {
      title,
      text,
      url,
      img,
      address,
      phone
    }
    setPost(prevState => [...prevState, { ...newprojects }])
  }

  const handleSearchValue = e => {
    setSearchPost(e.target.value)
  }

  const editProjects = (el , file) => {
    // console.log(el);
    let index = post.findIndex(element => element.id === el.id)
    post[index].title = el.title
    post[index].text = el.text
    post[index].url = el.url
    post[index].address = el.address
    post[index].phone = el.phone

    if(file === null) {
      post[index].img = el.file
    } else {
      post[index].img = file
    }
  }

  const deleteProjects = id => {
    let res = post.findIndex(element => element.id === id)
    post.splice(res, 1)
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
    http.get(`get_project?page=${pagePost}`)
      .then((response) => {
        setPost(response.data.projects)
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
        <ModalWarning show={modal} deleteProjects={deleteProjects} closeModal={closeModal} id={idNews} />
        <ModalAdd show={modalAdd} addProjects={addProjects} closeModalAdd={closeModalAdd} />
        <ModalEdit show={modalEdit} editProjects={editProjects} closeModalEdit={closeModalEdit} project={project} />
        <CardHeader>
          <CardTitle>Проекты</CardTitle>
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
                <th>Текст</th>
                <th>Адрес</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {
                post?.filter((val) => {
                  if (!searchPost === null) {
                    return val
                  } else if ( val.text?.toLowerCase().includes(searchPost.toLowerCase())) {
                    return val
                  }
                }).map((el, index) => {
                  return (
                    <tr key={index}>
                    <th scope="row">{((pagePost-1) * 6) + (index + 1)}</th>
                      <td> <img src={el.img} alt="img-news" className="img__news" /> </td>
                      <td>{el.title}</td>
                      <td>{ReactHtmlParser(el.text.substr(0, 55) + '...')}</td>
                      <td>{el.address}</td>
                      <td>
                        <div className="d-flex">
                          <Icon.Edit
                            size={20}
                            outline
                            id="positionTop"
                            onClick={() => { setModalEdit(true); setProject(el) }}
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



