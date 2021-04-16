import { serviceToken } from './baseAPI'
import { Dispatch } from 'redux'

export enum PostArticleAPI {
    PostArticleSuccess = 'PostArticleSuccess',
    PostArticleFiled = 'PostArticleFiled'
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
