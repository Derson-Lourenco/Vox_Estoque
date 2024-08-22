import React from 'react'
import { CFooter } from '@coreui/react'
import '../css/style.css'
import TemaCor from './TemaCor'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="cap">Vox</span>
        <span className="dev">Tec</span>
        
        <span className="ms-1">&copy; 2024. Desenvolvido por </span>
          
        <a href="https://capivaradev.netlify.app/" target="_blank" rel="noopener noreferrer"><span className="cap" >Capivara</span> <span className="dev">Dev</span></a>
         
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a>
      </div> */}

      <TemaCor/>
    </CFooter>
  )
}

export default React.memo(AppFooter)
