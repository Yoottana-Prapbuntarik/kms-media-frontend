import { connect } from "react-redux"
import EditBlog from "./EditBlog";
import { EditBlogPresenter, EditBlogAction } from "./EditBlogInterface";
import { getBlogCategory, BlogCategoryAPI } from "../../apis/getCategory";
import { PostArticleAPI, updateArticle } from "../../apis/postArticleAPIClient";
import { Dispatch } from "redux";
import Router from "next/router";
export const editBlogPresenter: EditBlogPresenter = {
    keyTitleContentEdit: "",
    keyDraftEdit: "",
    keyPublishEdit: "",
    textWritingBlogEdit: "",
    titleEdit: "",
    subTitleEdit: "",
    imagesCover: "",
    categoryEdit: "",
    categoryListEdit: [],
    contentDraftEdit: "",
    isPostStatusEdit: null,
    isPostMessageEdit: ''
}


export const editBlogReducer = (
    state: EditBlogPresenter = editBlogPresenter,
    action: any
) => {
    switch (action.type) {
        case PostArticleAPI.UpdateArticleSuccess:
            localStorage.removeItem("edit-draft")
            localStorage.removeItem("edit-draft-detail")
            localStorage.removeItem("update-blog-id")
            Router.push("/")
            return state

        case EditBlogAction.handlePostStatusEdit:
            return {
                ...state,
                isPostStatusEdit: action.payload,
                isPostMessageEdit: action.message
            }

        case EditBlogAction.loadContentDraftEdit:
            let draftDetail = action.draftDetail;
            if (draftDetail !== null && draftDetail !== undefined) {
                draftDetail = JSON.parse(draftDetail)
                return {
                    ...state,
                    contentDraft: action.payload,
                    titleEdit: draftDetail && draftDetail.title,
                    subTitleEdit: draftDetail && draftDetail.subTitle,
                    imagesCover: draftDetail && draftDetail.imagesCover,
                    categoryEdit: draftDetail && draftDetail.category
                }
            } else {
                return state
            }

        case EditBlogAction.writeBlogResetEdit:
            return {
                ...state,
                contentDraftEdit: "",
                titleEdit: "",
                subTitleEdit: "",
                imagesCover: "",
                categoryEdit: ""

            }

        case BlogCategoryAPI.GetCategorySuccess:
            return {
                ...state,
                categoryListEdit: action.dataAPI
            }
        case BlogCategoryAPI.GetCategoryFailed:

            return {
                ...state,
                categoryListEdit: []
            }

        case EditBlogAction.handleSubmitWriteBlogEdit:
            return {
                textWritingBlogEdit: action.payload
            }

        case EditBlogAction.handleChangeTitleEdit:
            return {
                ...state,
                titleEdit: action.payload
            }
        case EditBlogAction.handleChangeSubTitleEdit:
            return {
                ...state,
                subTitleEdit: action.payload
            }
        case EditBlogAction.handleChangeCoverEdit:
            return {
                ...state,
                imagesCover: action.payload
            }
        case EditBlogAction.handleChangeCategoryEdit:
            return {
                ...state,
                categoryEdit: action.payload
            }
        default:
            return state
    }
}

const mapStateToProps = (state: any) => {
    return {
        editBlogPresenter: state.editBlogReducer,
        signinComponentPresenter: state.signinComponentReducer
    }
}

const mapDisPatchToProps = (dispatch: Dispatch) => ({
    getCategory: () => {
        dispatch(getBlogCategory())
    },

    handleChangeTitle: (event: any) => {
        dispatch({
            type: EditBlogAction.handleChangeTitleEdit,
            payload: event
        })
    },

    handleChangeSubTitle: (event: any) => {
        dispatch({
            type: EditBlogAction.handleChangeSubTitleEdit,
            payload: event
        })
    },

    handleChangeCover: (event: any) => {
        dispatch({
            type: EditBlogAction.handleChangeCoverEdit,
            payload: event
        })
    },

    handleChangeCategory: (event: any) => {
        dispatch({
            type: EditBlogAction.handleChangeCategoryEdit,
            payload: event
        })
    },

    handleSubmitWriteBlog: (content: any, userId: number | string, category: number | string, title: string, subTitle: string, cover: string) => {
        if (userId !== undefined && category !== "" && category != 0 && title.length > 0 && subTitle.length > 0 && cover.length > 0) {
            dispatch(updateArticle(localStorage.getItem("update-blog-id"), content, userId, category, title, subTitle, cover))
            dispatch({ type: EditBlogAction.writeBlogResetEdit })
            localStorage.removeItem("edit-draft")
            localStorage.removeItem("update-blog-id")
            localStorage.removeItem("edit-draft-detail")
        } else {
            dispatch({
                type: EditBlogAction.handlePostStatusEdit,
                payload: "failed",
                message: "Post article failed"
            })
        }
    },

    loadContentDraft: () => {        
        dispatch({
            type: EditBlogAction.loadContentDraftEdit,
            payload: localStorage.getItem("edit-draft"),
            draftDetail: localStorage.getItem("edit-draft-detail")
        })
    },
    handlePostStatus: () => {
        dispatch({
            type: EditBlogAction.handlePostStatusEdit,
            payload: null,
            message: ""
        })
    },
})

export default connect(mapStateToProps, mapDisPatchToProps)(EditBlog)