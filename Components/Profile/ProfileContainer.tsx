import { connect } from "react-redux";
import { KeyManager } from "../../manager/KeyManager";
import { Dispatch } from "redux";
import { reduxForm } from "redux-form";
import Profile from "./Profile";
import {
    ConfirmNewPasswordProfile,
    FirstNameProfile,
    ImageUserProfile,
    LastNameProfile,
    MobileProfile,
    NewPasswordProfile,
    OldPasswordProfile,
    ProfileAction,
    ProfilePresenter
} from "./ProfileInterface";
import { actionTypes as formActionTypes } from 'redux-form'
import { getUserData } from "../../apis/ signinAPIClient";
import { UserProfileAction, getUserProfile, updateUserProfile } from "../../apis/userProfileAPIClient";
import { FormManager } from "../../manager/FormManager";

const imageUserProfile: ImageUserProfile = {
    name: KeyManager.ImageUserProfile,
    value: ""
}
const firstNameProfile: FirstNameProfile = {
    name: KeyManager.FirstNameProfile,
    value: ""
}
const lastNameProfile: LastNameProfile = {
    name: KeyManager.LastNameProfile,
    value: ""
}
const mobileProfile: MobileProfile = {
    name: KeyManager.MobileProfile,
    value: ""
}
const oldPasswordProfile: OldPasswordProfile = {
    name: KeyManager.OldPasswordProfile,
    value: ""
}
const newPasswordProfile: NewPasswordProfile = {
    name: KeyManager.NewPasswordProfile,
    value: ""
}
const confirmNewPasswordProfile: ConfirmNewPasswordProfile = {
    name: KeyManager.ConfirmNewPasswordProfile,
    value: ""
}

const profilePresenter: ProfilePresenter = {
    confirmNewPasswordProfile: confirmNewPasswordProfile,
    firstNameProfile: firstNameProfile,
    imageUserProfile: imageUserProfile,
    lastNameProfile: lastNameProfile,
    mobileProfile: mobileProfile,
    newPasswordProfile: newPasswordProfile,
    oldPasswordProfile: oldPasswordProfile,
    isUpdateStatus: null,
    isUpdateMessage: ''
}

export const profileReducer = (state: ProfilePresenter = profilePresenter, action: any) => {
    switch (action.type) {
        case UserProfileAction.upateProfileSuccess:
            return {
                ...state,
                isUpdateStatus: 200,
                isUpdateMessage: action.key_message
            }
        
        case UserProfileAction.getUserProfileSuccess:
            return {
                ...state,
                imageUserProfile: {
                    name: KeyManager.ImageUserProfile,
                    value: state.imageUserProfile.value = action.dataAPI.image
                },
                firstNameProfile: {
                    name: KeyManager.FirstNameProfile,
                    value: state.firstNameProfile.value = action.dataAPI.first_name
                },
                lastNameProfile: {
                    name: KeyManager.LastNameProfile,
                    value: state.lastNameProfile.value = action.dataAPI.last_name
                },
                mobileProfile: {
                    name: KeyManager.MobileProfile,
                    value: state.mobileProfile.value = action.dataAPI.mobile
                },
                oldPasswordProfile: {
                    name: KeyManager.OldPasswordProfile,
                    value: ""
                },
                newPasswordProfile: {
                    name: KeyManager.NewPasswordProfile,
                    value: ""
                },
                confirmNewPasswordProfile: {
                    name: KeyManager.ConfirmNewPasswordProfile,
                    value: ""
                }
            }
        case formActionTypes.INITIALIZE:
            const profilePresenterInit = {

                imageUserProfile: {
                    name: KeyManager.ImageUserProfile,
                    value: state.imageUserProfile.value
                },

                firstNameProfile: {
                    name: KeyManager.FirstNameProfile,
                    value: state.firstNameProfile.value
                },

                lastNameProfile: {
                    name: KeyManager.LastNameProfile,
                    value: state.lastNameProfile.value
                },

                mobileProfile: {
                    name: KeyManager.MobileProfile,
                    value: state.mobileProfile.value
                },

                oldPasswordProfile: {
                    name: KeyManager.OldPasswordProfile,
                    value: state.oldPasswordProfile.value
                },

                newPasswordProfile: {
                    name: KeyManager.NewPasswordProfile,
                    value: state.newPasswordProfile.value
                },

                confirmNewPasswordProfile: {
                    name: KeyManager.ConfirmNewPasswordProfile,
                    value: state.confirmNewPasswordProfile.value
                },

            }
            return {
                ...state,
                profilePresenterInit,
            }

        case ProfileAction.uploadProfileImage:
            return {
                ...state,
                imageUserProfile: {
                    name: KeyManager.ImageUserProfile,
                    value: action.payload
                }
            }

        case ProfileAction.handleUpdateStatus:
            return {
                ...state,
                isUpdateStatus: action.payload,
                isUpdateMessage: action.message
            }
        default:
            return state
    }
}

const mapStateToProps = (state: any) => {
    return {
        profilePresenter: state.profileReducer,
        initialValues: {
            "imageUserProfile": state.profileReducer.imageUserProfile.value,
            "firstNameProfile": state.profileReducer.firstNameProfile.value,
            "lastNameProfile": state.profileReducer.lastNameProfile.value,
            "mobileProfile": state.profileReducer.mobileProfile.value
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
    getUserProfile: () => {
        dispatch(getUserProfile(
            ownProps.firstName,
            ownProps.lastName,
            ownProps.uuid
        ))
    },
    uploadProfileImage: (e: string) => {
        dispatch({
            type: ProfileAction.uploadProfileImage,
            payload: e
        })
    },
    handleUpdateProfile: async (information: any, image: string) => {
        await dispatch(
            updateUserProfile(
                information.mobileProfile,
                information.firstNameProfile,
                information.lastNameProfile,
                image,
                ownProps.uuid)
        )
    },
    handleUpdateStatus: () => {
        dispatch({
            type: ProfileAction.handleUpdateStatus,
            payload: null,
            message: ""
        })
        dispatch(getUserData())
    },
})

const form = reduxForm({
    form: FormManager.EditProfile,
    shouldValidate: () => true,
    shouldAsyncValidate: () => true,
    // validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(Profile)

export default connect(mapStateToProps, mapDispatchToProps)(form);