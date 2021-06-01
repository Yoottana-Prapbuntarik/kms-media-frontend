import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import { changePasswordAPI } from "../../apis/Services/passwordModules";
import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

const ChangePassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState({
        password: "",
        confirm: ""
    })
    const submitEmail = (e) => {
        let token = router.query.token
        e.preventDefault();
        if(password.password !== password.confirm) {
            alert("Please confirm password again !")
        }else{
            let response = changePasswordAPI(password.password, token.toString())
            response.then((res) => {
                if(res['status'] === 200 || res['status'] === 201) {
                    alert("Change password Successully !")
                    Router.replace("/")
                }else{
                    alert(res['data']['password'].toString())
                }
            })
        }
    }
    return (
        <MainLayout className="min-vh-100">
            <Head>
                <title>
                    เปลี่ยนรหัสผ่านใหม่
                </title>
            </Head>
            <div className="container mt-5">
                <h1 className="text-center mb-5">
                    รหัสผ่านใหม่
                </h1>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={(e) => submitEmail(e)}>
                            <div className="row mx-auto">
                                <div className="col-lg-6 col-12">
                                    <img src="/assets/images/changepassword.jpg" className="w-100" alt="forgot password" />
                                </div>
                                <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-12 p-0">
                                        <label>รหัสผ่านใหม่</label>
                                        <input className="form-control" type="password" placeholder="รหัสผ่านใหม่" value={password.password}
                                            onChange={(e) => setPassword({
                                                ...password,
                                                password: e.target.value
                                            })} required />
                                       
                                        <label className="mt-5">ยืนยันผ่านใหม่</label>
                                        <input className="form-control" type="password" placeholder="รหัสผ่านใหม่" value={password.confirm}
                                            onChange={(e) => setPassword({
                                                ...password,
                                                confirm: e.target.value
                                            })} required />

                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-primary mt-5" >
                                                เปลี่ยนรหัสผ่าน
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
    );
};

export default ChangePassword;