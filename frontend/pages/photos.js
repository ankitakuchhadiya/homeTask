import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/actions/photoActions';
import PhotoCard from '../components/PhotoCard';

export default function Photos() {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Photos</h2>
            <div className="flex flex-wrap">
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </div>
    );
}
