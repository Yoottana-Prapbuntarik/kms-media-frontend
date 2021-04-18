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
    commentList: Array<any> 
}