import "./detailCompoent.scss";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import { Field } from "redux-form";
import TextAreaField from "../FieldComponents/TextAreaField"
import SweetAlert from "react-bootstrap-sweetalert";
import Head from "next/head";
const BlogDetail = dynamic(() => import('../Editor/blogDetail'), { ssr: false })

const DetailCompoent = ({ detailCompoentPresenter, asknowledge, getCommentAll, signinComponentPresenter, getArticleDetail, handleSubmitComment, handleSubmit }) => {
    const [detailBlog, setDetailBlog] = useState(null)
    useEffect(() => {
        getArticleDetail()
        getCommentAll()
    }, [])

    useEffect(() => {
        let rawData = detailCompoentPresenter.detailMarkdown;
        setDetailBlog(rawData)
    }, [detailCompoentPresenter]);


    const handleSubmitFormComment = async (event) => {
        handleSubmitComment(detailCompoentPresenter.author.email, signinComponentPresenter.userProfile.id, event.comment)
    }


    return (
        <div className="container ">
            <Head>
                {/* <meta property="og:url" content="{{ request.build_absolute_uri }}" /> */}
                <meta property="og:title" content={detailCompoentPresenter.titleDetail} />
                <meta property="og:description" content={detailCompoentPresenter.sub_title} />
                {/* <meta property="og:site_name" content="{% lz 'SEO_SITE_NAME' %}"/> */}
                <meta property="og:image" content={detailCompoentPresenter.detailCover} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="noodp" />
                <meta itemProp="image" content={detailCompoentPresenter.detailCover} />

            </Head>
            { detailCompoentPresenter.isCommentStatus === 200 ?
                < SweetAlert
                    custom
                    success
                    showCloseButton
                    confirmBtnText="Ok"
                    show={detailCompoentPresenter.isCommentStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={detailCompoentPresenter.isCommentMessage}
                    onConfirm={() => asknowledge()}
                >
                </SweetAlert>
                :
                < SweetAlert
                    custom
                    danger
                    showCloseButton
                    confirmBtnText="Ok"
                    show={detailCompoentPresenter.isCommentStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={detailCompoentPresenter.isCommentMessage}
                    onConfirm={() => asknowledge()}
                >
                </SweetAlert>
            }
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
                                    <div className="border  wrapper-image-owner">
                                        <img className=" rounded profile-user-owner" src={detailCompoentPresenter.author.userProfile} alt="" />
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
                                        <BlogDetail detailBlog={detailBlog} />
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

                                        <div key={index} className="col-12  px-2 my-5 bg-light">
                                            <div className="row">
                                                <div className="col-lg-3 col-12 py-3 min-h-100 d-flex justify-content-center align-items-center text-left p-0">
                                                    <div className="wraper-profile-image">
                                                        <div className="user-profile-images">
                                                            <div className="d-block w-100">
                                                                <img className="w-100" src={item.user_comment.image === "" || item.user_comment.image === null ? "/assets/images/default.png" :
                                                                    item.user_comment.image} alt={item.user_comment.first_name} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" border-comment col-lg-9 flex-column col-12 d-flex justify-content-between w-100  py-5 align-items-between p-0">
                                                    <div className="row mx-auto text-center  w-100 px-3">
                                                        <div className="mb-5 col-lg-8 col-12 
                                                        d-flex justify-content-xl-start 
                                                        justify-content-md-center 
                                                        justify-content-sm-center 
                                                        justify-content-center 
                                                        w-100"
                                                        >
                                                            <div className="  d-flex text-left my-2">
                                                                {item.user_comment.first_name} {item.user_comment.last_name}
                                                            </div>
                                                        </div>
                                                        <div className="mb-5 col-lg-4 col-12 justify-content-center w-100 d-flex">
                                                            <div className="d-flex  flex-row text-right my-2">
                                                                <div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p>{item.published.slice(0, 10)} {item.published.slice(11, 19)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5">
                                                        {item.content}
                                                    </div>
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