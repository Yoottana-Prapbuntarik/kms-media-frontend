export interface ErrorField {
    emailSignin: string;
    passwordSignin: string;
}

export const regexExpression = {
    regexEmail: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9./_*/-]+\.[A-Z]{2,4}$/i),
    regexText: new RegExp(/^[a-zA-Z0-9ก-๙/,&./ ]*$/),
    regexTextOrWhiteSpace: new RegExp(/^[a-zA-Z0-9ก-๙/,&.]*$/),
    regexPassword: new RegExp(/^[a-zA-Z0-9@]{4,}$/)
};
