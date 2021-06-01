import React, { useEffect, useState } from "react";
import "./editor.scss";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import firebase from "firebase";
import ReactDropzone from "../ReactDropzone/reactDropzone";
const EditUpdate = ({
  onSubmitWriteBlog,
  dataReducer,
  handleChangeTitle,
  handleChangeSubTitle,
  handleChangeCover,
  handleChangeCategory,
  editwriteBlogPresenter,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data, setData] = useState(null);

  useEffect(() => {
    let loadDraftLocalStorage = editwriteBlogPresenter.contentDraft;
    if(loadDraftLocalStorage !== null) {
      loadDraftLocalStorage = JSON.parse(loadDraftLocalStorage)
    }
    console.log(loadDraftLocalStorage)
    setData(loadDraftLocalStorage);
    if (
      loadDraftLocalStorage !== null &&
      loadDraftLocalStorage !== "" &&
      loadDraftLocalStorage !== undefined
    ) {
      let getContentFromDB = convertFromRaw(loadDraftLocalStorage);
      setEditorState(EditorState.createWithContent(getContentFromDB));
    }
  }, [editwriteBlogPresenter.contentDraft]);

  // Get item from Draft

  // current text in editor
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // // upload images and return url
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`blog/${file.name}`);
      let resultUpload = storageRef.put(file);
      resultUpload.on(
        `state_changed`,
        (snapshort) => {
          console.log(snapshort.bytesTransferred, snapshort.totalBytes);
        },
        () => {
  
        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            const responseUrl = {
              data: { link: url },
            };
            resolve(responseUrl);
          });
        }
      );
    });
  };

  const handleChangeEmbed = (video) => {
    let youtubeId = video.split("https://www.youtube.com/watch?v=");
    let embed = `https://www.youtube.com/embed/${youtubeId[1]}/`;
    return embed;
  };

  const SaveToDb = (data) => () => {
    onSubmitWriteBlog(
      JSON.stringify(data),
      dataReducer.userProfile.id,
      editwriteBlogPresenter.categoryEdit,
      editwriteBlogPresenter.titleEdit,
      editwriteBlogPresenter.subTitleEdit,
      editwriteBlogPresenter.imagesCover
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 my-3">
          <ReactDropzone
            currentImages={editwriteBlogPresenter}
            handleChangeCover={handleChangeCover}
          />
        </div>
        <div className="col-12 my-5 demo-content">
          <ReactMarkdownWithHtml
            children={draftToMarkdown(
              convertToRaw(editorState.getCurrentContent())
            )}
            allowDangerousHtml={true}
          />
        </div>

        <div className="col-12 my-3">
          <label htmlFor="title">Write your title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder={"Title"}
            value={editwriteBlogPresenter.titleEdit}
            onChange={(e) => handleChangeTitle(e.target.value)}
          />
        </div>

        <div className="col-12 my-3">
          <label htmlFor="subTitle">Write your sub title</label>
          <textarea
            id="subTitle"
            rows={8}
            type="text"
            className="form-control"
            value={editwriteBlogPresenter.subTitleEdit}
            placeholder={"Write your sub title"}
            onChange={(e) => handleChangeSubTitle(e.target.value)}
          />
        </div>

        <div className="col-12 my-3">
          <label htmlFor="category">Select your category</label>
          <select
            name="category"
            value={editwriteBlogPresenter.categoryEdit}
            onChange={(e) => handleChangeCategory(e.target.value)}
            className="form-control"
            id="category"
          >
            <option value={parseInt(0)}>Select your category</option>
            {editwriteBlogPresenter.categoryListEdit.category &&
              editwriteBlogPresenter.categoryListEdit.category.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-12 my-5">
          <Editor
            handlePastedText={() => false}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(e) => onEditorStateChange(e)}
            toolbar={{
              options: [
                "textAlign",
                "blockType",
                "fontSize",
                "link",
                "image",
                "embedded",
                "history",
              ],

              blockType: {
                inDropdown: true,
                options: [
                  "Normal",
                  "H1",
                  "H2",
                  "H3",
                  "H4",
                  "H5",
                  "Blockquote",
                ],
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
              },
              image: {
                defaultSize: {
                  height: "auto",
                  width: "100%",
                },
                uploadEnabled: true,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                uploadCallback: (e) => uploadImageCallBack(e),
                alt: { present: false, mandatory: false },
              },

              embedded: {
                className: "",
                component: undefined,
                popupClassName: undefined,
                embedCallback: (e) => handleChangeEmbed(e),
                defaultSize: {
                  width: "100%",
                },
              },
            }}
          />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-primary ml-2"
            onClick={SaveToDb(convertToRaw(editorState.getCurrentContent()))}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUpdate;
