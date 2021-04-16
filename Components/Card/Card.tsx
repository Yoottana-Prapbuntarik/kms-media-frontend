import { Card } from "react-bootstrap";
import Link from 'next/link'
import './card.scss'
import { useState, useEffect } from "react";

const CardContent = ({ data }) => {
    const [dataItems, setData] = useState([])
    useEffect(() => {
        setData(data)
    }, [data])


    return (
        <div className="card-columns">
            {
                dataItems.map((items, idx) => {
                    return (
                        <Card key={idx}>
                            <Link href={{pathname: "/detail",query: {content: items.id}}}>
                                <a>
                                    <div className="img-wrapper">
                                        <Card.Img variant="top" src={items.cover} />
                                    </div>
                                </a>
                            </Link>
                            <div className="wrapper-like" onClick={() => console.log("like score")} >
                                <div className="like">
                                    <div className="like-inside">
                                        <div className="pb-3">
                                            <img className="w-100" src="/assets/images/logo/heart-icon.png" alt="heart-icon" />
                                        </div>
                                        <div className="text-like  w-100 text-center">
                                            {1}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Card.Body>
                                <p className="text-warning font-weight-bold mt-5">Trending</p>
                                <h5>{items.title}</h5>
                                <div>
                                    <p>
                                        {items.sub_title}
                                    </p>
                                    <div className="d-flex pb-3">
                                        <div className="d-flex w-50 justify-content-start">{items.own_user.first_name + " " + items.own_user.last_name}</div>
                                        <div className="d-flex w-50 justify-content-end">{items.pub_date.slice(0, 10)}</div>
                                    </div>
                                    <div className="d-flex w-75 jusfity-content-start pt-3 pb-3">
                                        <div className="d-flex w-25">

                                            <Link href="#">
                                                <a>
                                                    <img src="assets/images/logo/facebook.png" alt="facebook" className="w-100" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="d-flex w-25">

                                            <Link href="#">
                                                <a>
                                                    <img src="assets/images/logo/google.png" alt="google" className="w-75" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="d-flex w-25">

                                            <Link href="#">
                                                <a>
                                                    <img src="assets/images/logo/linkedin.png" alt="linkedin" className="w-75" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="d-flex w-25">

                                            <Link href="#">
                                                <a>
                                                    <img src="assets/images/logo/ig.png" alt="ig" className="w-100" />
                                                </a>
                                            </Link>
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