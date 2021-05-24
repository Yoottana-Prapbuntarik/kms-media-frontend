import { connect } from "react-redux";
import Navigation from "./Navigation";
import { NavigationPresenter, NavigationItems } from "./NavigationInterface";
import { getUserData } from "../../apis/ signinAPIClient";
import { Dispatch } from "redux";

const navigationItems: NavigationItems[] = [
    {
        keyTitle: 'Home',
        routePath: '/'
    },
    // {
    //     keyTitle: 'Category',
    //     routePath: [
    //         { type: 'Category1', path: 'Category1' },
    //         { type: 'Category2', path: 'Category2' },
    //         { type: 'Category3', path: 'Category3' },
    //         { type: 'Category4', path: 'Category4' },
    //     ]
    // },

    {
        keyTitle: 'News',
        routePath: '/news'
    },

    {
        keyTitle: 'Category',
        routePath: '/category'
    },

    {
        keyTitle: 'Write a story',
        routePath: '/write-blog'
    },
]

const social: NavigationItems[] = [
  
    {
        keyTitle: '/assets/images/logo/search.png',
        routePath: '#'
    },
 
]

const navigationPresenter: NavigationPresenter = {
    navigationItems: navigationItems,
    social: social,
    isToggleNav: false
}

export const navigationReducer = (
    state: NavigationPresenter = navigationPresenter,
) => {

    return state
}


const mapStateToProps = (state: any) => ({
    navigationPresenter: state.navigationReducer,
    signinComponentPresenter: state.signinComponentReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getUserData:()=> {
        dispatch(getUserData())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)