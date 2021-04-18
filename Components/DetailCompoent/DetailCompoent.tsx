import "./detailCompoent.scss";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import { Field } from "redux-form";
import TextAreaField from "../FieldComponents/TextAreaField"
const PreviewProductDetail = dynamic(() => import('../Editor/previewProductDetail'), { ssr: false })

const DetailCompoent = ({ detailCompoentPresenter, getCommentAll, signinComponentPresenter, getArticleDetail, handleSubmitComment, handleSubmit }) => {
    const [detailBlog, setDetailBlog] = useState(null)
    useEffect(() => {
        getArticleDetail()
        getCommentAll()
    }, [])

    useEffect(() => {
        let rawData = detailCompoentPresenter.detailMarkdown;
        setDetailBlog(rawData)
    }, [detailCompoentPresenter]);


    const handleSubmitFormComment =  async (event) => {
         handleSubmitComment(detailCompoentPresenter.author.email, signinComponentPresenter.userProfile.id, event.comment)
    }


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
                            <div className="col-12">
                                <form onSubmit={handleSubmit(handleSubmitFormComment)}>
                                    <Field

                                        name={detailCompoentPresenter.commentField.name}
                                        type="text"
                                        styleTextError="text-danger"
                                        component={TextAreaField}
                                        className="p-3 form-control"
                                        label={"กรอกเพื่อแสดงความคิดเห็น"}
                                        rows={8}
                                    />

                                    <div className="col-12 mb-5">
                                        <button
                                            name="submitComment"
                                            type="submit"
                                            className="w-75 text-white mt-2 btn-signin bg-green-dark"
                                        >
                                            แสดงความคิดเห็น
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {
                                detailCompoentPresenter.commentList.map((item, index: number) => {
                                    return (

                                        <div key={index} className="col-12  px-2 mt-3 bg-light">
                                            <div className="row">

                                                <div className="col-3 pl-5 py-5 h-100 text-left border-dark border-right">
                                                    {item.user_comment.first_name} {item.user_comment.last_name}

                                                </div>
                                                <div className="col-9 py-5">
                                                    {item.content}
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailCompoent