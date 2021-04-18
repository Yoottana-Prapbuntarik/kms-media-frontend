import { connect } from "react-redux";
import DetailCompoent from "./DetailCompoent";
import { FormManager } from "../../manager/FormManager";
import { commentArticle, getCommentAll, getArticleDetail, GetArticleAction } from "../../apis/getAllArticle";
import { reduxForm } from "redux-form";
import {
    DetailCompoentPresenter,
    CommentField
} from "./DetailCompoentInterface";
import { Dispatch } from "redux";

const commentField: CommentField = {
    name: "comment",
    value: "fasdfasfasdfadsfasfadsfasdf"
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
    commentList: []
}

export const detailCompoentReducer = (
    state: DetailCompoentPresenter = detailCompoentPresenter,
    action: any
) => {
    switch (action.type) {
        case GetArticleAction.getArticleDetailSuccess:
            // author: {

            return {
                ...state,
                titleDetail: action.dataAPI.title,
                detailCover: action.dataAPI.cover,
                category: action.dataAPI.category.name,
                author: {
                    userName: action.dataAPI.own_user.first_name + " " + action.dataAPI.own_user.last_name,
                    userProfile: action.dataAPI.own_user.first_name[0] + "" + action.dataAPI.own_user.last_name[0],
                    email: action.dataAPI.own_user.email
                },
                detailMarkdown: JSON.parse(action.dataAPI.content)
            }
        case GetArticleAction.getArticleDetailFailed:
            return state

        case GetArticleAction.commentArticleDetailSuccess:
            alert("แสดงความคิดเห็นสำเร็จ")
            return state
        case GetArticleAction.commentArticleDetailFailed:
            alert("เกิดข้อผิดพลาดในการแสดงความคิดเห็น")
            return state
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

    handleSubmitComment:  (owner, userCommentId, commentText: string) => {
         dispatch(commentArticle(ownProps.detail, userCommentId, commentText, owner))
    },

    getCommentAll: () => {
        dispatch(getCommentAll(ownProps.detail))
    }
})


const form = reduxForm({
    form: FormManager.BlogDetail,
    shouldValidate: () => true,
    // validate
})(DetailCompoent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
