import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Router from "next/router";
import SweetAlert from "react-bootstrap-sweetalert";

const MediumEditor = dynamic(() => import("../Editor/Editor"), { ssr: false });

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
    loadContentDraft,
}: any) => {
    const [isEcception, setIsEcception] = useState(false);
    useEffect(() => {
        let isLoggedIn = localStorage.getItem("access-token");
        if (isLoggedIn === null) {
            setIsEcception(true)
        }
        getCategory();
        loadContentDraft();
    }, []);

    const closePopup = () => {
        setIsEcception(false)
        Router.push("/signin");
    };

    return (
        <div className="container-fluid">
            <SweetAlert
                custom
                danger
                showCloseButton
                confirmBtnText="Ok"
                show={isEcception}
                confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                title={"In complete"}
                onConfirm={() => closePopup()}
            >
                You are not logged in.
      </SweetAlert>
            {writeBlogPresenter.isPostStatus === "success" ||
                writeBlogPresenter.isPostStatus === 200 ? (
                <SweetAlert
                    custom
                    success
                    showCloseButton
                    confirmBtnText="Ok"
                    show={writeBlogPresenter.isPostStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={writeBlogPresenter.isPostMessage}
                    onConfirm={() => handlePostStatus()}
                ></SweetAlert>
            ) : (
                <SweetAlert
                    custom
                    danger
                    showCloseButton
                    confirmBtnText="Ok"
                    show={writeBlogPresenter.isPostStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={writeBlogPresenter.isPostMessage}
                    onConfirm={() => handlePostStatus()}
                ></SweetAlert>
            )}
            <div className="row h-100 align-items-center justify-content-center">
                <MediumEditor
                    onSubmitWriteBlog={handleSubmitWriteBlog}
                    onSubmitSaveDraft={handleSaveDraft}
                    dataReducer={signinComponentPresenter}
                    handleChangeTitle={handleChangeTitle}
                    handleChangeSubTitle={handleChangeSubTitle}
                    handleChangeCover={handleChangeCover}
                    handleChangeCategory={handleChangeCategory}
                    writeBlogPresenter={writeBlogPresenter}
                />
            </div>
        </div>
    );
};

export default WriteBlog;
