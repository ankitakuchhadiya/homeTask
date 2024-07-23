const initialState = {
    photos: [],
    loading: false,
    error: null,
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_PHOTO_START':
            return { ...state, loading: true, error: null };
        case 'UPLOAD_PHOTO_SUCCESS':
            return { ...state, loading: false, photos: [...state.photos, action.payload] };
        case 'UPLOAD_PHOTO_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SET_PHOTOS':
            return { ...state, photos: action.payload };
        case 'DELETE_PHOTO_SUCCESS':
            return { ...state, photos: state.photos.filter(photo => photo.id !== action.payload) };
        default:
            return state;
    }
};

export default photoReducer;
