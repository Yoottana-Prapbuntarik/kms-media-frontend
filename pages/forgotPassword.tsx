import MainLayout from "../layouts/MainLayout";
import { sendEmail } from "../apis/Services/passwordModules";
import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const submitEmail = (e) => {
        e.preventDefault();
        let response = sendEmail(email)
        response.then((res)=> {
            alert("Please check your email !")
            Router.replace("/")
        })
    }
    return (
        <MainLayout>
            <Head>
                <title>
                    KMS MEDIA | Reset password
        </title>
            </Head>
            <div className="container mt-5">
                <h1 className="text-center mb-5">
                    ลืมรหัสผ่าน
                </h1>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={(e) => submitEmail(e)}>
                            <div className="row mx-auto">
                                <div className="col-lg-6 col-12">
                                    <img src="/assets/images/forgotpassword.jpg" className="w-100" alt="forgot password" />
                                </div>
                                <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-12 p-0">
                                        <label>อีเมล์</label>
                                        <input className="form-control" type="text" placeholder="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                                        <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary mt-5" >
                                            ส่งอีเมล์
                                        </button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>

    )
}

export default ForgotPassword;