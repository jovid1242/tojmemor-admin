import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import http from '../../../../http'
import { toast } from 'react-toastify'

export default function ModalVideoDelete({
    show,
    closeModal,
    id,
    deleteProjects,
}) {
    const notifySuccess = (txt) => toast.success(txt)
    const toggleModal = () => {
        if (show) {
            closeModal(false)
        }
        closeModal(true)
    }
    const submitForm = (e) => {
        deleteProjects(id)
        http.delete(`/video/delete/${id}`)
            .then((res) => {
                notifySuccess('Видео успешно удалено!')
            })
            .catch(function (errors) {
                console.log('Ошибка', `${errors.message}`)
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
                    Вы уверены, что хотите удалить этого видео?
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
