import { connect } from "react-redux";
import DetailCompoent from "./DetailCompoent";
import { getArticleDetail, GetArticleAction } from "../../apis/getAllArticle";
import {
    DetailCompoentPresenter
} from "./DetailCompoentInterface";
import { Dispatch } from "redux";

const detailCompoentPresenter: DetailCompoentPresenter = {
    titleDetail: "",
    detailCover: "",
    author: {
        userName: "",
        userProfile: ""
    },
    category: "",
    detailMarkdown: "",
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
                    userProfile: action.dataAPI.own_user.first_name[0] + "" + action.dataAPI.own_user.last_name[0]
                },
                detailMarkdown: JSON.parse(action.dataAPI.content)
            }
        case GetArticleAction.getArticleDetailFailed:


        default:
            return state
    }
}


const mapStateToProps = (state: any) => ({
    detailCompoentPresenter: state.detailCompoentReducer,
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
    getArticleDetail: () => {
        dispatch(getArticleDetail(ownProps.detail))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailCompoent)
