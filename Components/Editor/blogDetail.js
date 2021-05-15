import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import "./blog-detail.scss";

const previewProductDetail = ({ detailBlog }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    let loadDraftLocalStorage = detailBlog;
    if (detailBlog !== null && detailBlog !== "") {
      let getContentFromDB = convertFromRaw(loadDraftLocalStorage);
      setEditorState(EditorState.createWithContent(getContentFromDB));
    }
  }, [detailBlog]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 my-5 demo-content">
          <ReactMarkdownWithHtml
            children={draftToMarkdown(
              convertToRaw(editorState.getCurrentContent())
            )}
            allowDangerousHtml={true}
          />
        </div>
      </div>
    </div>
  );
};

export default previewProductDetail;
