import { connect } from "react-redux"
import SignupComponent from "./SignupComponent";
import { reduxForm } from "redux-form";
import { Dispatch } from "redux";
import {
    ConfirmPasswordSignup,
    EmailSignup,
    FirstNameSignup,
    LastNameSignup,
    PasswordSignup,
    PhoneSignup,
    SignupAction,
    // SignupAction,
    SignupComponentPresenter
} from "./SignupComponentInterface";
import { SignupActionAPI, signupAPI } from "../../apis/signupAPIClient";
import { KeyManager } from "../../manager/KeyManager";
import { TextManager } from "../../manager/TextManager";
import { FormManager } from "../../manager/FormManager";
import Router from "next/router";
const firstNameSignup: FirstNameSignup = {
    name: KeyManager.FirstNameSignup,
    placeholder: TextManager.TextFirstNameSignup,
    valueFirstNameSignup: ''
}

const lastNameSignup: LastNameSignup = {
    name: KeyManager.LastNameSignup,
    placeholder: TextManager.TextLastNameSignup,
    valueLastNameSignup: ''
}

const emailSignup: EmailSignup = {
    name: KeyManager.EmailSignup,
    placeholder: TextManager.TextEmailSignup,
    valueEmailSignup: ''
}

const phoneSignup: PhoneSignup = {
    name: KeyManager.PhoneSignup,
    placeholder: TextManager.TextPhoneSignup,
    valuePhoneSignup: ''
}

const passwordSignup: PasswordSignup = {
    name: KeyManager.PasswordSignup,
    placeholder: TextManager.TextPasswordSignup,
    valuePasswordSignup: ''
}

const confirmPasswordSignup: ConfirmPasswordSignup = {
    name: KeyManager.ConfirmPasswordSignup,
    placeholder: TextManager.TextConfirmPasswordSignup,
    valueConfirmPasswordSignup: ''
}

const signupComponentPresenter: SignupComponentPresenter = {
    buttonSignup: TextManager.TextButtonRegister,
    firstNameSignup: firstNameSignup,
    lastNameSignup: lastNameSignup,
    emailSignup: emailSignup,
    phoneSignup: phoneSignup,
    passwordSignup: passwordSignup,
    confirmPasswordSignup: confirmPasswordSignup,
    imageSignup: 'assets/images/signup/signup.png',
    titleSignup: TextManager.TextButtonRegister
}

export const signupComponentReducer = (
    state: SignupComponentPresenter = signupComponentPresenter,
    action: any
) => {
    switch (action.type) {
        case SignupAction.ResetForm:
            return {
                ...state,
                firstNameSignup: {
                    name: KeyManager.FirstNameSignup,
                    placeholder: TextManager.TextFirstNameSignup,
                    valueFirstNameSignup: ""
                },
                lastNameSignup: {
                    name: KeyManager.LastNameSignup,
                    placeholder: TextManager.TextLastNameSignup,
                    valueLastNameSignup: ""
                },
                phoneSignup: {
                    name: KeyManager.PhoneSignup,
                    placeholder: TextManager.TextPhoneSignup,
                    valuePhoneSignup: ""
                },
                emailSignup: {
                    name: KeyManager.EmailSignup,
                    placeholder: TextManager.TextEmailSignup,
                    valueEmailSignup: ""
                },
                passwordSignup: {
                    name: KeyManager.PasswordSignup,
                    placeholder: TextManager.TextPasswordSignup,
                    valuePasswordSignup: ""
                },
                confirmPasswordSignup: {
                    name: KeyManager.ConfirmPasswordSignup,
                    placeholder: TextManager.TextConfirmPasswordSignup,
                    valueConfirmPasswordSignup: ""
                }
            }
        case SignupActionAPI.Signupccess:
            Router.replace("/signin")
            alert(action.keyMessage)
            return state
            
            case SignupActionAPI.SignupFailed:
            alert(action.keyMessage)
            return state

        case SignupAction.HandleChangeFirstNameSignup:
            return {
                ...state,
                firstNameSignup: {
                    name: KeyManager.FirstNameSignup,
                    placeholder: TextManager.TextFirstNameSignup,
                    valueFirstNameSignup: action.payload
                }
            }

        case SignupAction.HandleChangeLastNameSignup:
            return {
                ...state,
                lastNameSignup: {
                    name: KeyManager.LastNameSignup,
                    placeholder: TextManager.TextLastNameSignup,
                    valueLastNameSignup: action.payload
                }
            }

        case SignupAction.HandleChangePhoneSignup:
            return {
                ...state,
                phoneSignup: {
                    name: KeyManager.PhoneSignup,
                    placeholder: TextManager.TextPhoneSignup,
                    valuePhoneSignup: action.payload
                }

            }

        case SignupAction.HandleChangeEmailSignup:
            return {
                ...state,
                emailSignup: {
                    name: KeyManager.EmailSignup,
                    placeholder: TextManager.TextEmailSignup,
                    valueEmailSignup: action.payload
                }
            }

        case SignupAction.HandleChangePasswordSignup:
            return {
                ...state,
                passwordSignup: {
                    name: KeyManager.PasswordSignup,
                    placeholder: TextManager.TextPasswordSignup,
                    valuePasswordSignup: action.payload
                }
            }

        case SignupAction.HandleChangeConfirmPasswordSignup:
            return {
                ...state,
                confirmPasswordSignup: {
                    name: KeyManager.ConfirmPasswordSignup,
                    placeholder: TextManager.TextConfirmPasswordSignup,
                    valueConfirmPasswordSignup: action.payload
                }
            }
        default:
            return state
    }
}


const mapDisPatchToProps = (dispatch: Dispatch) => ({

    handleChangeFirstNameSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangeFirstNameSignup,
            payload: event
        })
    },

    handleChangeLastNameSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangeLastNameSignup,
            payload: event
        })
    },

    handleChangePhoneSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangePhoneSignup,
            payload: event
        })
    },

    handleChangeEmailSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangeEmailSignup,
            payload: event
        })
    },

    handleChangePasswordSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangePasswordSignup,
            payload: event
        })
    },

    handleChangeConfirmPasswordSignup: (event: any) => {
        dispatch({
            type: SignupAction.HandleChangeConfirmPasswordSignup,
            payload: event
        })
    },


    submitSignup: (event: any) => {
        dispatch({
            type: SignupAction.ResetForm
        })

        dispatch(signupAPI(
            event.emailSignup,
            event.phoneSignup,
            event.firstNameSignup,
            event.lastNameSignup,
            event.passwordSignup
        ))
    }
})

const mapStateToProps = (state: any) => ({
    signupComponentPresenter: state.signupComponentReducer
})

const form = reduxForm({
    form: FormManager.SignupForm,
    shouldValidate: () => true,
    //validate
})(SignupComponent)

export default connect(mapStateToProps, mapDisPatchToProps)(form)