import { connect } from "react-redux";
import DetailCompoent from "./DetailCompoent";
import { FormManager } from "../../manager/FormManager";
import { commentArticle, getCommentAll, getArticleDetail, GetArticleAction, updateCommentArticle, deleteCommentByUserComment } from "../../apis/getAllArticle";
import { reduxForm, reset } from "redux-form";
import { likeArticle, LikeArticleAPI } from "../../apis/postArticleAPIClient"
import {
    DetailCompoentPresenter,
    DetailComponentAction,
    CommentField
} from "./DetailCompoentInterface";
import { Dispatch } from "redux";

const commentField: CommentField = {
    name: "comment",
    value: ""
}

const detailCompoentPresenter: DetailCompoentPresenter = {
    likeAmount: 0,
    blogId: 0,
    titleDetail: "",
    detailCover: "",
    author: {
        userName: "",
        userProfile: ""
    },
    category: "",
    detailMarkdown: "",
    commentField: commentField,
    commentList: [],
    isCommentStatus: null,
    isCommentMessage: ""
}

export const detailCompoentReducer = (
    state: DetailCompoentPresenter = detailCompoentPresenter,
    action: any
) => {
    switch (action.type) {
        case GetArticleAction.getArticleDetailSuccess:
            return {
                ...state,
                blogId: action.dataAPI.id,
                titleDetail: action.dataAPI.title,
                detailCover: action.dataAPI.cover,
                category: action.dataAPI.category.name,
                likeAmount: action.dataAPI.fk_like_blog.length,
                author: {
                    userName: action.dataAPI.own_user.first_name + " " + action.dataAPI.own_user.last_name,
                    userProfile: action.dataAPI.own_user.image,
                    email: action.dataAPI.own_user.email
                },
                detailMarkdown: JSON.parse(action.dataAPI.content)
            }
        case GetArticleAction.getArticleDetailFailed:
            return state

        case DetailComponentAction.askknowledgeErrorComment:
            return {
                ...state,
                isCommentStatus: action.payload,
                isCommentMessage: action.message
            }

        case GetArticleAction.commentArticleDetailSuccess:
            return {
                ...state,
                isCommentStatus: 200,
                isCommentMessage: "Comment Successfully!"
            }


        case GetArticleAction.commentArticleDetailFailed:

            return {
                ...state,
                isCommentStatus: 401,
                isCommentMessage: "Comment Falied! Please please signin or check information comment."
            }
        case GetArticleAction.updateCommentDetailSuccess:
            return {
                ...state,
                isCommentStatus: 200,
                isCommentMessage: action.keyMessage
            }


        case GetArticleAction.updateCommentDetailFailed:

            return {
                ...state,
                isCommentStatus: 401,
                isCommentMessage: action.keyMessage
            }

            case LikeArticleAPI.LikeSuccess:
            return state


        case LikeArticleAPI.LikeFiled:

            return {
                ...state,
                isCommentStatus: 401,
                isCommentMessage: "Like Failed. Please Signin"
            }
            
            
            
        case GetArticleAction.deleteCommentDetailSuccess:
            return {
                ...state,
                isCommentStatus: 200,
                isCommentMessage: "Delete Comment successfully"
            }

        case GetArticleAction.deleteCommentDetailFailed:
            return {
                ...state,
                isCommentStatus: 401,
                isCommentMessage: "Delete Comment Failed"
            }

        case GetArticleAction.deleteCommentDetailSuccess:
    
        case GetArticleAction.getCommentArticleDetailSuccess:
            return {
                ...state,
                commentList: action.dataAPI
            }

        case GetArticleAction.getArticleDetailFailed:
            return {
                ...state,
                commentList: []
            }
        default:
            return state
    }
}


const mapStateToProps = (state: any) => ({
    detailCompoentPresenter: state.detailCompoentReducer,
    signinComponentPresenter: state.signinComponentReducer
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
    getArticleDetail: () => {
        dispatch(getArticleDetail(ownProps.detail))
    },

    handleSubmitComment: (owner, userCommentId, commentText: string) => {
        dispatch(commentArticle(ownProps.detail, userCommentId, commentText, owner))
    },

    handleSubmitUpdateComment: (idEdit, userCommentId, commentText) => {
        console.log(idEdit, ownProps.detail, userCommentId, commentText)
        dispatch(updateCommentArticle(idEdit, ownProps.detail, userCommentId, commentText))
        setTimeout(() => {
            dispatch(getCommentAll(ownProps.detail))
        }, 500);
    },

    getCommentAll: () => {
        dispatch(getCommentAll(ownProps.detail))
    },
    deleteCommentByIdOwnUser: (id:number | string) => {
        dispatch(deleteCommentByUserComment(id))
        setTimeout(() => {
            dispatch(getCommentAll(ownProps.detail))
        }, 500);
    },
    asknowledge: () => {
        dispatch({
            type: DetailComponentAction.askknowledgeErrorComment,
            payload: null,
            message: ""
        })
        dispatch(reset(FormManager.BlogDetail))
    },

    asknowledgeSubmit: (status, msg) => {
        dispatch({
            type: DetailComponentAction.askknowledgeErrorComment,
            payload: status,
            message: msg
        })
        dispatch(reset(FormManager.BlogDetail))
    },
    likeArticle: (blogId, userLike) => {
        dispatch(likeArticle(blogId, userLike, blogId))
    }
})


const form = reduxForm({
    form: FormManager.BlogDetail,
    shouldValidate: () => true,
    // validate
})(DetailCompoent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
