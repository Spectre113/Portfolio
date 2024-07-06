import '../src/css/normalize.css';
import 'choices.js/public/assets/styles/choices.min.css';
import '../src/css/states.css';
import 'swiper/swiper-bundle.min.css';
import '../src/css/style.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;