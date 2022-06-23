import '../styles/globals.css';
import { CounterProvider } from '../components/Counter'


function MyApp({ Component, pageProps }) {
  return (<CounterProvider><Component {...pageProps} /></CounterProvider>)
}

export default MyApp;
