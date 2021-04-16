import './category-box.scss';
import { Fragment } from "react";
const CategoryBox = ({ name }: any) => {
    return (
        <Fragment>
            <div className="col-lg-4 .col-12 pt-3 pb-3">
                <div className="d-flex w-100 justify-content-center">
                    <div className="d-flex category-box align-items-center justify-content-center">
                        <span>
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CategoryBox