import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import { navigationReducer } from "../Components/Navigation/NavigationContainer";
import { footerReducer } from "../Components/Footer/FooterContainer";
import { pageginationReducer } from "../Components/Pagegination/PaginationContainer";
import { signinComponentReducer } from "../Components/Signin/SigninComponentContainer";
import { signupComponentReducer } from "../Components/Signup/SignupComponentContainer";
import { categoryComponentReducer } from "../Components/CategoryComponent/CategoryComponentContainer";
import { detailCompoentReducer } from "../Components/DetailCompoent/DetailCompoentContainer";
import {writeBlogReducer} from "../Components/WriteBlog/WriteBlogContainer";
import { homeReducer } from "../Components/Home/HomeContainer";
import { profileReducer } from "../Components/Profile/ProfileContainer";
import { editBlogReducer } from "../Components/EditBlog/EditBlogContainer";
export interface initialState { }

const rootReducers = combineReducers({
  navigationReducer: navigationReducer,
  footerReducer: footerReducer,
  pageginationReducer: pageginationReducer,
  signinComponentReducer: signinComponentReducer,
  signupComponentReducer: signupComponentReducer,
  categoryComponentReducer: categoryComponentReducer,
  detailCompoentReducer: detailCompoentReducer,
  writeBlogReducer: writeBlogReducer,
  homeReducer: homeReducer,
  profileReducer: profileReducer,
  editBlogReducer: editBlogReducer,
  form: reduxFormReducer
});

export default rootReducers;