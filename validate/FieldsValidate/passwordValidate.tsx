import {regexExpression } from "../../validate/interfaceValidate";
import { TextManager } from '../../manager/TextManager';

export const passwordValidator = (password: string) => {
	if (isPassword(password)) {
		return {
			status: true,
			keyMessage: null
		};
	}

	return {
		status: false,
		keyMessage: TextManager.PasswordInvalid
	};
};

export const passwordMatchingValidator = (password: string, confirmPassword: string) => {
	if (isMatching(password, confirmPassword)) {
		return {
			status: true,
			keyMessage: null
		};
	}

	return {
		status: false,
		keyMessage: TextManager.PasswordInvalid
	};
};

const isPassword = (password: string) => {
	return regexExpression.regexPassword.test(password) && password !== undefined;
};

const isMatching = (password: string, confirmPassword: string) => {
	return password === confirmPassword;
};
