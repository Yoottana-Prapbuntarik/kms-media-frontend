import Carousel from "../Carousel/Carousel";
import PaginationContainer from "../Pagegination/PaginationContainer";
import { useEffect } from "react";

const Home = ({ homePresenter, getArticle }: any) => {
    useEffect(()=> {
        getArticle()
    },[])    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mb-5">
                    <div className="row">
                        <Carousel images={homePresenter.slideShow} />
                    </div>
                    <div className="row">
                        <div className="col-12 text-center padding-section-between-6">
                            <h3 className="font-weight-bold mt-5 mb-2 ">RECENT ARTICLES</h3>
                            <p className="text-secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                        </div>

                        <div className="col-12 padding-section-between-6">
                            <PaginationContainer data={homePresenter.allArticle} title={''} itemsPerPage={6} />
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-12 padding-section-between-6">
                            <div className="row padding-170px">
                                <div className="col-lg-6 d-flex flex-column align-items-start">
                                    <h3 className="font-weight-bold mt-5 mb-2 ">Technology</h3>
                                    <p className="text-secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>
                                <div className="col-lg-6 d-flex   align-items-center justify-content-end">
                                    <Link href="#">
                                        <a className="text-warning font-weight-bold">More in Tech →</a>
                                    </Link>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 py-3">
                                    <div>
                                        <CardContent data={homePresenter.cardThumbnail} />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 py-3">
                                    <div className="d-flex flex-column">
                                        <div className="row">
                                            <div className="profile col-lg-4 col-12">
                                                <img src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/815/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg" className="w-100 rounded" alt="profile image" />
                                            </div>
                                            <div className="detail pb-2 col-lg-8 col-12">
                                                <span className="text-warning font-weight-bold">Header</span>
                                                <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exceptu
                                                <p className="pt-3 text-secondary">
                                                    November 8 , 2019
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="profile col-lg-4 col-12">
                                                <img src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/815/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg" className="w-100 rounded" alt="profile image" />
                                            </div>
                                            <div className="detail pb-2 col-lg-8 col-12">
                                                <span className="text-warning font-weight-bold">Header</span>
                                                <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exceptu
                                                    <p className="pt-3 text-secondary">
                                                    November 8 , 2019
                                                    </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="profile col-lg-4 col-12">
                                                <img src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/815/cached.offlinehbpl.hbpl.co.uk/news/ORP/ginpic-20180223123437455.jpg" className="w-100 rounded" alt="profile image" />
                                            </div>
                                            <div className="detail pb-2 col-lg-8 col-12">
                                                <span className="text-warning font-weight-bold">Header</span>
                                                <br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exceptu
                                                <p className="pt-3 text-secondary">
                                                    November 8 , 2019
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Home