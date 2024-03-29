import React from 'react'
import './loading.css'
import Logo from '../assets/logo.svg'

function loading() {
  return (
    <div className='loadingContainer'>
        <img src={Logo} alt="logo" className='LoadingLogo'/>
    </div>
  )
}

export default loading