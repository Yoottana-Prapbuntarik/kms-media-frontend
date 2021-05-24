import Link from "next/link";
import "./categoryComponent.scss";
const CategoryComponent = ({
    categoryComponentPresenter,
    categoryItem
}: any) => {
    return (
        <div className="wrapper-content-category mb-5">
            {
                categoryItem.map((item, index: number) => {
                    return (
                        <div className="items-in-category" key={index}>
                            <Link href={
                                {
                                    pathname: "/category-content",
                                    query: {
                                        id: item.id
                                    }
                                }
                            }>
                                <a>
                                    <div className="wrapper-image text-center">
                                        <img src={item.cate_image} className="w-100" alt="" />
                                    </div>
                                </a>
                            </Link>
                            <div className="wrapper-button-plus mb-3">
                                <button className="btn-plus">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="0.75rem"  
                                    fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                    </svg>
                                </button>
                            </div>
                            <h4 className="category-name text-left mt-3">
                                {item.name}
                            </h4>
                            {/* <h1 className="text-center">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto atque quas eligendi saepe veritatis. Praesentium tempora esse iusto iure quas voluptates quisquam, officia veritatis, fugiat assumenda quo suscipit deserunt. Doloribus.
                            </h1>
                            <div className="d-flex">
                                <div className="text-secondary">
                                    John Doh    November , 8 , 2019
                                </div>
                            </div> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryComponent