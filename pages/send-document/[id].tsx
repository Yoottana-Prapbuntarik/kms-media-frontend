require("isomorphic-fetch");
import { uploadDocument } from "../../apis/Services/uploadDocument";
import { Tab, Tabs } from "react-bootstrap";
import { env } from "../../config-project.json";
import MainLayout from "../../layouts/MainLayout";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import SweetAlert from "react-bootstrap-sweetalert";
import "../css/send-file.scss";
import FileUpload from "../../Components/ReactDropzone/FileUpload";
import { connect } from "react-redux";
const ManageDocument = ({ data, presenter }: any) => {
  const [documents, setDocument] = useState([]);
  const [isEcception, setIsEcception] = useState(false);
  const [file, setFile] = useState([]);
  const [uploadInformation, setUploadInformation] = useState({
    fullname: "",
    stdCode: "",
  });

  const [popup, setPopup] = useState({
    show: null,
    msg: "",
  });

  const [key, setKey] = useState("description");

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("access-token");
    if (isLoggedIn === null) {
      setIsEcception(true);
    }
    setDocument(data);
  }, []);

  const closePopup = () => {
    Router.push("/signin");
    setIsEcception(false);
  };

  const addFiles = file => {
    setFile(file);
  };

  const onSubmitUploadDocument = event => {
    event.preventDefault();
    if (
      file.length == 0 ||
      uploadInformation.fullname.length == 0 ||
      uploadInformation.stdCode.length == 0
    ) {
      setPopup({
        show: "failed",
        msg: "Please complete the form.",
      });
    } else {
      return new Promise((resolve,reject)=> {
        resolve(uploadDocument(
          presenter.signinComponentReducer.userProfile.id,
          documents[0].document_type.id,
          uploadInformation.fullname,
          uploadInformation.stdCode,
          "waiting",
          file,
          documents[0].id
        ))
      }).then(()=>{ 
        setPopup({
          show: "success",
          msg: "Upload your document successfully.",
        });
        setUploadInformation({
          fullname: "",
          stdCode: ""
        })
        setFile([])
      })
    }
  };

  return (
    <MainLayout>
      <SweetAlert
        custom
        danger
        showCloseButton
        confirmBtnText="Ok"
        show={isEcception}
        confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
        cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
        title={"In complete"}
        onConfirm={() => closePopup()}
      >
        You are not logged in.
      </SweetAlert>
      <Head>
        <title>
          {documents.length !== 0 && documents[0].document_type.document_name}
        </title>
      </Head>
    {console.log(documents)}
      <div className="container-fluid mx-5  my-5">
        <SweetAlert
          custom
          success
          showCloseButton
          confirmBtnText="Agree"
          show={popup.show === "success"}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={"Complete"}
          onConfirm={() => setPopup({ ...popup, show: false })}
        >
          {popup.msg}
        </SweetAlert>
        <SweetAlert
          custom
          danger
          showCloseButton
          confirmBtnText="Agree"
          show={popup.show === "failed"}
          confirmBtnBsStyle="btn bg-primary w-25 text-white mt-5"
          cancelBtnBsStyle="btn bg-danger w-25 text-white mt-5"
          title={"Incomplete"}
          onConfirm={() => setPopup({ ...popup, show: false })}
        >
          {popup.msg}
        </SweetAlert>
        <h1 className="text-center mt-3 mb-5">
          {documents.length !== 0 && documents[0].document_type.document_name}
        </h1>
        <div className="row mt-5">
          {key === "description" ? (
            <div className="col-lg-6  col-12 text-center">
              {/* cover */}
              <img
                className={
                  documents.length !== 0 && documents[0].department !== "mmda"
                    ? "w-100"
                    : "w-50"
                }
                src={`/assets/images/logo/department-color/${
                  documents.length !== 0 && documents[0].department
                }.png`}
                alt=""
              />
            </div>
          ) : (
            <div className="col-lg-6 col-12 upload-wrapper text-center vh-100 align-items-center justify-content-center mt-5 d-flex w-100">
              <FileUpload pdfPreview={file} pdfCallback={addFiles} />
            </div>
          )}

          <div className="col-lg-6 px-5 col-12 pt-5 custom-tab">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={k => setKey(k)}
            >
              <Tab tabClassName="text-dark" eventKey="upload" title="Upload">
                <div className="pt-3">
                  <form onSubmit={onSubmitUploadDocument}>
                    <div className="py-3 row">
                      <div className="col-12 mt-3">
                        <label htmlFor="name">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          onChange={e =>
                            setUploadInformation({
                              ...uploadInformation,
                              fullname: e.target.value,
                            })
                          }
                          value={uploadInformation.fullname}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <label htmlFor="studentId">Student id</label>
                        <input
                          className="form-control"
                          type="text"
                          id="studentId"
                          onChange={e =>
                            setUploadInformation({
                              ...uploadInformation,
                              stdCode: e.target.value,
                            })
                          }
                          value={uploadInformation.stdCode}
                        />
                      </div>
                      <div className="col-12 d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-upload-file">
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Tab>
              <Tab
                tabClassName="text-dark"
                eventKey="description"
                title="Description"
              >
                <div className="pt-3">
                  <h5 className=" py-3">Description</h5>
                  <p className="text-secondary">
                    {documents.length !== 0 && documents[0].description}
                  </p>
                  <p className="mt-5 text-dark font-weight-bold">file</p>
                  <Link
                    href={`${
                      documents.length !== 0 && documents[0].document_file
                    }`}
                  >
                    <a target="_blank" className="d-inline-block">
                      <div className="d-flex align-items-center">
                        <div className="d-block pr-4">
                          <img
                            width="37px"
                            src="/assets/images/file.png"
                            alt="img-file"
                          />
                        </div>
                        <span className="text-green-dark">
                          {documents.length !== 0 &&
                            documents[0].document_type.document_name}
                          {".pdf"}
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

ManageDocument.getInitialProps = async ({ query }) => {
  const res = await fetch(`${env.BASE_API}template/find/${query.id}`);
  const data = await res.json();
  const jsonData = data;
  return {
    data: jsonData,
  };
};

const mapStateToProps = state => {
  return { presenter: state };
}

export default connect(mapStateToProps)(ManageDocument)
