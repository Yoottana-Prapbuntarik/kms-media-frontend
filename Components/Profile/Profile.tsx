import "./profile.scss";
import TextField from "../FieldComponents/TextField";
import { Field } from "redux-form";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { firebaseSetting } from "../../manager/firebaseSetting";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";
import Link from "next/link";
const profile = ({
  profilePresenter,
  getUserProfile,
  handleUpdateStatus,
  uploadProfileImage,
  handleUpdateProfile,
  removeBlog,
  handleUpdate,
  removeDocument,
  handleSubmit,
}: any) => {
  const [isUploadImage, setIsUploadImage] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access-token") === null) {
      Router.replace("/");
    }

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseSetting);
    }
    getUserProfile();
  }, []);

  const handleSubmitFrom = evt => {
    handleUpdateProfile(evt, profilePresenter.imageUserProfile.value);
  };

  const uploadImageCallBack = file => {
    setIsUploadImage(true);
    try {
      let storageRef = firebase.storage().ref(`user-img/${file[0].name}`);
      let resultUpload = storageRef.put(file[0]);
      resultUpload.on(
        `state_changed`,
        snapshort => {
          console.log(snapshort.bytesTransferred, snapshort.totalBytes);
        },
        () => {},
        () => {
          storageRef.getDownloadURL().then(url => {
            setIsUploadImage(false);
            uploadProfileImage(url);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    Router.push("/signin");
  };

  return (
    <div className="container mb-5">
      {profilePresenter.isUpdateMessage === "success" ||
      profilePresenter.isUpdateStatus === 200 ? (
        <SweetAlert
          custom
          success
          showCloseButton
          confirmBtnText="Ok"
          show={profilePresenter.isUpdateStatus !== null}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={"Complete"}
          onConfirm={() => handleUpdateStatus()}
        >
          {profilePresenter.isUpdateMessage}
        </SweetAlert>
      ) : (
        <SweetAlert
          custom
          danger
          showCloseButton
          confirmBtnText="Ok"
          show={profilePresenter.isUpdateStatus !== null}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={"In complete"}
          onConfirm={() => handleUpdateStatus()}
        >
          {profilePresenter.isUpdateMessage}
        </SweetAlert>
      )}
      <div className="row mx-auto">
        <div className="col-12 text-right mt-5">
          <a className="logout" onClick={() => logout()}>
            ออกจากระบบ
          </a>
        </div>
        <div className="col-12 d-flex justify-content-center mt-5">
          <div className="img-profile">
            {isUploadImage === true && (
              <div className="d-flex align-items-center h-100 justify-content-center">
                <div
                  className="spinner-grow text-primary"
                  style={{ width: "4rem", height: "4rem" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {isUploadImage === false && (
              <img
                src={
                  profilePresenter.imageUserProfile.value === ""
                    ? "/assets/images/default.png"
                    : profilePresenter.imageUserProfile.value
                }
                alt="profile image"
              />
            )}
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
          <input
            onChange={e => uploadImageCallBack(e.target.files)}
            className="d-none"
            id="change-user-image"
            type="file"
          />
        </div>
        <div className="col-12">
          <h3 className="border-bottom pb-3 text-input-profile-update  text-label">
            ข้อมูลส่วนตัว
          </h3>
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
                <label className="text-input-profile-update">
                  เบอร์โทรผู้ติดต่อ
                </label>
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
                  <button type="submit" className="btn btn-save-profile">
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        {/* Story */}
        <div className="col-12">
          <h1>Your Story</h1>
        </div>
        {profilePresenter.myBlogList.length === 0 && (
          <h5 className="mx-auto mt-5"> ไม่พบบทความ !</h5>
        )}
        {profilePresenter.myBlogList.map((item, index: number) => {
          return (
            <div className="col-12 mt-5" key={index}>
              <div className="row">
                <div className="col-lg-3 col-12">
                  <img className="w-100" src={item.cover} alt="cover" />
                </div>
                <div className="col-lg-9 col-12 border-bottom">
                  <div className="row">
                    <div className="col-lg-5 col-12 pt-0">
                      <p className="font-weight-bold">{item.title}</p>
                      <p className="text-secondary">{item.sub_title}</p>
                      <p className="text-secondary">
                        โพสเมื่อ {item.pub_date.slice(0, 10)}
                      </p>
                    </div>
                    <div className="col-lg-7 col-12 d-flex align-items-center justify-content-end">
                      <div>
                        <a
                          className="icon-manage-blog"
                          onClick={() =>
                            handleUpdate(
                              item.id,
                              item.content,
                              item.own_user.id,
                              item.cover,
                              item.title,
                              item.sub_title,
                              item.category.id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="pl-4">
                        <a
                          className="icon-manage-blog"
                          onClick={() => removeBlog(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Story */}
        <div className="col-12 mt-5">
          <h1>Your Document</h1>
        </div>
        {console.log(profilePresenter.myDocumentList)}

        {profilePresenter.myDocumentList.length === 0 ? (
          <h5 className="mx-auto mt-5"> ไม่พบเอกสาร !</h5>
        ) : (
          <div className="col-12 mt-5">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive table-borderless ">
                  <table className="table table-striped">
                    <thead>
                      <tr className="text-left">
                        <th scope="col">เลขที่เอกสาร</th>
                        <th scope="col">สถานะเอกสาร</th>
                        <th scope="col">วันที่อัพโหลด</th>
                        <th scope="col">เอกสาร</th>
                        <th scope="col">สาขาวิชา</th>
                        <th scope="col">ข้อเสนอแก้ไข</th>
                        <th scope="col">แก้ไข / ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profilePresenter.myDocumentList.map(
                        (item, index: number) => {
                          return (
                            <tr className="text-left" key={index}>
                              <th className="py-4" scope="row">
                                {item.id}
                              </th>
                              <td className={`py-4 ${item.document_status === "approve" ? "text-success" : 
                            item.document_status === "reject" ? "text-danger" : "text-warning"}`}>
                                {item.document_status.toUpperCase()}
                              </td>
                              <td className="py-4">{item.pub_date}</td>
                              <td className="py-4">
                                <Link href={item.document_file_review}>
                                  <a target="_blank">ดูตัวเอกสาร</a>
                                </Link>
                              </td>
                              <td className=" py-4">{item.department.toUpperCase()}</td>
                              <td className="py-4">
                                {item.comment === "" || item.comment == null
                                  ? "-"
                                  : item.comment}
                              </td>
                              <td className="py-4">
                                <div className="d-flex">
                                  <div className="d-flex align-items-center justify-content-center">
                                    {item.document_status !== "approve" && (
                                      <div>
                                        <Link href={`/send-document-edit/${item.template}/${item.id}`}>
                                          <a
                                            className="icon-manage-blog"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="currentColor"
                                              className="bi bi-pencil-square"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                              <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                              />
                                            </svg>
                                          </a>
                                        </Link>
                                      </div>
                                    )}
                                    <div className="pl-4">
                                      <a
                                        className="icon-manage-blog"
                                        onClick={() => removeDocument(item.id)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="currentColor"
                                          className="bi bi-trash"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                          <path
                                            fillRule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                          />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default profile;
