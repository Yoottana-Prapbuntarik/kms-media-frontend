import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { config } from "../../config-project.json";
import ReactDropzone from "../ReactDropzone/reactDropzone";
const EditorTools = ({ onSubmitWriteBlog,
    onSubmitSaveDraft,
    dataReducer,
    handleChangeTitle,
    handleChangeSubTitle,
    handleChangeCover,
    handleChangeCategory,
    writeBlogPresenter
  }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data, setData] = useState(null);

  // Get item from Draft

  const [isFetch, setIsFetch] = useState(false);
  useEffect(() => {
      let loadDraftLocalStorage = writeBlogPresenter.contentDraft;
    setData(loadDraftLocalStorage);
    if (loadDraftLocalStorage !== null) {
      let getContentFromDB = convertFromRaw(loadDraftLocalStorage);
      setEditorState(EditorState.createWithContent(getContentFromDB));
    }

    setIsFetch(false);
  }, [isFetch === true]);

  // Get item from Draft

  // current text in editor
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // // upload images and return url
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", config.UPLOAD_URL_BACKEND);
      const data = new FormData();
      data.append("file", file);
      data.append("remark", "blog");

      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const responseUrl = {
          data: { link: config.BASE_MEDIA + response.file },
        };
        resolve(responseUrl);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };
  // upload images and return url

  const handleChangeEmbed = (video) => {
    let youtubeId = video.split("https://www.youtube.com/watch?v=");
    let embed = `https://www.youtube.com/embed/${youtubeId[1]}/`;
    return embed;
  };

  const SaveToDb = (data) => () => {
    onSubmitWriteBlog(JSON.stringify(data), dataReducer.userProfile.id, writeBlogPresenter.category, 
    writeBlogPresenter.title, writeBlogPresenter.subTitle, writeBlogPresenter.imagesCover);
  };

  const SaveDraft = (data) => () => {
    onSubmitSaveDraft(data, dataReducer.userProfile.id, writeBlogPresenter.imagesCover, writeBlogPresenter.title, writeBlogPresenter.subTitle, writeBlogPresenter.category);
    setIsFetch(true);
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={SaveDraft(convertToRaw(editorState.getCurrentContent()))}
          >
            Save Draft
          </button>
          <button
            className="btn btn-primary ml-2"
            onClick={SaveToDb(convertToRaw(editorState.getCurrentContent()))}
          >
            Publish
          </button>
        </div>

        <div className="col-12 my-3">
          <ReactDropzone
            currentImages={writeBlogPresenter}
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
            value={writeBlogPresenter.title}
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
            value={writeBlogPresenter.subTitle}
            placeholder={"Write your sub title"}
            onChange={(e) => handleChangeSubTitle(e.target.value)}
          />
        </div>

        <div className="col-12 my-3">
          <label htmlFor="category">Select your category</label>
          <select 
          name="category" 
          value={writeBlogPresenter.category}
          onChange={(e)=> handleChangeCategory(e.target.value)}
          className="form-control" 
          id="category">
            <option value={parseInt(0)}>Select your category</option>
            {
              writeBlogPresenter.categoryList.category && 
              writeBlogPresenter.categoryList.category.map((item,index)=> {
                 return (<option key={index} value={item.id}>{item.name}</option> )
              })
            }
            
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
                "inline",
                "textAlign",
                "blockType",
                'fontSize',
                "colorPicker",
                "link",
                "image",
                "embedded",
                "history",
              ],
              inline: {
                options: [
                  "bold",
                  "italic",
                  "monospace",
                  "superscript",
                  "subscript",
                ],
              },
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
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
      </div>
    </div>
  );
};

export default EditorTools;
