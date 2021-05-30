import Home from "./Home";
import { connect } from "react-redux";
import { HomePresenter } from "./HomeInterface";
import { GetArticleAction, getArticle } from "../../apis/getAllArticle";
import { Dispatch } from "redux";


const homePresenter: HomePresenter = {
    allArticle: [],
}

export const homeReducer = (state: HomePresenter = homePresenter, action) => {
    switch (action.type) {
        case GetArticleAction.getArticleSuccess:            
            return {
                ...state,
                allArticle: action.dataAPI
            }

        default:
            return state
    }
}

const mapStateToProps = (state: any, ownProps) => ({
    homePresenter: state.homeReducer,
    slideShow: ownProps.sliderData
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getArticle: () => {
        dispatch(getArticle())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)