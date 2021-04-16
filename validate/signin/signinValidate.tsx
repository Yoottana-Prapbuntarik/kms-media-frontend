import { FormErrors } from 'redux-form';
import { ErrorField } from '../interfaceValidate';
import { emailValidator } from '../FieldsValidate/emailValidate';
import { passwordValidator } from "../FieldsValidate/passwordValidate";

const validate = (signinInformation: any): FormErrors => {
	let errors: FormErrors<ErrorField> = {};
	
	let emailValidatorResult = emailValidator(signinInformation.emailSignin);

	if (!emailValidatorResult.status) {
		errors.emailSignin = emailValidatorResult.keyMessage;
	}

	let passwordValidatorResult = passwordValidator(signinInformation.passwordSignin);

	if (!passwordValidatorResult.status) {
		errors.passwordSignin = passwordValidatorResult.keyMessage;
	}

	return errors;
};

export default validate;
