import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Router from "next/router";
import SweetAlert from "react-bootstrap-sweetalert";
const MediumEditor = dynamic(() => import('../Editor/Editor'), { ssr: false })

const WriteBlog = ({
    writeBlogPresenter,
    handleSubmitWriteBlog,
    handleSaveDraft,
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
                writeBlogPresenter.isPostStatus === "success" || writeBlogPresenter.isPostStatus === 200 ?
                    < SweetAlert
                        custom
                        success
                        showCloseButton
                        confirmBtnText="Ok"
                        show={writeBlogPresenter.isPostStatus !== null}
                        confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                        cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                        title={writeBlogPresenter.isPostMessage}
                        onConfirm={() => handlePostStatus()}
                    >
                    </SweetAlert>
                    :
                    < SweetAlert
                        custom
                        danger
                        showCloseButton
                        confirmBtnText="Ok"
                        show={writeBlogPresenter.isPostStatus !== null}
                        confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                        cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                        title={writeBlogPresenter.isPostMessage}
                        onConfirm={() => handlePostStatus()}
                    >
                    </SweetAlert>
            }
            <div className="row h-100 align-items-center justify-content-center">
                <MediumEditor onSubmitWriteBlog={handleSubmitWriteBlog}
                    onSubmitSaveDraft={handleSaveDraft}
                    dataReducer={signinComponentPresenter}
                    handleChangeTitle={handleChangeTitle}
                    handleChangeSubTitle={handleChangeSubTitle}
                    handleChangeCover={handleChangeCover}
                    handleChangeCategory={handleChangeCategory}
                    writeBlogPresenter={writeBlogPresenter}
                />
            </div>
        </div >
    )
}

export default WriteBlog