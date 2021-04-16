import { connect } from "react-redux";
import Footer from "./Footer"
import { FooterPresenter, SocialContact } from "./FooterInterface";

const socialContact: SocialContact[] = [
    {
        socialImages: '/assets/images/logo/facebook.png',
        routePath: '/'
    },
    {
        socialImages: '/assets/images/logo/line.png',
        routePath: '/'
    },
    {
        socialImages: '/assets/images/logo/instagram.png',
        routePath: '/'
    },
]

const footerPresenter: FooterPresenter = {
    socialContact: socialContact
}

export const footerReducer = (
    state: FooterPresenter = footerPresenter,
) => {

    return state
}


const mapStateToProps = (state: any) => ({
    footerPresenter: state.footerReducer
})

export default connect(mapStateToProps)(Footer)