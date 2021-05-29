import "../css/page-file.scss";
require("isomorphic-fetch");
import { env } from "../../config-project.json";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import Head from "next/head";
import Link from "next/link";
import { Department } from "../../manager/Department";
import { useEffect, useState } from "react";
import Router from "next/router";
import SweetAlert from "react-bootstrap-sweetalert";
const ProductType = ({ data }: any) => {
  const router = useRouter();
  const [documents, setDocument] = useState([]);
  const [isEcception, setIsEcception] = useState(false);
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("access-token");
    if (isLoggedIn === null) {
      setIsEcception(true);
    }

    setDocument(data);
  }, []);
  const closePopup = () => {
    setIsEcception(false);
    Router.push("/signin");
  };
  return (
    <MainLayout className="min-vh-100">
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
        <title>{Department[`${router.query.slug}`]}</title>
      </Head>
      <div className="container-fluid mt-5 mx-5 upload-file">
        <h1 className="text-center my-5">
          <h1 className="mb-5 mx-auto">{Department[`${router.query.slug}`]}</h1>
        </h1>
        <div className="row  my-5">
          {documents.length !== 0 ? (
            documents.map((item, index: number) => {
              return (
                <div className="col-lg-4 col-md-6 col-12 mt-5" key={index}>
                  <Link href={`/send-document/${item.id}`}>
                    <a>
                      <div
                        className={`bg-${router.query.slug} p-5 d-flex align-items-end`}
                        style={{
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                        }}
                      >
                        <h1 className="text-white font-36px text-wrap">
                          {item.document_type.document_name}
                        </h1>
                      </div>
                    </a>
                  </Link>
                  <div
                    className="px-3 bg-gray-light py-3 d-flex justify-content-end"
                    style={{
                      borderBottomLeftRadius: "15px",
                      borderBottomRightRadius: "15px",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <h4 className="text-secondary">Semester</h4>
                      <h4 className="text-dark">2/2021</h4>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12 mx-auto my-5">
                  <div className="d-block">
                    <img
                      src="/assets/images/no-content.PNG"
                      alt="not found"
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-12 text-center">
                  <h5 className="text-center">ยังไม่พบเอกสาร</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

ProductType.getInitialProps = async ({ query }) => {
  const res = await fetch(`${env.BASE_API}template/${query.slug}`);
  const data = await res.json();
  const jsonData = data;
  return {
    data: jsonData,
  };
};
export default ProductType;
