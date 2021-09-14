import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"
import http from '../../../../http'
import { toast } from "react-toastify"

export default function ModalDeleteInsta({ show, closeModal, id, deleteInsta }) {
    const notifyWarning = (txt) => toast.warning(txt)
    const toggleModal = () => {
        if (show) {
            closeModal(false)
        } closeModal(true)
    }
    const submitForm = (e) => {
        http.delete(`delete_insta/${id}`)
            .then((res) => {
                notifyWarning('Пост успешно удален!')
                toggleModal()
                deleteInsta(id)
            })
            .catch(function (errors) {
                console.log('Ошибка', `${errors.message}`);
            })
    }
    return (
        <>
            <Modal
                isOpen={show}
                toggle={toggleModal}
                className="modal-dialog-centered"
            >
                <ModalHeader toggle={toggleModal} className="bg-danger">
                    Внимание
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                Вы уверены, что хотите удалить эту публикацию?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={(e) => { submitForm(e); toggleModal() }} >
                        Удалить
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
