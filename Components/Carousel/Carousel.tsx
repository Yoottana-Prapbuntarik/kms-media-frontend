import Link from "next/link";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Carousel.scss";
import {
    Variable
} from './ManageCarousel/CarouselVariable'
const CarouselSlide = ({ images }: any): any => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="continaer-carousel  m-0">
            <Carousel activeIndex={index} onSelect={handleSelect}
                interval={Variable.timeInterval}
            >
                {
                    images.map((items, index: number) => {
                        return (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={items.cover_url}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                <h1 className="text-center">{items.title}</h1>
                                <p>{items.sub_title}</p>
                                <Link href={{
                                    pathname: "news-detail",
                                    query:{
                                        id: items.id
                                    }
                                }}>
                                    <a className="border p-3 rounded text-white">
                                        อ่านเพิ่มเติม
                                    </a>
                                </Link>
                                </Carousel.Caption>
                                <div className="bg-alpha"></div>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}

export default CarouselSlide
