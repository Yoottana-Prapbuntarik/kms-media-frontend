export interface EmailSignin {
    name: string;
    placeholder: string;
    valueEmailSignin: string;
}

export interface PasswordSignin {
    name: string;
    placeholder: string;
    valuePasswordSignin: string;
}

export interface SigninComponentPresenter {
    imageSignin: string;
    titleSignin: string;
    forgotPassword: string;
    buttonSignin: string;
    emailSignin: EmailSignin;
    passwordSignin: PasswordSignin;
    userProfile: any;
    isSignin: any;
    isSigninMessage: string;
}


export enum SigninAction {
    HandleChangeEmail = "HandleChangeEmail",
    HandleChangePassword = "HandleChangePassword",
    ResetForm = "ResetForm",
    IsAsknowledge = "IsAsknowledge"
}