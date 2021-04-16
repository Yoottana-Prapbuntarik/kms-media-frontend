export interface FirstNameSignup {
    name: string;
    placeholder: string;
    valueFirstNameSignup: string;
}

export interface LastNameSignup {
    name: string;
    placeholder: string;
    valueLastNameSignup: string;
}

export interface PhoneSignup {
    name: string;
    placeholder: string;
    valuePhoneSignup: string;
}

export interface EmailSignup {
    name: string;
    placeholder: string;
    valueEmailSignup: string;
}

export interface PasswordSignup {
    name: string;
    placeholder: string;
    valuePasswordSignup: string;
}

export interface ConfirmPasswordSignup {
    name: string;
    placeholder: string;
    valueConfirmPasswordSignup: string;
}

export interface SignupComponentPresenter {
    imageSignup: string;
    titleSignup: string;
    buttonSignup: string;
    firstNameSignup: FirstNameSignup;
    lastNameSignup: LastNameSignup;
    phoneSignup: PhoneSignup;
    emailSignup: EmailSignup;
    passwordSignup: PasswordSignup;
    confirmPasswordSignup: ConfirmPasswordSignup;
}


export enum SignupAction {
    HandleChangeFirstNameSignup = "HandleChangeFirstNameSignup",
    HandleChangeLastNameSignup = "HandleChangeLastNameSignup",
    HandleChangePhoneSignup = "HandleChangePhoneSignup",
    HandleChangeEmailSignup = "HandleChangeEmailSignup",
    HandleChangePasswordSignup = "HandleChangePasswordSignup",
    HandleChangeConfirmPasswordSignup = "HandleChangeConfirmPasswordSignup",
    ResetForm = "ResetForm"
}