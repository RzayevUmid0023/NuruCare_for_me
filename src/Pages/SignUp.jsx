import React from 'react'
import './SignUp.css'
import logo from '../assets/logo.svg';

function SignUp() {
  return (
    <div className='signUp_Container'>
      <div className='signUp_witdhContainer'>

        <div className='signUp_Container-Left'>
            <div className='SignUp_form'>
              <div className='formTitle'>
                Welcome
              </div>

              <div className='formSubtitle'>
                Innovative Health Experience: Support Your Doctor with Artificial Intelligence
              </div>
  
              <div className='pageSelect'>
                <div className='activeSelect'>Login</div> 
                <div className='passivSelect'>Registr</div> 

              </div> 
            </div>
        </div>

        <div className='signUp_Container-Right'>
          <img src={logo} className='signUp_Container-Right_logo' />
        </div>
      </div>
    </div>
  )
}

export default SignUp