import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import "./react-dropzone-styles.scss";
import firebase from "firebase"
import { firebaseSetting } from "../../manager/firebaseSetting";
const ReactDropzone = ({ handleChangeCover, currentImages }) => {

    useEffect(()=> {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseSetting) 
        }
    },[])
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
            uploadImageCallBack(acceptedFiles)
        },
    })



    const uploadImageCallBack = (acceptedFile) => {
        let storageRef = firebase.storage().ref(`cover/${acceptedFile[0].name}`);
        let resultUpload = storageRef.put(acceptedFile[0])
        resultUpload.on(`state_changed`, (snapshort) => { console.log(snapshort.bytesTransferred, snapshort.totalBytes) }, (() => {
        }), () => {
            storageRef.getDownloadURL().then((url) => { handleChangeCover(url) })
        })
    }

    const images = files.map((file): any => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "100%", display: "block", margin: "0 auto" }} alt="preview" />
            </div>
        </div>
    ))

    return (
        <section>
            <div {...getRootProps()} className="border d-flex align-items-center justify-content-center my-5">
                <div className="d-block padding-dropzone">
                    <input {...getInputProps()} />
                    <div>{images.length !== 0 ? images :
                        currentImages.imagesCover !== "" ?
                            <img src={currentImages.imagesCover} style={{ width: "100%", display: "block", margin: "0 auto" }} alt="preview" />
                            :
                            ""
                    }</div>
                    <h5 className="text-center mt-5">
                        Cover Image
                    </h5>
                    <br />
                    <p className="lead text-center">Upload | Drag and Drop</p>
                </div>
            </div>
        </section>
    )
}

export default ReactDropzone