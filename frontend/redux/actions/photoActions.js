import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadPhotoStart = () => {
    return {
        type: 'UPLOAD_PHOTO_START',
    };
};

export const uploadPhotoSuccess = (photo) => {
    return {
        type: 'UPLOAD_PHOTO_SUCCESS',
        payload: photo,
    };
};

export const uploadPhotoFail = (error) => {
    return {
        type: 'UPLOAD_PHOTO_FAIL',
        payload: error,
    };
};

export const setPhotos = (photos) => {
    return {
        type: 'SET_PHOTOS',
        payload: photos,
    };
};

export const deletePhotoSuccess = (id) => {
    return {
        type: 'DELETE_PHOTO_SUCCESS',
        payload: id,
    };
};

export const uploadPhoto = (file) => {
    return async (dispatch, getState) => {
        dispatch(uploadPhotoStart());
        const { token } = getState().auth;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${API_URL}/graphql`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(uploadPhotoSuccess(response.data.data.uploadPicture));
        } catch (error) {
            dispatch(uploadPhotoFail(error.response.data));
        }
    };
};

export const fetchPhotos = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const response = await axios.post(`${API_URL}/graphql`, {
                query: `
          query {
            getAllMyUploadedPictures {
              id
              url
            }
          }
        `,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(setPhotos(response.data.data.getAllMyUploadedPictures));
        } catch (error) {
            console.error(error);
        }
    };
};

export const deletePhoto = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            await axios.delete(`${API_URL}/photos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(deletePhotoSuccess(id));
        } catch (error) {
            console.error(error);
        }
    };
};
