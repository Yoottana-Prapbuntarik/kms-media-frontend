import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Router from "next/router";
import SweetAlert from "react-bootstrap-sweetalert";
const EditUpdate = dynamic(() => import('../Editor/EditUpdate'), { ssr: false })

const EditBlog = ({
    editBlogPresenter,
    handleSubmitWriteBlog,
    signinComponentPresenter,
    handleChangeTitle,
    handleChangeSubTitle,
    handleChangeCover,
    handleChangeCategory,
    getCategory,
    handlePostStatus,
    loadContentDraft
}: any) => {
    useEffect(() => {
        let isLoggedIn = localStorage.getItem("access-token")
        if (isLoggedIn === null) {
            Router.push("/signin")
        }
        getCategory()
        loadContentDraft()
    }, [])

    return (
        <div className="container-fluid">
            {
                editBlogPresenter.isPostStatusEdit === "success" || editBlogPresenter.isPostStatusEdit === 200 ?
                    < SweetAlert
                        custom
                        success
                        showCloseButton
                        confirmBtnText="Ok"
                        show={editBlogPresenter.isPostStatusEdit !== null}
                        confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                        cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                        title={editBlogPresenter.isPostMessageEdit}
                        onConfirm={() => handlePostStatus()}
                    >
                    </SweetAlert>
                    :
                    < SweetAlert
                        custom
                        danger
                        showCloseButton
                        confirmBtnText="Ok"
                        show={editBlogPresenter.isPostStatusEdit !== null}
                        confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                        cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                        title={editBlogPresenter.isPostMessageEdit}
                        onConfirm={() => handlePostStatus()}
                    >
                    </SweetAlert>
            }
            <div className="row h-100 align-items-center justify-content-center">

                <EditUpdate onSubmitWriteBlog={handleSubmitWriteBlog}
                    dataReducer={signinComponentPresenter}
                    handleChangeTitle={handleChangeTitle}
                    handleChangeSubTitle={handleChangeSubTitle}
                    handleChangeCover={handleChangeCover}
                    handleChangeCategory={handleChangeCategory}
                    editwriteBlogPresenter={editBlogPresenter}
                />
            </div>
        </div >
    )
}

export default EditBlog