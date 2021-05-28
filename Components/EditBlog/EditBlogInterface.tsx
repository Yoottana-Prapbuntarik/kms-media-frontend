export interface EditBlogPresenter {
    readonly keyTitleContentEdit: string;
    readonly keyDraftEdit: string;
    readonly keyPublishEdit: string;
    titleEdit: string;
    subTitleEdit: string;
    imagesCover: string;
    categoryEdit: string;
    textWritingBlogEdit: string;
    categoryListEdit: Array<any>;
    contentDraftEdit: any;
    isPostStatusEdit: boolean;
    isPostMessageEdit: string;
}

export enum EditBlogAction {
    handleSubmitWriteBlogEdit = "handleSubmitWriteBlogEdit",
    handleChangeTitleEdit = "handleChangeTitleEdit",
    handleChangeSubTitleEdit = "handleChangeSubTitleEdit",
    handleChangeCoverEdit = "handleChangeCoverEdit",
    handleChangeCategoryEdit = "handleChangeCategoryEdit",
    loadContentDraftEdit = "loadContentDraftEdit",
    handlePostStatusEdit = "handlePostStatusEdit",
    writeBlogResetEdit = "writeBlogResetEdit" 
}