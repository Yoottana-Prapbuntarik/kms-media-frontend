import "./detailCompoent.scss";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Field } from "redux-form";
import TextAreaField from "../FieldComponents/TextAreaField";
import SweetAlert from "react-bootstrap-sweetalert";
import Head from "next/head";
const BlogDetail = dynamic(() => import("../Editor/blogDetail"), {
  ssr: false,
});

const DetailCompoent = ({
  detailCompoentPresenter,
  asknowledge,
  getCommentAll,
  signinComponentPresenter,
  getArticleDetail,
  handleSubmitComment,
  handleSubmit,
  likeArticle,
  deleteCommentByIdOwnUser,
  asknowledgeSubmit,
  handleSubmitUpdateComment
}) => {
  const [detailBlog, setDetailBlog] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [editId, setEditId] = useState(false);

  useEffect(() => {
    getArticleDetail();
    getCommentAll();
  }, []);

  useEffect(() => {
    let rawData = detailCompoentPresenter.detailMarkdown;
    setDetailBlog(rawData);
  }, [detailCompoentPresenter]);

  const handleSubmitFormComment = async event => {
    handleSubmitComment(
      detailCompoentPresenter.author.email,
      signinComponentPresenter.userProfile.id,
      event.comment
    );
  };

  const submitEditableComment = () => {
    if(editableText.length === 0) {
      asknowledgeSubmit(401, "Please be aware of all information.")
      setEditable(true);
    }else{
      handleSubmitUpdateComment(
        editId,
        signinComponentPresenter.userProfile.id,
        editableText
      )
      setEditable(false);
    }
  };

  const setEditableCurrentText = (currentText: string, id) => {
    setEditable(true);
    setEditableText(currentText);
    setEditId(id);
  };

  const likeFunc = (blogId, user) => {
    return new Promise((resolve, reject) => {
      resolve(likeArticle(blogId, user));
    }).then(res => {
      setTimeout(() => {
        getArticleDetail();
      }, 100);
    });
  };

  return (
    <div className="container bg-white">
      <Head>
        <meta
          property="og:title"
          content={detailCompoentPresenter.titleDetail}
        />
        <meta
          property="og:description"
          content={detailCompoentPresenter.sub_title}
        />
        <meta
          property="og:image"
          content={detailCompoentPresenter.detailCover}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noodp" />
        <meta itemProp="image" content={detailCompoentPresenter.detailCover} />
      </Head>
      {detailCompoentPresenter.isCommentStatus === 200 ? (
        <SweetAlert
          custom
          success
          showCloseButton
          confirmBtnText="Ok"
          show={detailCompoentPresenter.isCommentStatus !== null}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={"Complated"}
          onConfirm={() => asknowledge()}
        >
          {detailCompoentPresenter.isCommentMessage}
        </SweetAlert>
      ) : (
        <SweetAlert
          custom
          danger
          showCloseButton
          confirmBtnText="Ok"
          show={detailCompoentPresenter.isCommentStatus !== null}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={`In Complated`}
          onConfirm={() => asknowledge()}
        >
          {detailCompoentPresenter.isCommentMessage}
        </SweetAlert>
      )}
      <div className="row detail-comment">
        <div className="col-12 mt-5 text-center">
          <div className="cover-detail">
            <img src={detailCompoentPresenter.detailCover} alt="Cover detail" />
          </div>
          <div className="wrapper-like">
            <div
              className="like"
              onClick={() =>
                likeFunc(
                  detailCompoentPresenter.blogId,
                  signinComponentPresenter.userProfile.id
                )
              }
            >
              <div className="like-inside">
                <div className="pb-3">
                  <img
                    className="w-100"
                    src="/assets/images/logo/heart-icon.png"
                    alt="heart-icon"
                  />
                </div>
                <div className="text-like  w-100 text-center">
                  {detailCompoentPresenter.likeAmount}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5 text-center">
            <h1>{detailCompoentPresenter.titleDetail}</h1>
          </div>
          <div className="cotnainer mb-5">
            <div className="row">
              <div className="col-12 py-5">
                <div className="d-flex h-100  align-items-center  flex-wrap">
                  <div className="border  wrapper-image-owner border border-light rounded-circle">
                    <img
                      className=" rounded profile-user-owner"
                      src={detailCompoentPresenter.author.userProfile}
                      alt=""
                    />
                  </div>
                  <div className="px-3 text-secondary">
                    {detailCompoentPresenter.author.userName}
                  </div>
                  -<div className="px-3 text-warning">Trending</div>-
                  <div className="px-3 text-secondary">
                    {detailCompoentPresenter.category}
                  </div>
                  <div className="col-12 mb-5">
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
              {detailCompoentPresenter.commentList.map(
                (item, index: number) => {
                  return (
                    <div
                      key={index}
                      className="col-12  px-2 my-3 py-3 bg-light"
                    >
                      <div className="row">
                        <div className="col-lg-2 border-right  col-12 py-3 min-h-100 d-flex justify-content-center align-items-start text-left p-0">
                          <div className="wraper-profile-image">
                            <div className="user-profile-images">
                              <div className="d-block w-100">
                                <img
                                  className="w-100"
                                  src={
                                    item.user_comment.image === "" ||
                                    item.user_comment.image === null
                                      ? "/assets/images/default.png"
                                      : item.user_comment.image
                                  }
                                  alt={item.user_comment.first_name}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="  col-lg-10 flex-column col-12 d-flex justify-content-between w-100  py-2 align-items-between p-0">
                          <div className="row mx-auto text-center  w-100 px-3">
                            <div
                              className="col-lg-8 col-12 
                                                        justify-content-start
                                                        w-100"
                            >
                              <div className="d-flex text-left my-2 justify-center-responsive">
                                <h4 className="pt-0">
                                  {item.user_comment.first_name}{" "}
                                  {item.user_comment.last_name}
                                </h4>
                              </div>
                            </div>
                            <div className="col-lg-4 col-12 justify-content-center w-100 d-flex">
                              <div className="d-flex  flex-column text-right my-2 align-items-center">
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30px"
                                      height="30px"
                                      fill="currentColor"
                                      className="bi bi-clock-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    </svg>
                                  </div>
                                  <div className="ml-3">
                                    <p className="pt-3">
                                      {item.published.slice(0, 10)}{" "}
                                      {item.published.slice(11, 19)}
                                    </p>
                                  </div>
                                </div>
                                <div className="ml-3">
                                  {signinComponentPresenter.userProfile.id ===
                                    item.user_comment.id && (
                                    <div className="d-flex justify-content-end">
                                      <div className="d-block">
                                        <a
                                          className="icon-manage-blog"
                                          onClick={() => {
                                            setEditableCurrentText(
                                              item.content,
                                              item.id
                                            );
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                              fillRule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                          </svg>
                                        </a>
                                      </div>
                                      <div className="pl-4 d-block">
                                        <a
                                          className="icon-manage-blog"
                                          onClick={() =>
                                            deleteCommentByIdOwnUser(item.id)
                                          }
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                              fillRule="evenodd"
                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-8 text-left text-break">
                              {editable === true &&
                              signinComponentPresenter.userProfile.id ===
                                item.user_comment.id &&
                              item.id === editId ? (
                                <div className="container">
                                  <div className="row">
                                    <div className="col-12">
                                      <textarea
                                        className="form-control"
                                        rows={5}
                                        onChange={e =>
                                          setEditableText(e.target.value)
                                        }
                                        value={editableText}
                                      />
                                      <div className="d-flex flex-row justify-content-end">
                                        <button className="btn mt-3" onClick={()=> submitEditableComment()}>
                                          อัพเดท
                                        </button>
                                        <button className="btn mt-3" onClick={()=> setEditable(false)}>ยกเลิก</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                item.content
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCompoent;
