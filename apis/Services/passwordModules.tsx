import { service } from "../baseAPI";

export const changePassword = async (password: string, token: string) => {
    let dataAPI = [];
    await service({
        method: 'post',
        url: 'password_reset/confirm',
        data: {
            password: password,
            token: token
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

export const sendEmail = async (email: string) => {
    let dataAPI = [];
    await service({
        method: 'post',
        url: 'password_reset/',
        data: {
            email: email,
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