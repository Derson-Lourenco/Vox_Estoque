import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import './scss/style.scss'

import '@coreui/coreui/dist/css/coreui.min.css'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

function App() {
  return (
    <HashRouter>
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  </HashRouter>
  )
}

export default App
