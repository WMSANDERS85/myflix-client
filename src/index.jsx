import {createRoot} from 'react-dom/client';

import Container from 'react-bootstrap/Container';

import {Header} from './components/Header/Header';

import {Mainview} from './components/MainView/MainView';

import 'bootstrap/dist/css/bootstrap.min.css';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
function MyFlixApplication() {
  return (
    <Container>
      <Header />
      <Mainview />
    </Container>
  );
}

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
