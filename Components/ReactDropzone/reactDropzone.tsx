import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import "./react-dropzone-styles.scss";
import { config } from "../../config-project.json";

const ReactDropzone = ({ handleChangeCover, currentImages }) => {
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


    // // upload images and return url
    const uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", config.UPLOAD_URL_BACKEND);
            const data = new FormData();
            data.append("file", file[0]);
            data.append("remark", "blog");

            xhr.send(data);
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText);
                const responseUrl = {
                    data: { link: config.BASE_MEDIA + response.file },
                };
                handleChangeCover(responseUrl)
                resolve(responseUrl);
            });
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });
    };

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
                    <h5 className="text-center">
                        Cover
                    </h5>
                    <br />
                    <p className="lead">Upload | Drag and Drop</p>
                </div>
            </div>
            <div>{images.length !== 0 ? images :
                currentImages.imagesCover !== "" ?
                    <img src={currentImages.imagesCover} style={{ width: "100%", display: "block", margin: "0 auto" }} alt="preview" /> :
                    ""
            }</div>
        </section>
    )
}

export default ReactDropzone