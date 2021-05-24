import "./news.scss"
import Link from "next/link";
const News = ({ content }: any) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <h1>
                        ข่าวสาร
                    </h1>
                </div>
                <div className="col-12 padding-section-between-6">
                    {
                        content !== undefined ?
                            <div className="row">
                                {content.map((item, index: number) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 col-12 mb-5" key={index}>
                                            <div className="card h-100">
                                                <Link href={{
                                                    pathname: "/news-detail",
                                                    query: {
                                                        id: item.id
                                                    }
                                                }}>
                                                    <a>
                                                        <div className="catd-wrapper">
                                                            <img className="card-img-top" src={item.cover_url} alt="Card image cap" />
                                                        </div>
                                                    </a>
                                                </Link>
                                                <div className="card-body">
                                                    <h3 className="card-title">{item.title}</h3>
                                                    <h5 className="card-text">{item.sub_title}</h5>
                                                </div>
                                                <div className="card-footer bg-white remove-border">
                                                    <div className="d-flex justify-content-end">
                                                        <p className="card-text"><small className="text-muted">Published at {item.create_at}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
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


export default News