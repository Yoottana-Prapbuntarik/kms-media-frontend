import Carousel from "../Carousel/Carousel";
import PaginationContainer from "../Pagegination/PaginationContainer";
import { useEffect } from "react";

const Home = ({ homePresenter, getArticle, slideShow }: any) => {
    useEffect(() => {
        getArticle()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mb-5">
                    <div className="row">
                        <Carousel images={slideShow} />
                    </div>
                    <div className="row">
                        <div className="col-12 text-center padding-section-between-6">
                            <h3 className="font-weight-bold mt-5 mb-2 ">RECENT ARTICLES</h3>
                            <p className="text-secondary">
                                บทความล่าสุด
                            </p>
                        </div>

                        <div className="col-12 padding-section-between-6">
                            {
                                homePresenter.allArticle.length == 0 &&
                                <h5 className="text-center mx-auto">
                                    ยังไม่มีบทความใดๆ ในระบบ
                                </h5>
                            }
                            <PaginationContainer data={homePresenter.allArticle} title={''} itemsPerPage={6} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home