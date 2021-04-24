import { connect } from "react-redux";
import DetailCompoent from "./DetailCompoent";
import { FormManager } from "../../manager/FormManager";
import { commentArticle, getCommentAll, getArticleDetail, GetArticleAction } from "../../apis/getAllArticle";
import { reduxForm, reset } from "redux-form";
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
            console.log(`action.dataAPI`, action.dataAPI)
            return {
                ...state,
                titleDetail: action.dataAPI.title,
                detailCover: action.dataAPI.cover,
                category: action.dataAPI.category.name,
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

    getCommentAll: () => {
        dispatch(getCommentAll(ownProps.detail))
    },
    asknowledge: () => {
        dispatch({
            type: DetailComponentAction.askknowledgeErrorComment,
            payload: null,
            message: ""
        })
        dispatch(reset(FormManager.BlogDetail))
    }
})


const form = reduxForm({
    form: FormManager.BlogDetail,
    shouldValidate: () => true,
    // validate
})(DetailCompoent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
