import "./profile.scss";
import TextField from "../FieldComponents/TextField";
import { Field } from "redux-form";
import { useEffect } from "react";
import firebase from "firebase";
import { firebaseSetting } from "../../manager/firebaseSetting";
import SweetAlert from "react-bootstrap-sweetalert";

const profile = ({ profilePresenter, getUserProfile,  handleUpdateStatus, uploadProfileImage, handleUpdateProfile, handleSubmit }: any) => {
    useEffect(() => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseSetting);
        }
        getUserProfile()
    }, [])


    const handleSubmitFrom = (evt) => {
        handleUpdateProfile(evt, profilePresenter.imageUserProfile.value)
    }

    const uploadImageCallBack = (file) => {
        console.log(file[0]);
        let storageRef = firebase.storage().ref(`user-img/${file[0].name}`);
        let resultUpload = storageRef.put(file[0]);
        resultUpload.on(
            `state_changed`,
            (snapshort) => {
                console.log(snapshort.bytesTransferred, snapshort.totalBytes);
            },
            () => { }, () => {
                storageRef.getDownloadURL().then((url) => {
                    uploadProfileImage(url)
                });
            }
        );
    };

    return (
        <div className="container mb-5">
            {profilePresenter.isUpdateMessage === "success" || profilePresenter.isUpdateStatus === 200 ?
                < SweetAlert
                    custom
                    success
                    showCloseButton
                    confirmBtnText="Ok"
                    show={profilePresenter.isUpdateStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={profilePresenter.isUpdateMessage}
                    onConfirm={() => handleUpdateStatus()}
                >
                </SweetAlert>
                :
                < SweetAlert
                    custom
                    danger
                    showCloseButton
                    confirmBtnText="Ok"
                    show={profilePresenter.isUpdateStatus !== null}
                    confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
                    cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
                    title={profilePresenter.isUpdateMessage}
                    onConfirm={() => handleUpdateStatus()}
                >
                </SweetAlert>
                }
            <div className="row mx-auto">
                <div className="col-12 d-flex justify-content-center mt-5">
                    <div className="img-profile">
                        <img
                            src={profilePresenter.imageUserProfile.value === "" ? "/assets/images/default.png" : profilePresenter.imageUserProfile.value}
                            alt="profile image"
                        />
                    </div>
                    <div className="wrapper-change-user-image">
                        <label className="change-user-image" htmlFor="change-user-image">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="currentColor"
                                className="bi bi-camera"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg>
                        </label>
                    </div>
                    <input onChange={(e) => uploadImageCallBack(e.target.files)} className="d-none" id="change-user-image" type="file" />
                </div>
                <div className="col-12">
                    <h3 className="border-bottom pb-3 text-input-profile-update  text-label">ข้อมูลส่วนตัว</h3>
                    <form onSubmit={handleSubmit(handleSubmitFrom)}>
                        <div className="row">
                            <div className="col-lg-6 col-12 mt-3">
                                <label className="text-input-profile-update">ชื่อจริง</label>
                                <Field
                                    name={profilePresenter.firstNameProfile.name}
                                    type="text"
                                    styleTextError="text-danger"
                                    component={TextField}
                                    className="form-control w-100  mt-3 py-4"
                                    label={""}
                                />

                            </div>
                            <div className="col-lg-6 col-12 mt-3">
                                <label className="text-input-profile-update">นามสกุล</label>
                                <Field
                                    name={profilePresenter.lastNameProfile.name}
                                    type="text"
                                    styleTextError="text-danger"
                                    component={TextField}
                                    className="form-control w-100  mt-3 py-4"
                                    label={""}
                                />
                            </div>
                            <div className="col-lg-6 col-12 mt-3">
                                <label className="text-input-profile-update">เบอร์โทรผู้ติดต่อ</label>
                                <Field
                                    name={profilePresenter.mobileProfile.name}
                                    type="text"
                                    styleTextError="text-danger"
                                    component={TextField}
                                    className="form-control w-100  mt-3 py-4"
                                    label={""}
                                />
                            </div>
                            <div className="col-12 mt-5">
                                {/* <h3 className="border-bottom pb-3 text-label text-input-profile-update">เปลี่ยนรหัสผ่าน</h3> */}
                                {/* <div className="row">
                                    <div className="col-lg-6 col-12 mt-3">
                                        <label className="text-input-profile-update">รหัสผ่านเก่า</label>
                                        <input type="password" className="form-control w-100 mt-3" />
                                    </div>
                                    <div className="col-lg-6 col-12 mt-3">
                                        <label className="text-input-profile-update">รหัสผ่านใหม่</label>
                                        <input type="password" className="form-control w-100 mt-3" />
                                    </div>
                                    <div className="col-lg-6 col-12 mt-3">
                                        <label className="text-input-profile-update">ยืนยัน</label>
                                        <input type="password" className=" text-input-profile-update form-control w-100 mt-3" />
                                    </div>
                                </div> */}
                                <div className="col-lg-3 col-12 mt-5 ml-auto  text-white">
                                    <button type="submit" className="btn btn-save-profile">บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default profile;
