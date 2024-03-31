import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import logo from '../assets/logo.svg';
import user from '../assets/user.png'
import Suggestion from '../Components/suggestion';
import Loading from '../Components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageUser, sendMessageAi, getMessageData } from '../redux/messageSlice';

import {FaBookOpen, MdLogin, AiOutlineQuestionCircle ,IoArrowForwardSharp, GiHamburgerMenu, GoPaperclip,FaPlus,FiActivity,LuDna, SiMicrogenetics, SiUnitednations} from '../assets/icon' 

 


function HomePage() {
  const dispatch = useDispatch();
  const { docRefId, messageData, waitLoading } = useSelector((state) => state.message);
 

  const [isOpen, setIsOpen] = useState(true);
  const [isHiddenBoxOpen, setIsHiddenBoxOpen] = useState(false);
  const [isAdditionalContant, setIsAdditionalContant] = useState(false);

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
    const paragraphs = message.split('*');
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
        const isUser = msg.role === 'user'; // Flag for user messages
  
        return (
          <div key={index} className="messageContainer">
            <div className={isUser ? 'userBox' : 'aiBox'}>
              <div className='chatHeader'>
                <div className='profilPhoto'>
                  <img
                    src={isUser ? user : logo} // Use user image for user messages
                    className='chatHeaderLogo'
                    alt={isUser ? 'Your Profile Picture' : 'NuruCare Logo'} // Add alt text for accessibility
                  />
                </div>
                <text className={isUser ? 'userName' : 'aiName'}>
                  {isUser ? 'You' : 'NuruCare'}
                </text>
              </div>
              <div className="messageContent">
                {formatMessage(msg.message)}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };
  
  function formatMessage(message) {
    const segments = message.split('*'); // ** işaretlerine göre metni böler
    const formattedMessage = segments.map((segment, idx) => {
        if (idx % 2 === 0) { // ** işaretleri arasındaki metni işle
            return (
                <div key={idx}>
                     <strong >{segment}</strong> {/* Kalın metin */}
                    <br/>
                </div>
            );
        } else if (segment !== '') { // ** işareti yoksa ve boş değilse normal metin olarak işle
            return <span key={idx}>{segment}</span>;
        } else {
            return null; // Boş segmentleri atla
        }
    });
    return formattedMessage;
}

  const toggleOpenClose = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleHiddenBox = () => {
    setIsHiddenBoxOpen(!isHiddenBoxOpen);
    console.log(isHiddenBoxOpen)
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

  const AdditionalLeft =()=>{
    setIsAdditionalContant(false)
  }

  const AdditionalRight =()=>{
    setIsAdditionalContant(true)
  }

  
 

  


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
                <Suggestion title='Heart rate balance' icon={<FiActivity className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='Dna general information sequence' icon={<LuDna className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='World health organization current information' icon={<SiUnitednations className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
                <Suggestion title='Individualized genetic information' icon={<SiMicrogenetics className='suggestionLogo' />} isCollapsed={!isHiddenBoxOpen} />
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

        <div className={`rightAdditional ${isHiddenBoxOpen ? 'expanded' : ''}`}> 
          <div className={`rightAdditionalContainer ${isHiddenBoxOpen ? 'expanded' : ''}`}>

            <div className={`rightAdditionalLink ${isHiddenBoxOpen ? 'expanded' : ''}`}>
              <div className='rightAdditionalLinkItem'><button onClick={AdditionalLeft}>Terminal</button></div>
              <div className='rightAdditionalLinkItem'><button onClick={AdditionalRight}>Comander</button></div>
            </div>

            <div className='rightAdditionalContent'>
              <div className={`rightAdditionalLeftContent ${isAdditionalContant ? 'rightOpen' : ''}`}></div>
              <div className={`rightAdditionalRightContent ${isAdditionalContant ? 'rightOpen' : ''}`}></div>
            </div>
          </div>
              


        </div>
      </div> 
    </div>
  );
}

export default HomePage;
