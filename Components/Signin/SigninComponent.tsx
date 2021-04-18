import { Field } from "redux-form";
import ButtonSubmit from "../FieldComponents/ButtonSubmit";
import TextField from "../FieldComponents/TextField";
import Link from "next/link";
import "./signin.scss";
import { useEffect } from "react";
import Router from "next/router"
import SweetAlert from 'react-bootstrap-sweetalert'

const SigninComponent = ({ signinComponentPresenter,
    handleSubmit,
    submitSignin,
    handleChangePassword,
    handleChangeEmail,
    getUserData,
    IsAsknowledge
}: any) => {
    useEffect(() => {

        if (localStorage.getItem("access-token") !== "" &&
            localStorage.getItem("access-token") !== null) {
            getUserData()
            Router.push("/")
        }
    }, [signinComponentPresenter])
    
    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center">
                {
                    signinComponentPresenter.isSignin === 400 ?
                        <SweetAlert
                            custom
                            danger
                            showCloseButton
                            confirmBtnText="Ok"
                            show={signinComponentPresenter.isSignin !== null}
                            confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                            cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                            title={signinComponentPresenter.isSigninMessage}
                            onConfirm={() => IsAsknowledge(null)}
                        >
                        </SweetAlert>
                        :
                        ""

                }
                <div className="col-xl-6 col-12">
                    <div className="d-flex w-100 justify-content-center flex-column align-items-center">
                        <h1 className="text-left pt-5">{signinComponentPresenter.titleSignin}</h1>
                        <div className="mt-2">
                            <form onSubmit={handleSubmit(submitSignin)}>
                                <div className="container p-5 w-100 wrapper-signin">
                                    <div className="row justify-content-center">
                                        <div className="col-10">
                                            <Field
                                                name={signinComponentPresenter.emailSignin.name}
                                                type="text"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="mb-2 p-2 text-field-signin"
                                                currentValue={signinComponentPresenter.emailSignin.valueEmailSignin}
                                                label={signinComponentPresenter.emailSignin.placeholder}
                                                onChange={(event: any) => handleChangeEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-10">
                                            <Field
                                                name={signinComponentPresenter.passwordSignin.name}
                                                type="password"
                                                styleTextError="text-danger"
                                                component={TextField}
                                                className="p-2 text-field-signin"
                                                currentValue={signinComponentPresenter.passwordSignin.valuePasswordSignin}
                                                label={signinComponentPresenter.passwordSignin.placeholder}
                                                onChange={(event: any) => handleChangePassword(event.target.value)}
                                            />
                                        </div>

                                        <div className="col-10 text-right my-3">
                                            <Link href="/forgotPassword">
                                                <a>
                                                    {signinComponentPresenter.forgotPassword}
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="col-10 mb-5">
                                            <Field
                                                name="submit"
                                                type="submit"
                                                style="w-100 text-white mt-2 btn-signin bg-green-dark"
                                                component={ButtonSubmit}
                                                label={signinComponentPresenter.labelSignin}
                                            />
                                        </div>
                                        <div className="col-10 mb-3">
                                            <div className="underline"></div>
                                        </div>
                                        <div className="col-10 text-center text-muted">
                                            Don’t have an account yet ?
                                        <Link href="/signup">
                                                <a className="text-dark pl-3">
                                                    Sign Up
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-12 bg-light-blue h-100  align-items-center d-none d-xl-flex d-xl-flex">
                    <img
                        className="w-100"
                        src={signinComponentPresenter.imageSignin}
                        alt="" />
                </div>
            </div>
        </div>
    )
}

export default SigninComponent
