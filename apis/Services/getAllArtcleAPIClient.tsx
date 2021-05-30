import { service } from "../baseAPI";

export const getPost = async () => {
    let dataAPI = [];
    await service({
        method: 'get',
        url: 'blog/all',
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

export const getPostCategory = async (id: number | string) => {
    let dataAPI = [];
    await service({
        method: 'get',
        url: `blog/content/category/${id}`,
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