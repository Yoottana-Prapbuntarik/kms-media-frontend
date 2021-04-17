export interface ErrorField {
    emailSignin: string;
    passwordSignin: string;
    emailSignup: string;
    firstNameSignup: string;
    lastNameSignup: string;
    phoneSignup: string;
    passwordSignup: string;
    confirmPasswordSignup: string;
}

export const regexExpression = {
    regexEmail: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9./_*/-]+\.[A-Z]{2,4}$/i),
    regexText: new RegExp(/^[a-zA-Z0-9ก-๙/,&./ ]*$/),
    regexTextOrWhiteSpace: new RegExp(/^[a-zA-Z0-9ก-๙/,&.]*$/),
    regexTelephone: new RegExp(/^[0-9]{10}$/i),
    regexPassword: new RegExp(/^[a-zA-Z0-9@]{4,}$/)
};
