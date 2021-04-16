export interface WriteBlogPresenter {
    readonly keyTitleContent: string;
    readonly keyDraft: string;
    readonly keyPublish: string;
    title: string;
    subTitle: string;
    imagesCover: string;
    category: string;
    textWritingBlog: string;
    categoryList: Array<any>;
    contentDraft: any;
    isPostStatus: boolean;
    isPostMessage: string;
}

export enum WriteBlogAction {
    handleSubmitWriteBlog = "handleSubmitWriteBlog",
    handleChangeTitle = "handleChangeTitle",
    handleChangeSubTitle = "handleChangeSubTitle",
    handleChangeCover = "handleChangeCover",
    handleChangeCategory = "handleChangeCategory",
    loadContentDraft  = "loadContentDraft",
    handlePostStatus  = "handlePostStatus"
}