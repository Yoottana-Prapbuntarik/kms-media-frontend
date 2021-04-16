import './banner.scss';
import { Fragment } from "react";
const Banner = ({ title, detail }: any) => {
    return (
        <Fragment>
            <div className="col-12  text-center margin-section-banner">
                <div className="row">
                    <div className="col-12">
                        <h3>
                            {title}
                        </h3>
                    </div>
                    <div className="col-12 pt-2">
                        <p className="d-block">
                            {detail}
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Banner