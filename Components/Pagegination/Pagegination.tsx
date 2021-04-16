import { useEffect, useState } from "react";
import Card from "../Card/Card";
import PageinationButton from "./PageinationButton";
const Pagegination = ({ ownProps }: any) => {

    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(ownProps.itemsPerPage)

    const indexOfLastItems = currentPage * perPage
    const indexOfFirstItems = indexOfLastItems - perPage
    const currentItems = items.slice(indexOfFirstItems, indexOfLastItems)

    useEffect(() => {
        setItems(ownProps.data)
    }, [ownProps])
    
    const pageinate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div className="container-pagination padding-170px">
            <h3 className="mb-5">
                {ownProps.title}
            </h3>
            <div className="row">
                <Card data={currentItems} />
            </div>
            <PageinationButton
                currentIndex={currentPage}
                itemsPerPage={ownProps.itemsPerPage}
                totalItems={items.length}
                pageinate={pageinate}
            />
        </div>
    )
}

export default Pagegination