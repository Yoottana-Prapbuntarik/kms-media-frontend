import { LikePost } from "../apis/Services/likeArticleAPIClient";

export const LikeArtcleScore = (blogId, userLike) => {
    return new Promise((resolve, reject) => {
        resolve(LikePost(blogId, userLike, blogId))
    })
}