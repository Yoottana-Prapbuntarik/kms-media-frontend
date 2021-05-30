export interface ImageUserProfile {
    name: string;
    value: string
}
export interface FirstNameProfile {
    name: string;
    value: string
}
export interface LastNameProfile {
    name: string;
    value: string
}
export interface MobileProfile {
    name: string;
    value: string
}
export interface OldPasswordProfile {
    name: string;
    value: string
}
export interface NewPasswordProfile {
    name: string;
    value: string
}
export interface ConfirmNewPasswordProfile {
    name: string;
    value: string
}

export interface ProfilePresenter {
    imageUserProfile: ImageUserProfile;
    firstNameProfile: FirstNameProfile;
    lastNameProfile: LastNameProfile;
    mobileProfile: MobileProfile;
    oldPasswordProfile: OldPasswordProfile;
    newPasswordProfile: NewPasswordProfile;
    confirmNewPasswordProfile: ConfirmNewPasswordProfile;
    isUpdateStatus: boolean;
    isUpdateMessage: string;
    myBlogList: Array<any>;
    myDocumentList: Array<any>;
}

export enum ProfileAction {
    uploadProfileImage = "uploadProfileImage",
    handleUpdateStatus = "handleUpdateStatus"
}