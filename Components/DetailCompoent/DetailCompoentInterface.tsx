export interface CommentField {
    name: string;
    value: string;
}
export interface DetailCompoentPresenter {
    titleDetail: string;
    author: any;
    detailCover: string
    category: string;
    detailMarkdown: string;
    commentField: CommentField;
    commentList: Array<any>;
    isCommentStatus: boolean;
    isCommentMessage: string;
    likeAmount: string|number;
    blogId: string|number;
}

export enum DetailComponentAction {
    askknowledgeErrorComment =  "askknowledgeErrorComment"
}