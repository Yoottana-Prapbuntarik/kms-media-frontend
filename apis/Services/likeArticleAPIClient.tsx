import { serviceToken } from "../baseAPI";

export const LikePost = async (
    blogId: number | string, 
    userLike: number | string, 
    blogLike: number | string) => {
    let dataAPI = [];
    await serviceToken({
        method: 'post',
        url: `blog/like/${blogId}`,
        data: {
            user_like: userLike,
            blog_like: blogLike,
        }
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