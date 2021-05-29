import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./react-dropzone-styles.scss";
import firebase from "firebase";
import { firebaseSetting } from "../../manager/firebaseSetting";
const ReactDropzone = ({ pdfCallback, pdfPreview }) => {
  const [isUploading, setIsUploading] = useState(false)
  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseSetting);
    }
  }, []);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    onDrop: acceptedFiles => {
        try {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      uploadImageCallBack(acceptedFiles);
    } catch (error) {console.log(error)}
    },
  });

  const uploadImageCallBack = acceptedFile => {
    setIsUploading(true)
    acceptedFile[0].name;
    console.log(`acceptedFile `, acceptedFile[0].name);
    let storageRef = firebase
      .storage()
      .ref(`document-review/${acceptedFile[0].name}`);
    let resultUpload = storageRef.put(acceptedFile[0]);
    resultUpload.on(
      `state_changed`,
      snapshort => {
        console.log(snapshort.bytesTransferred, snapshort.totalBytes);
      },
      () => {},
      () => {
        storageRef.getDownloadURL().then(url => {
          setIsUploading(false)
          pdfCallback(url);
        });
      }
    );
  };

  return (
    <section className="h-100 align-items-center d-flex">
      <input  id="uploadfile" {...getInputProps()} />
      <div
        {...getRootProps()}
        className="d-flex align-items-center justify-content-center my-5 w-100"
      >
        {
          isUploading === true &&
          <div className="d-flex align-items-center h-100 justify-content-center">
          <div
              className="spinner-grow text-success mx-2"
              style={{ width: "2rem", height: "2rem"}}
              role="status"
          >
              <span className="sr-only">Loading...</span>
          </div>
          <div
              className="spinner-grow text-warning mx-2"
              style={{ width: "2rem", height: "2rem"}}
              role="status"
          >
              <span className="sr-only">Loading...</span>
          </div>
          <div
              className="spinner-grow text-primary mx-2"
              style={{ width: "2rem", height: "2rem"}}
              role="status"
          >
              <span className="sr-only">Loading...</span>
          </div>
      </div>
        }
        {pdfPreview.length > 0 && isUploading === false && (
          <div className="d-flex align-items-start text-left ">
            <div className="text-upload-success rounded p-2">{pdfPreview}</div>
          </div>
        )}
        {pdfPreview.length === 0 && isUploading === false && (
          <div className="d-block">
            <div  className="d-flex align-items-center text-left">
              <h5>Upload | Drag your files</h5>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReactDropzone;
