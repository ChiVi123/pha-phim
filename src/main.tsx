import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~css/main.old.css';

import App from '~view/app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
