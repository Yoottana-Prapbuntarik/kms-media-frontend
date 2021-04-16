import { connect } from "react-redux";
import SigninComponent from "./SigninComponent";
import { reduxForm } from "redux-form";
import { Dispatch } from "redux";
import { EmailSignin, PasswordSignin, SigninComponentPresenter, SigninAction } from "./SigninComponentInterface";
import { KeyManager } from "../../manager/KeyManager";
import { TextManager } from "../../manager/TextManager";
import { FormManager } from "../../manager/FormManager";
import validate from "../../validate/signin/signinValidate";
import { SigninActionAPI, signinAPI, getUserData } from "../../apis/ signinAPIClient";
const emailSignin: EmailSignin = {
    name: KeyManager.EmailSignin,
    placeholder: TextManager.TextEmailSignin,
    valueEmailSignin: ''
}

const passwordSignin: PasswordSignin = {
    name: KeyManager.PasswordSignin,
    placeholder: TextManager.TextPasswordSignin,
    valuePasswordSignin: ''
}

const signinComponentPresenter: SigninComponentPresenter = {
    buttonSignin: TextManager.TextButtonLogin,
    emailSignin: emailSignin,
    passwordSignin: passwordSignin,
    forgotPassword: TextManager.TextForgotPassword,
    imageSignin: 'assets/images/signin/signin.png',
    titleSignin: TextManager.Welcome,
    userProfile: {},
    isSignin: null,
    isSigninMessage: ""
}

export const signinComponentReducer = (
    state: SigninComponentPresenter = signinComponentPresenter, action: any
) => {
    switch (action.type) {
        case SigninAction.HandleChangeEmail:
            return {
                ...state,
                emailSignin: {
                    name: KeyManager.EmailSignin,
                    placeholder: TextManager.TextEmailSignin,
                    valueEmailSignin: action.payload
                }
            }

        case SigninAction.HandleChangePassword:
            return {
                ...state,
                passwordSignin: {
                    name: KeyManager.PasswordSignin,
                    placeholder: TextManager.TextPasswordSignin,
                    valuePasswordSignin: action.payload
                },
            }
        case SigninAction.ResetForm:
            return {
                ...state,
                passwordSignin: {
                    name: KeyManager.PasswordSignin,
                    placeholder: TextManager.TextPasswordSignin,
                    valuePasswordSignin: ''
                },
                emailSignin: {
                    name: KeyManager.EmailSignin,
                    placeholder: TextManager.TextEmailSignin,
                    valueEmailSignin: ''
                }
            }
        case SigninActionAPI.SigninSuccess:
            return {
                ...state,
                isSignin: action.keyStatus,
                isSigninMessage: action.keyMessage

            }
       
            case SigninActionAPI.SigninGetUserProfileSuccess:
            return {
                ...state,
                userProfile: action.dataAPI,
            }

        case SigninActionAPI.SigninFailed:
            return {
                ...state,
                isSignin: action.keyStatus,
                isSigninMessage: action.keyMessage
            }

        

        case SigninAction.IsAsknowledge:
            return {
                ...state,
                isSignin: action.payload,
            }
        default:
            return state
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({

    handleChangeEmail: (event: any) => {
        dispatch({
            type: SigninAction.HandleChangeEmail,
            payload: event
        })
    },
    getUserData: () => {
        dispatch(getUserData())
    },

    handleChangePassword: (event: any) => {
        dispatch({
            type: SigninAction.HandleChangePassword,
            payload: event
        })
    },
    submitSignin: (event: any) => {
        dispatch({
            type: SigninAction.ResetForm
        })
        dispatch(signinAPI(event.emailSignin, event.passwordSignin));
    },
    IsAsknowledge: (event: any) => {
        dispatch({
            type: SigninAction.IsAsknowledge,
            payload: event
        })
    }
})

const mapStateToProps = (state: any) => ({
    signinComponentPresenter: state.signinComponentReducer
})


const form = reduxForm({
    form: FormManager.SigninForm,
    shouldValidate: () => true,
    validate
})(SigninComponent)

export default connect(mapStateToProps, mapDispatchToProps)(form)