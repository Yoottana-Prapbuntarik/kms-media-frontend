import { Card } from "react-bootstrap";
import Link from 'next/link'
import './cardContent.scss'
import { useState, useEffect } from "react";
const CardContent = ({ data }) => {
    const [dataItems, setData] = useState([])
    useEffect(() => {
        setData(data)
    }, [data])

    const setLike = (chooseItems, index) => {
        chooseItems.like = parseInt(chooseItems.like) + 1;
        const data = dataItems.filter(item => item !== chooseItems)
        data.splice(index, 0, chooseItems)
        setData(data)
    }
    return (
        <div className="card-columns-custome">
            {
                dataItems.map((items, idx) => {
                    return (
                        <Card key={idx}>
                            <Link href="/detail">
                                <a>
                                    <div className="img-wrapper">
                                        <Card.Img variant="top" src={items.img} />
                                    </div>
                                </a>
                            </Link>
                            <div className="wrapper-like" onClick={() => setLike(items, idx)} >
                                <div className="like">
                                    <div className="like-inside">
                                        <div className="pb-3">
                                            <img className="w-100" src="/assets/images/logo/heart-icon.png" alt="heart-icon" />
                                        </div>
                                        <div className="text-like  w-100 text-center">
                                            {dataItems[idx].like}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Card.Body>
                                <p className="text-warning font-weight-bold mt-5">Trending</p>
                                <h5>{items.title}</h5>
                                <div>
                                    <p>
                                        {items.detail}
                                    </p>
                                    <div className="d-flex pb-3">
                                        <div className="d-flex w-50 justify-content-start">{items.user}</div>
                                        <div className="d-flex w-50 justify-content-end">{items.date}</div>
                                    </div>
                                    <div className="d-flex w-100  pt-3 pb-3">
                                        <div className="d-flex flex-row w-100">
                                            <div className="d-flex w-50 justify-content-between">
                                                <div>
                                                    <Link href="#">
                                                        <a>
                                                            <img src="assets/images/logo/facebook.png" alt="facebook" className="w-100" />
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href="#">
                                                        <a>
                                                            <img src="assets/images/logo/google.png" alt="google" className="w-100" />
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href="#">
                                                        <a>
                                                            <img src="assets/images/logo/linkedin.png" alt="linkedin" className="w-100" />
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link href="#">
                                                        <a>
                                                            <img src="assets/images/logo/ig.png" alt="ig" className="w-100" />
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end w-100">
                                                <span>
                                                    0
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default CardContent;