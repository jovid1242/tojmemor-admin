import React, { useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap"
import { ChevronLeft, ChevronRight } from "react-feather"
import './Index.css'

export default function Index({ total, currentPage, onChangeCurrentPage }) {
    let [currentX, setCurrentX] = useState(currentPage)
    const paginators = () => {
        const data = [
            <PaginationItem href="#" className="prev-item">
                <PaginationLink disabled={currentX === 1} onClick={() => { prev() }} href="#" first>
                    <ChevronLeft />
                </PaginationLink>
            </PaginationItem>]
        for (let i = 1; i <= total; i++) {
            data.push(
                <PaginationItem active={currentX === i ? "active" : ""}>
                    <PaginationLink className={paginatorClassName(i)} onClick={() => { onCurrentPage(i) }} href="#" >{i}</PaginationLink>
                </PaginationItem>)
        }
        data.push(
            <PaginationItem href="#" className="next-item">
                <PaginationLink disabled={currentX === total} onClick={() => { next() }} href="#" last>
                    <ChevronRight />
                </PaginationLink>
            </PaginationItem >)
        return data
    }
    const onCurrentPage = page => {
        updateCurrentPage(page)
    }
    const updateCurrentPage = page => {
        if (page === currentX) return
        setCurrentX(page)
        onChangeCurrentPage(page)
    }
    const next = () => {
        if (currentX === total) {
            return
        }
        const n = currentX + 1
        updateCurrentPage(n)
    }

    const prev = () => {
        if (currentX === 1) {
            return
        }
        const p = currentX - 1
        updateCurrentPage(p)
    }

    const paginatorClassName = number => {
        let className = number === currentX ? 'active' : ''
        return className
    }

    return (
        <>
            <div className="container2">
                <ul className="d-flex paginate">
                    <Pagination className="d-flex justify-content-center mt-3">
                        {paginators().map(el => el)}
                    </Pagination>
                </ul>
            </div>
        </>
    )
}
