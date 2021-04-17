import { FormErrors } from 'redux-form';
import { ErrorField } from '../interfaceValidate';
import { emailValidator } from '../FieldsValidate/emailValidate';
import { passwordValidator } from "../FieldsValidate/passwordValidate";
import { regexExpression } from "../interfaceValidate";

const validate = (signupInformation: any): FormErrors => {
    let errors: FormErrors<ErrorField> = {};

    if (!regexExpression.regexTextOrWhiteSpace.test(signupInformation.firstNameSignup) || signupInformation.firstNameSignup === undefined) {
        errors.firstNameSignup = "โปรดระบุข้อมูล"
    }

    if (!regexExpression.regexTextOrWhiteSpace.test(signupInformation.lastNameSignup) || signupInformation.lastNameSignup === undefined) {
        errors.lastNameSignup = "โปรดระบุข้อมูล"
    }

    let emailValidatorResult = emailValidator(signupInformation.emailSignup);

    if (!emailValidatorResult.status) {
        errors.emailSignup = emailValidatorResult.keyMessage;
    }

    let passwordValidatorResult = passwordValidator(signupInformation.passwordSignup);

    if (!passwordValidatorResult.status) {
        errors.passwordSignup = passwordValidatorResult.keyMessage;
    }


    if (signupInformation.confirmPasswordSignup !== signupInformation.passwordSignup) {
        errors.confirmPasswordSignup = "โปรดยืนยันรหัสผ่านให้ถูกต้อง"
    }
    if (!regexExpression.regexTelephone.test(signupInformation.phoneSignup)) {
        errors.phoneSignup = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง"
    }

    return errors;
};

export default validate;
