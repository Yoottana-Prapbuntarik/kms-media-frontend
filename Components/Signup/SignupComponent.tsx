import Link from "next/link";
import { Field } from "redux-form";
import ButtonSubmit from "../FieldComponents/ButtonSubmit";
import TextField from "../FieldComponents/TextField";
import "./signup.scss";

const SignupComponent = ({
    signupComponentPresenter,
    handleSubmit,
    submitSignup,
    handleChangeFirstNameSignup,
    handleChangeLastNameSignup,
    handleChangePhoneSignup,
    handleChangeEmailSignup,
    handleChangePasswordSignup,
    handleChangeConfirmPasswordSignup
}: any) => {
    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-lg-6 col-12">
                    <div className="d-flex w-100 justify-content-center flex-column align-items-center">
                        <h1 className="text-left">{signupComponentPresenter.titleSignup}</h1>
                        <div className="mt-2">
                            <form onSubmit={handleSubmit(submitSignup)}>
                                <div className="container-fluid p-5 w-100 wrapper-signup">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.firstNameSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.firstNameSignup.name}
                                                type="text"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="mb-2 p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.firstNameSignup.valueFirstNameSignup}
                                                label={signupComponentPresenter.firstNameSignup.placeholder}
                                                onChange={(event: any) => handleChangeFirstNameSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.lastNameSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.lastNameSignup.name}
                                                type="text"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="mb-2 p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.lastNameSignup.valueLastNameSignup}
                                                label={signupComponentPresenter.lastNameSignup.placeholder}
                                                onChange={(event: any) => handleChangeLastNameSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.phoneSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.phoneSignup.name}
                                                type="text"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="mb-2 p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.phoneSignup.valuePhoneSignup}
                                                label={signupComponentPresenter.phoneSignup.placeholder}
                                                onChange={(event: any) => handleChangePhoneSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.emailSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.emailSignup.name}
                                                type="text"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="mb-2 p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.emailSignup.valueEmailSignup}
                                                label={signupComponentPresenter.emailSignup.placeholder}
                                                onChange={(event: any) => handleChangeEmailSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.passwordSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.passwordSignup.name}
                                                type="password"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.passwordSignup.valuepasswordSignup}
                                                label={signupComponentPresenter.passwordSignup.placeholder}
                                                onChange={(event: any) => handleChangePasswordSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <label>{signupComponentPresenter.confirmPasswordSignup.placeholder}</label>
                                            <Field
                                                name={signupComponentPresenter.confirmPasswordSignup.name}
                                                type="password"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="p-2 text-field-signin"
                                                currentValue={signupComponentPresenter.confirmPasswordSignup.valueConfirmPasswordSignup}
                                                label={signupComponentPresenter.confirmPasswordSignup.placeholder}
                                                onChange={(event: any) => handleChangeConfirmPasswordSignup(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-9 mt-3">
                                            <Field
                                                name="submit"
                                                type="submit"
                                                style="w-100 text-white mt-2 btn-signin bg-green-dark"
                                                component={ButtonSubmit}
                                                label={signupComponentPresenter.buttonSignup}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-12 mt-5">
                                            <div className="underline"></div>
                                        </div>
                                        <div className="col-lg-9 col-12 mt-3 text-center text-muted">
                                            have an account yet ?<Link href="/signin">
                                                <a className="pl-3 text-dark">
                                                    Sign In
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-12 bg-light-blue h-100  align-items-center d-none d-lg-flex d-xl-flex">
                    <img
                        className="w-100"
                        src={signupComponentPresenter.imageSignup}
                        alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignupComponent