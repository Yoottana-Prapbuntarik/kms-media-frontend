import { serviceToken } from './baseAPI'
import { Dispatch } from 'redux'

export enum PostArticleAPI {
    PostArticleSuccess = 'PostArticleSuccess',
    PostArticleFiled = 'PostArticleFiled',
    UpdateArticleSuccess = 'UpdateArticleSuccess',
    UpdateArticleFiled = 'UpdateArticleFiled'
}

export enum LikeArticleAPI {
    LikeSuccess = 'LikeSuccess',
    LikeFiled = 'LikeFiled'
}

export const postArticle: any = (content: string, ownUser: string | number, category: string | number,
    title: string, subTitle: string, cover: string) => async (dispatch: Dispatch) => {
        serviceToken({
            method: 'post',
            url: 'blog',
            data: params(content, ownUser, category, title, subTitle, cover)
        })
            .then((response) => {
                if (response) {
                    dispatch({
                        type: PostArticleAPI.PostArticleSuccess,
                        dataAPI: response.data,
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: PostArticleAPI.PostArticleFiled,
                    })
                }
            })
    }

export const updateArticle: any = (updateId: string, content: string, ownUser: string | number, category: string | number,
    title: string, subTitle: string, cover: string) => async (dispatch: Dispatch) => {
        serviceToken({
            method: 'put',
            url: `blog/update/${updateId}`,
            data: params(content, ownUser, category, title, subTitle, cover)
        })
            .then((response) => {
                if (response) {
                    dispatch({
                        type: PostArticleAPI.UpdateArticleSuccess,
                        dataAPI: response.data,
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: PostArticleAPI.UpdateArticleFiled,
                    })
                }
            })
    }


export const likeArticle: any = (blogId: number | string, userLike: number | string, blogLike: number | string) => async (dispatch: Dispatch) => {
    serviceToken({
        method: 'post',
        url: `blog/like/${blogId}`,
        data: {
            user_like: userLike,
            blog_like: blogLike,
        }
    })
        .then((response) => {
            if (response) {
                dispatch({
                    type: LikeArticleAPI.LikeSuccess,
                    dataAPI: response.data,
                })
            }
        })
        .catch((error) => {
            if (error) {
                dispatch({
                    type: LikeArticleAPI.LikeFiled,
                })
            }
        })
}

const params = (content: string, ownUser: string | number, category: string | number,
    title: string, subTitle: string, cover: string) => {

    return {
        content: content,
        own_user: ownUser,
        category: category,
        title: title,
        sub_title: subTitle,
        cover: cover
    }
}
