import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import http from '../../../../../http'
import { toast } from 'react-toastify'

export default function ModalWarning({ show, closeModal, id, deleteSale }) {
    const notifyWarning = (txt) => toast.warning(txt)
    const notifySuccess = (txt) => toast.success(txt)
    const toggleModal = () => {
        if (show) {
            closeModal(false)
        }
        closeModal(true)
    }
    const submitForm = (e) => {
        deleteSale(id)
        http.delete(`/events/delete/${id}`)
            .then((res) => {
                notifySuccess('Акция успешно добавлена!!')
            })
            .catch(function (errors) {
                notifyWarning(`Ошибка , ${errors.message}`)
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
                    Вы уверены, что хотите удалить эту акцию?
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={(e) => {
                            submitForm(e)
                            toggleModal()
                        }}
                    >
                        Удалить
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
