import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./carousel.scss";
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
                                    src={items.img}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>{items.title}</h3>
                                <p>{items.detail}</p>
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