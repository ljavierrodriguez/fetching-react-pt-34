import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Main from "./Main";

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(<Main />);