import { useDispatch } from 'react-redux';
import { deletePhoto } from '../redux/actions/photoActions';

const PhotoCard = ({ photo }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePhoto(photo.id));
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src={photo.url} alt="Photo" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Photo</div>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PhotoCard;
