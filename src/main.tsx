import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './store/store'
import { theme } from './theme/theme'
import './index.css'
import { router } from './routes/router'
import RTL from './components/shared/RTL'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
        <RTL>
          <RouterProvider router={router} />
        </RTL>
    </Provider>
  </StrictMode>
);

