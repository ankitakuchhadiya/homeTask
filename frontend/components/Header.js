import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Header = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.token !== null);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center container mx-auto">
                <div className="text-xl font-bold">
                    <Link href="/">PhotoApp</Link>
                </div>
                <div>
                    {isAuthenticated ? (
                        <>
                            <Link href="/upload" className="mr-4">Upload Photo</Link>
                            <Link href="/photos" className="mr-4">My Photos</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/signup" className="mr-4">Signup</Link>
                            <Link href="/login" className="mr-4">Login</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
