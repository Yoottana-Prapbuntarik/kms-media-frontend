import { serviceToken } from "../baseAPI";

export const uploadDocument = async (
  user: any,
  documentType:any,
  studentName:any,
  studentCode:any,
  documentStatus:any,
  documentFileReview:any,
  template
  ) => {
  let dataAPI = [];
  await serviceToken({
    method: "post",
    url: `document`,
    data: {
      user: user,
      document_type: documentType,
      student_name: studentName,
      student_code: studentCode,
      document_status: documentStatus,
      document_file_review: documentFileReview,
      template: template
    },
  })
    .then(response => {
      if (response) {
        dataAPI = response.data;
      }
    })
    .catch(err => {
      dataAPI = err.response.data;
    });
  return dataAPI;
};

export const updateUploadDocument = async (
  idEdit: any,
  user: any,
  documentType:any,
  studentName:any,
  studentCode:any,
  documentStatus:any,
  documentFileReview:any,
  template,
  ) => {
  let dataAPI = [];
  await serviceToken({
    method: "put",
    url: `template/update/${idEdit}`,
    data: {
      user: user,
      document_type: documentType,
      student_name: studentName,
      student_code: studentCode,
      document_status: documentStatus,
      document_file_review: documentFileReview,
      template: template,
      comment: ""
    },
  })
    .then(response => {
      if (response) {
        dataAPI = response.data;
      }
    })
    .catch(err => {
      dataAPI = err.response.data;
    });
  return dataAPI;
};
