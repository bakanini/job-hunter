import React from 'react';
import {render} from 'react-dom';
import './styles/index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import {createStore} from 'redux';
import rootReducer from './components/reducers/rootReducer';
import {Provider} from 'react-redux';

const store = createStore(rootReducer);


const root = document.getElementById('root');

render(<Provider store = {store}><App /></Provider>,root);
