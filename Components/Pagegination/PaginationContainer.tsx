import { connect } from "react-redux";
import Pagegination from "./Pagegination";
import { PageginationPresenter } from "./PageginationInterface";

const pageginationPresenter: PageginationPresenter = {
    numberOfPage: 1
}

export const pageginationReducer = (state: PageginationPresenter = pageginationPresenter) => {
    return state
}

const mapStateToProps = (state: any, ownProps) => ({
    pageginationPresenter: state.pageginationReducer,
    ownProps: ownProps
})

export default connect(mapStateToProps)(Pagegination)