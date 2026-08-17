import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { ToDosPage } from './pages/to-dos/ToDosPage.tsx'

declare global {
  // this makes TS errors go away https://stackoverflow.com/a/56458070
  interface Window {
    __ENV__: {
      VITE_API_ROOT: string,
    },
  }
}

ReactDOM
  .createRoot(document.getElementById(`root`)!)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/to-dos"
            element={<ToDosPage />}
          />
          <Route
            path="/*"
            element={<HomePage />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  )
