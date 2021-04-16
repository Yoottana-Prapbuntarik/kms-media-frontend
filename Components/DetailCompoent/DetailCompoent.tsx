import "./detailCompoent.scss";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
const PreviewProductDetail = dynamic(() => import('../Editor/previewProductDetail'), { ssr: false })

const DetailCompoent = ({ detailCompoentPresenter, getArticleDetail }) => {
    const [detailBlog, setDetailBlog] = useState(null)
    useEffect(() => {
        getArticleDetail()
    }, [])

    useEffect(() => {
        let rawData = detailCompoentPresenter.detailMarkdown;
        setDetailBlog(rawData)
    }, [detailCompoentPresenter]);

    return (
        <div className="container ">
            <div className="row">
                <div className="col-12 mt-3 text-center">
                    <h3>{detailCompoentPresenter.titleDetail}</h3>
                </div>
                <div className="col-12 mt-5 text-center">
                    <div className="cover-detail">
                        <img src={detailCompoentPresenter.detailCover} alt="Cover detail" />
                    </div>
                    <div className="wrapper-like">
                        <div className="like">
                            <div className="like-inside">
                                <div className="pb-3">
                                    <img className="w-100" src="/assets/images/logo/heart-icon.png" alt="heart-icon" />
                                </div>
                                <div className="text-like  w-100 text-center">13</div>
                            </div>
                        </div>
                    </div>
                    <div className="cotnainer mb-5">
                        <div className="row">
                            <div className="col-12 py-5">
                                <div className="d-flex h-100  align-items-center  flex-wrap">
                                    <div className="border p-3 rounded">
                                        {detailCompoentPresenter.author.userProfile.toUpperCase()}
                                    </div>
                                    <div className="px-3 text-secondary">
                                        {detailCompoentPresenter.author.userName}
                                    </div>
                                        -
                                    <div className="px-3 text-secondary">
                                        Treanding
                                    </div>
                                        -
                                    <div className="px-3 text-secondary">
                                        {detailCompoentPresenter.category}
                                    </div>
                                    <div className="col-12 mb-5 mt-5">
                                        <PreviewProductDetail detailBlog={detailBlog} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailCompoent