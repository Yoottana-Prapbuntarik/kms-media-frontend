import Home from "./Home";
import { connect } from "react-redux";
import { HomePresenter } from "./HomeInterface";
import { GetArticleAction, getArticle } from "../../apis/getAllArticle";
import { Dispatch } from "redux";

const cardThumbnail = [
    {
        img: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        title: 'Lorem ipsum dolor.',
        detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa vulputate sit lacus lacus, 
                lorem dictum ullamcorper id. Scelerisque sagittis eget velit, diam aliquet maecenas nisi, egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa vulputate sit lacus lacus, lorem dictum ullamcorper id. Scelerisque sagittis eget velit, diam aliquet maecenas nisi, egestas
                lorem dictum ullamcorper id. Scelerisque sagittis eget velit, diam aliquet maecenas nisi, egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa vulputate sit lacus lacus, lorem dictum ullamcorper id. Scelerisque sagittis eget velit,`,
        user: 'John Doh',
        date: 'November , 8 , 2019',
        facebook: 'fb.com/dummy',
        like: '1',
        google: '',
        linkedin: '',
        ig: ''
    },
]

const slideShow = [
    { img: '/assets/images/banner.png', title: "Top Amazing Place to go in Summer", detail: "November , 8 , 2019    John Doh" },
    { img: '/assets/images/banner.png', title: "Top Amazing Place to go in Summer", detail: "November , 8 , 2019    John Doh" }
]

const homePresenter: HomePresenter = {
    allArticle: [],
    slideShow: slideShow,
    cardThumbnail: cardThumbnail
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

const mapStateToProps = (state: any) => ({
    homePresenter: state.homeReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getArticle: () => {
        dispatch(getArticle())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)