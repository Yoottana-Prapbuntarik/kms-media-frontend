require("isomorphic-fetch");
import { Tab, Tabs } from "react-bootstrap";
import { env } from "../../config-project.json";
import MainLayout from "../../layouts/MainLayout";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
const ManageDocument = ({ data }: any) => {
  const [documents, setDocument] = useState([]);
  const [key, setKey] = useState("description");

  useEffect(() => {
    setDocument(data);
  }, []);
  return (
    <MainLayout>
      <Head>
        <title>
          {documents.length !== 0 && documents[0].document_type.document_name}
        </title>
      </Head>

      <div className="container-fluid mx-5 my-5">
        {console.log(data)}
        <h1 className="text-center mt-3 mb-5">
          {/* {documents.length !== 0 && documents[0].document_type.document_name} */}
        </h1>
        <div className="row mt-5">
          {key === "description" ? (
            <div className="col-lg-6 col-12 text-center pt-5">
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
            <div className="col-lg-6 col-12 text-center pt-5">
                {/* uplaod */}
                Drag drop
            </div>
          )}

          <div className="col-lg-6 col-12 pt-5">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={k => setKey(k)}
            >
              <Tab tabClassName="text-dark" eventKey="upload" title="Upload">
                <div className="pt-3">
                  <h5 className=" py-3">Upload</h5>
                </div>
              </Tab>
              <Tab
                tabClassName="text-dark"
                eventKey="description"
                title="Description"
              >
                <div className="pt-3">
                  <h5 className=" py-3">Description</h5>
                  <p>
                    {documents.length !== 0 && documents[0].description}
                  </p>
                  <Link href={`${documents.length !== 0 && documents[0].document_file}`}>
                    <a  target="_blank">
                    {documents.length !== 0 && documents[0].document_type.document_name}
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
export default ManageDocument;
