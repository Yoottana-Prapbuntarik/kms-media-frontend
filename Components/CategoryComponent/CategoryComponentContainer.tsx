import { connect } from "react-redux"
import CategoryComponent from "./CategoryComponent";
import { Dispatch } from 'redux'
import {
    CategoryComponentPresenter,
    ItemsInCategory,
} from "./CategoryComponentInterface";
const itemsInCategory: ItemsInCategory[] = [
    {
        author: '',
        categoryType: '',
        date: '',
        detail: '',
        title: ''
    }
]

const categoryComponentPresenter: CategoryComponentPresenter = {
    itemsInCategory: itemsInCategory
}

export const categoryComponentReducer = (
    state: CategoryComponentPresenter = categoryComponentPresenter, 
    // action: any
) => {
    // switch (action.type) {
    //     case value:
            
    
    //     default:
    //         return state
    // }
    return state
}

const mapStateToProps = (state: any) => ({
    categoryComponentPresenter: state.categoryComponentReducer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent)