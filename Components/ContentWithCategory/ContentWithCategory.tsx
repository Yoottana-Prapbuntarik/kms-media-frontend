import PaginationContainer from "../Pagegination/PaginationContainer";
const ContentWithCategory = ({ content }: any) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 padding-section-between-6">
                    {
                        content !== undefined ? 
                        <PaginationContainer data={content} title={''} itemsPerPage={10} />
                        :
                        // <h1 className="text-center">{'Loading...'}</h1>
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


export default ContentWithCategory