import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../redux/actions/photoActions';

export default function Upload() {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const loading = useSelector((state) => state.photos.loading);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Array.from(files).forEach((file) => {
            dispatch(uploadPhoto(file));
        });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Upload Photos</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Choose Photos</label>
                    <input
                        type="file"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}
