import "./new-detail.scss"
const NewsDetail = ({ content }: any) => {
    return (
        <div className="container-fluid new-detail">
            <div className="row">
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <div className="col-12">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <h1>
                                {content[0].title}
                            </h1>
                            <p className="p-0">
                                {content[0].sub_title}
                            </p>
                        </div>
                        <div className="w-100  text-center d-block mt-5">
                            <img
                                className="img-cover-new"
                                src={content[0].cover_url}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    {
                        content !== undefined ?
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-10 col-12 my-5">
                                    <p className="text-news-detail">
                                        {content[0].detail}
                                    </p>
                                    {
                                        content[0].hyper_link !== null &&
                                        <a   href={content[0].hyper_link}
                                            target="_blank"
                                            className="pt-5 d-block w-100"
                                        >
                                            {content[0].hyper_link}
                                        </a>
                                    }
                                </div>
                                <div className="col-lg-10 col-12 my-5">
                                    <h5>รูปภาพเพิ่มเติม</h5>
                                    <div className="row">
                                        {content[0].images_article_url_1 !== null &&
                                            <div className="d-block col-lg-6 mt-5 col-md-6 col-12">
                                                <img className="w-100" src={content[0].images_article_url_1} alt={content[0].title} />
                                            </div>
                                        }
                                        {content[0].images_article_url_2 !== null &&
                                            <div className="d-block col-lg-6 mt-5 col-md-6 col-12">
                                                <img className="w-100" src={content[0].images_article_url_2} alt={content[0].title} />
                                            </div>
                                        }
                                        {content[0].images_article_url_3 !== null &&
                                            <div className="d-block col-lg-6 mt-5 col-md-6 col-12">
                                                <img className="w-100" src={content[0].images_article_url_3} alt={content[0].title} />
                                            </div>
                                        }
                                        {content[0].images_article_url_4 !== null &&
                                            <div className="d-block col-lg-6 mt-5 col-md-6 col-12">
                                                <img className="w-100" src={content[0].images_article_url_4} alt={content[0].title} />
                                            </div>
                                        }
                                        {content[0].images_article_url_5 !== null &&
                                            <div className="d-block col-lg-6 mt-5 col-md-6 col-12">
                                                <img className="w-100" src={content[0].images_article_url_5} alt={content[0].title} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="d-flex  align-items-center min-vh-100 justify-content-center">
                                <div className="spinner-grow mx-2 text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow mx-2 text-dark" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default NewsDetail