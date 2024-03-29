import React from 'react'
import './suggestion.css';
 


function suggestion({title , icon ,isCollapsed }) {
 
  return (
    <button className='suggestionBox' style={{ width: !isCollapsed ? '130px' : '260px', justifyContent: !isCollapsed ? 'center' : 'flex-start' }}>
        <div className='suggestionLogoBox'>{icon}</div>

        <div className='suggestionText' style={{ display: !isCollapsed ? 'none' : 'flex ' }}> <text className='suggestionTextContent' >{title }</text></div>
    </button>   
  )
}
 

export default suggestion