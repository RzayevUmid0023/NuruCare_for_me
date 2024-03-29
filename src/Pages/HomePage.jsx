import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import logo from '../assets/logo.png';
import user from '../assets/user.png'
import Suggestion from '../Components/suggestion';
import Loading from '../Components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageUser, sendMessageAi, getMessageData } from '../redux/messageSlice';

import {  FaBookOpen } from "react-icons/fa";
import { MdLogin   } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { PiBug } from "react-icons/pi";
import { IoCubeOutline, IoArrowForwardSharp } from "react-icons/io5";
import { GiWorld ,GiHamburgerMenu  } from "react-icons/gi";
import { GoPaperclip } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";


function HomePage() {
  const dispatch = useDispatch();
  const { docRefId, messageData, waitLoading } = useSelector((state) => state.message);
 

  const [isOpen, setIsOpen] = useState(true);
  const [isHiddenBoxOpen, setIsHiddenBoxOpen] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inputData, setInputData] = useState('');
  const [guncelMesaj, setGuncelMesaj] = useState();
  const rightBoxHiddenRef = useRef(null);


  useEffect(() => {
    setGuncelMesaj(messageData);
    console.log("Message Data:", messageData);
  }, [messageData]);

  useEffect(() => {
    // Mesaj geldiğinde veya yeni mesaj eklendiğinde sayfayı en alta kaydır
    if (rightBoxHiddenRef.current) {
      rightBoxHiddenRef.current.scrollTop = rightBoxHiddenRef.current.scrollHeight;
    }
  }, [messageData, guncelMesaj]);


  const parseMessage = (message) => {
    const paragraphs = message.split('\n');
    const starredSections = [];
  
    paragraphs.forEach(paragraph => {
      if (paragraph.includes('**')) {
        const sections = paragraph.split('**');
        sections.forEach((section, index) => {
          if (index % 2 !== 0) {
            starredSections.push(section.trim());
          }
        });
      }
    });
  
    return starredSections;
  };
  
  const handleMessageData = () => {
    if (guncelMesaj && guncelMesaj.messages) {
      return guncelMesaj.messages.map((msg, index) => {
        return (
          <div key={index} className="messageContainer">
              <div className={msg.role === 'ai' ? 'aiBox' : 'userBox'}>
              <div className='chatHeader'>
                  <div className='profilPhoto'>
                    <img src={msg.role === 'ai' ? logo : user}  className='chatHeaderLogo' />
                  </div>

                  <text className={msg.role === 'ai' ? 'aiName' : 'userName'}>
                    {msg.role === 'ai' ? 'NuruCare' : 'You'}
                  </text>
              </div>
              <div className="messageContent">
                {msg.message.split('\n').map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph.includes('') ? (
                      paragraph.split('').map((section, idx) => {
                        return idx % 2 === 0 ? (
                          <strong key={idx} >{section}</strong>
                        ) : (
                          <span key={idx}>{section}</span>
                        );
                      })
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  }
  

  const toggleOpenClose = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleHiddenBox = () => {
    setIsHiddenBoxOpen(!isHiddenBoxOpen);
  };

  const aiActiveBox = () => {
    setAiActive(true);
  };

  const resetAiBox = () => {
    setAiActive(false);
  };

  const resetPage = () => {
    window.location.reload();
  };

  const al = () => {
    dispatch(getMessageData(docRefId));
  };
 

  


  const handleMessageSend = async () => {
    if (inputData.trim() !== '') {
      try {
          tekMesajGuncelle();
          setInputData('')
          const userInput = inputData;
          const userAction = await dispatch(sendMessageUser(userInput));
          const aiAction = await dispatch(sendMessageAi(userInput));
          const userDocRefId = userAction.payload;
          const aiDocRefId = aiAction.payload;
          setUserInput('');
          await dispatch(getMessageData(userDocRefId));
       } catch (error) {
        console.error('Failed to send message:', error.message);
      }
    }
  };

  const tekMesajGuncelle = () => {
    const userMessage = {
      id: '111111',
      role: 'user',
      message: inputData,
      timestamp: '2024-03-26T12:10:07.093Z'
    };
  
    if (!guncelMesaj) {
      setGuncelMesaj({ messages: [userMessage] });
    } else {
      setGuncelMesaj({ ...guncelMesaj, messages: [...guncelMesaj.messages, userMessage] });
    }
  }
  return (
    <div className='Container'>
      <div className='widthContainer'>
        <div className={`leftBox ${isOpen ? '' : 'collapsed'}`}>

          <div className='leftTopBox'>
            
              <button className=' leftButton' onClick={toggleOpenClose}>
                <GiHamburgerMenu className='leftButtonIcon' />
                 
              </button>
          
          </div>

          <div className='leftTopLine'></div>

            <div className='leftMidBox'>
              <button className=' leftButton' onClick={resetPage}>
                <FaPlus className='leftButtonIcon' />
                <span className='leftButtonText'>New Chat</span>
              </button>
            </div>

          <div className='leftTopLine'></div>

          <div className='leftBottomBox'>
            <button className=' leftButton' onClick={al}>
              <MdLogin className='leftButtonIcon' />
              <span className='leftButtonText'>Log out Access</span>
            </button>
            <button className=' leftButton'>
              <AiOutlineQuestionCircle className='leftButtonIcon' />
              <span className='leftButtonText'>About Us</span>
            </button>
          </div>

        </div>

        <div className='rightBox' style={{ width: isHiddenBoxOpen ? '50%' : '40%' }}>
          <div className={`rightBoxTop ${aiActive ? 'closeRightBoxTop' : ''}`}>
            <div className='rightBoxTopContent'>
              <div className='rbtconTitle'>
                <text className='rbtconTitleText' >NuruCare</text>
              </div>
              <div className='rbtconSubtitle'>
                <img src={logo} alt="" className='rbtconSubtitleLogo' />
                <text className='rbtconSubtitleText'>Hey Welcome!</text>
              </div>
            </div>
            <div className='rightBoxTopColonium'>
              <div className='rbtcTitle'>
                <text className='rbtcolTitleText'>I can suggest the following for you:</text>
              </div>
              <div className='rbtcolColonium'>
                <Suggestion title='Run my Github repo' icon={<FiGithub className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='Debug & fix the tests in this codebase' icon={<PiBug className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='Setup an LLM inside a Docker Container' icon={<IoCubeOutline className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='Create a map of CA wildfires in 2023' icon={<GiWorld className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
              </div>
            </div>
          </div>

          <div className={`rightBoxHidden ${aiActive ? 'aiActive' : ''}`} ref={rightBoxHiddenRef}>
            {handleMessageData()}
          </div>

          {waitLoading ? <Loading /> : null}

          <div className='rightBoxBottom'>
            <div className='RightBoxBottomInputBox'>
              <div className='inputLeft'><button ><GoPaperclip className='inputLeftIcon'/></button></div>
              <div className='inputMid'>
                <input type="text"  
                       placeholder='Give NuruCare a task to work on ...' 
                       onChange={(e)=> setInputData(e.target.value)}
                       value={inputData}
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          aiActiveBox();
                          tekMesajGuncelle();
                          handleMessageSend();
                        }
                      }} 
                        />
              </div>
              <div className='inputRight'>
                <button onClick={() => { aiActiveBox();  tekMesajGuncelle(); handleMessageSend();  }}>
                  <IoArrowForwardSharp  className='inputRightIcon'/>
                </button>
              </div>
            </div>
          </div>

          <button className='secondWindow' onClick={toggleHiddenBox} ><FaBookOpen className='secondWindowButtom'/></button>
        </div>

        <div className={`hiddenBox ${isHiddenBoxOpen ? 'expanded' : ''}`}>
        </div>
      </div> 
    </div>
  );
}

export default HomePage;
