import { connect } from "react-redux"
import WriteBlog from "./WriteBlog";
import { WriteBlogPresenter, WriteBlogAction } from "./WriteBlogInterface";
import { getBlogCategory, BlogCategoryAPI } from "../../apis/getCategory";
import { PostArticleAPI, postArticle } from "../../apis/postArticleAPIClient";
import { Dispatch } from "redux";
import Router from "next/router";
export const writeBlogPresenter: WriteBlogPresenter = {
    keyTitleContent: "",
    keyDraft: "",
    keyPublish: "",
    textWritingBlog: "",
    title: "",
    subTitle: "",
    imagesCover: "",
    category: "",
    categoryList: [],
    contentDraft: "",
    isPostStatus: null,
    isPostMessage: ''
}


export const writeBlogReducer = (
    state: WriteBlogPresenter = writeBlogPresenter,
    action: any
) => {
    switch (action.type) {
        case PostArticleAPI.PostArticleSuccess:
            localStorage.removeItem("draft")
            localStorage.removeItem("draft-detail")
            Router.push("/")
            return state

        case WriteBlogAction.handlePostStatus:
            return {
                ...state,
                isPostStatus: action.payload,
                isPostMessage: action.message
            }

        case WriteBlogAction.loadContentDraft:
            let draftDetail = action.draftDetail;
            if (draftDetail !== null && draftDetail !== undefined) {
                draftDetail = JSON.parse(draftDetail)
                return {
                    ...state,
                    contentDraft: JSON.parse(action.payload),
                    title: draftDetail && draftDetail.title,
                    subTitle: draftDetail && draftDetail.subTitle,
                    imagesCover: draftDetail && draftDetail.imagesCover,
                    category: draftDetail && draftDetail.category
                }
            } else {

                return {
                    ...state,
                    contentDraft: JSON.parse(action.payload),
                }
            }

        case BlogCategoryAPI.GetCategorySuccess:
            return {
                ...state,
                categoryList: action.dataAPI
            }
        case BlogCategoryAPI.GetCategoryFailed:

            return {
                ...state,
                categoryList: []
            }

        case WriteBlogAction.handleSubmitWriteBlog:
            return {
                textWritingBlog: action.payload
            }

        case WriteBlogAction.handleChangeTitle:
            return {
                ...state,
                title: action.payload
            }
        case WriteBlogAction.handleChangeSubTitle:
            return {
                ...state,
                subTitle: action.payload
            }
        case WriteBlogAction.handleChangeCover:
            return {
                ...state,
                imagesCover: action.payload
            }
        case WriteBlogAction.handleChangeCategory:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state
    }
}

const mapStateToProps = (state: any) => {
    return {
        writeBlogPresenter: state.writeBlogReducer,
        signinComponentPresenter: state.signinComponentReducer
    }
}

const mapDisPatchToProps = (dispatch: Dispatch) => ({
    getCategory: () => {
        dispatch(getBlogCategory())
    },

    handleChangeTitle: (event: any) => {
        dispatch({
            type: WriteBlogAction.handleChangeTitle,
            payload: event
        })
    },

    handleChangeSubTitle: (event: any) => {
        dispatch({
            type: WriteBlogAction.handleChangeSubTitle,
            payload: event
        })
    },

    handleChangeCover: (event: any) => {
        dispatch({
            type: WriteBlogAction.handleChangeCover,
            payload: event.data.link
        })
    },

    handleChangeCategory: (event: any) => {
        dispatch({
            type: WriteBlogAction.handleChangeCategory,
            payload: event
        })
    },

    handleSubmitWriteBlog: (content: any, userId: number | string, category: number | string, title: string, subTitle: string, cover: string) => {
        if (userId !== undefined && category !== "" && category != 0 && title.length > 0 && subTitle.length > 0 && cover.length > 0) {
            dispatch(postArticle(content, userId, category, title, subTitle, cover))
        } else {
            dispatch({
                type: WriteBlogAction.handlePostStatus,
                payload: "failed",
                message: "Post article failed"
            })
        }
    },

    handleSaveDraft: (evnet: any, userId: any, imagesCover: string, title: string, subTitle: string, category: number | string) => {

        if (userId !== undefined && category !== "" && category != 0 && title.length > 0 && subTitle.length > 0 && imagesCover.length > 0) {
            let draftTest = {
                imagesCover: imagesCover === "" || imagesCover === undefined ? "" : imagesCover,

                title: title === "" || title === undefined ? "" : title,

                subTitle: subTitle === "" || subTitle === undefined ? "" : subTitle,

                category: category === "" || category === undefined ? "" : category
            }


            localStorage.setItem("draft", JSON.stringify(evnet));
            localStorage.setItem("draft-detail", JSON.stringify(draftTest));
            dispatch({
                type: WriteBlogAction.loadContentDraft,
                payload: localStorage.getItem("draft")
            })
            dispatch({
                type: WriteBlogAction.handlePostStatus,
                payload: "success",
                message: "Save draft successfully"
            })

        } else {
            dispatch({
                type: WriteBlogAction.handlePostStatus,
                payload: "failed",
                message: "Save draft failed"
            })
        }
    },

    loadContentDraft: () => {
        dispatch({
            type: WriteBlogAction.loadContentDraft,
            payload: localStorage.getItem("draft"),
            draftDetail: localStorage.getItem("draft-detail")
        })
    },
    handlePostStatus: () => {
        dispatch({
            type: WriteBlogAction.handlePostStatus,
            payload: null,
            message: ""
        })
    },
})

export default connect(mapStateToProps, mapDisPatchToProps)(WriteBlog)