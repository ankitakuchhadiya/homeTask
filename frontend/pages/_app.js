import '../styles/globals.css';
import { wrapper } from '../redux/store';
import Header from '../components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className="container mx-auto mt-8">
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}

export default wrapper.withRedux(MyApp);
