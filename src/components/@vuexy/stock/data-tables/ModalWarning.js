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

export default function ModalWarning({ show, closeModal, id, deleteNews }) {
    const notifyWarning = (txt) => toast.warning(txt)
    const notifySuccess = (txt) => toast.success(txt)
    const toggleModal = () => {
        if (show) {
            closeModal(false)
        } closeModal(true)
    }
    const submitForm = (e) => {
        deleteNews(id)
        http.delete(`/delete_slider/${id}`)
            .then((res) => {
                notifySuccess('слайдер успешно удалена!')
            })
            .catch(function (errors) {
                notifyWarning(`Ошибка , ${errors.message}`);
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
                    Предупреждение
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">
                    Вы уверены, что хотите удалить эту слайдер?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={(e) => { submitForm(e); toggleModal() }} >
                        Да
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
