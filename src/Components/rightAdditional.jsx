import React, { useEffect } from 'react';
import './rightAdditional.css';

function RightAdditional({ isHiddenBoxOpen, AdditionalLeft, AdditionalRight, isAdditionalContant, messageData }) {

  useEffect(() => {
    console.log('calisti', messageData)
    printTerminalData(messageData);
  }, [messageData]);

  const printTerminalData = (messageData) => {
    if (!messageData || !messageData.messages || messageData.messages.length === 0) {
      return null;
    }
    let count = 1; // Başlangıç değeri 1 olarak ayarlanır
    return messageData.messages.map((msg, msgIndex) => (
      <div key={msgIndex}>
        {msg.terminal && msg.terminal.length > 0 &&
          msg.terminal.map((gene, index) => (
            <div key={index} className='rightContent'>
              <p><p className='numItalic'>{count++}. </p><b></b> <b>Gene ID:</b> {gene.geneID}</p>
              <p><p className='numItalic'>{count++}. </p><b></b> <b>Name:</b> {gene.name}</p>
              <p><p className='numItalic'>{count++}. </p><b></b> <b>Sequence:</b> {gene.sequence}</p>
               
            </div>
          ))
        }
      </div>
    ));
  };

  const printComanderData = (messageData) => {
    if (!messageData || !messageData.messages || messageData.messages.length === 0) {
      return null;
    }
    
    return messageData.messages.map((msg, msgIndex) => (
      <div key={msgIndex}>
        {msg.images && msg.images.length > 0 && (
          <div className='rightContent'>
            {msg.images.map((image, index) => (
              <img key={index} className='comanderPhoto' src={image} alt="" /> 
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`rightAdditional ${isHiddenBoxOpen ? 'expanded' : ''}`}>
      <div className={`rightAdditionalContainer ${isHiddenBoxOpen ? 'expanded' : ''}`}>
        <div className={`rightAdditionalLink ${isHiddenBoxOpen ? 'expanded' : ''}`}>
          <div className='rightAdditionalLinkItem'><button onClick={AdditionalLeft}>Terminal</button></div>
          <div className='rightAdditionalLinkItem'><button onClick={AdditionalRight}>Comander</button></div>
        </div>
        <div className='rightAdditionalContent'>
          <div className={`rightAdditionalLeftContent ${isAdditionalContant ? 'rightOpen' : ''}`}>
            {printTerminalData(messageData)}
          </div>
          <div className={`rightAdditionalRightContent ${isAdditionalContant ? 'rightOpen' : ''}`}>
            {printComanderData(messageData)} 
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightAdditional;
