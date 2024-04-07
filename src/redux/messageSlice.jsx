import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, doc, getDoc, setDoc ,getDocs } from 'firebase/firestore';
import { GoogleGenerativeAI } from "@google/generative-ai";

import { db } from '../../firebaseConfig';

const API_KEY = 'AIzaSyC3Z892Srb66JtQOXVNBdWRpBWgMks_BBk';
const genAI = new GoogleGenerativeAI(API_KEY)
 


const initialState = {
    status: 'idle',
    waitLoading : false,
    error: null,
    docRefId: null, 
    messageData : null
    
 };


export const sendMessageUser = createAsyncThunk('message/sendMessageUser', async (userInput, thunkAPI) => {
    const state = thunkAPI.getState(); 
    let docRefId = state.message.docRefId;
 
 

    try {
        if (docRefId === null) {
             const docRef = await addDoc(collection(db, 'chats'), {
                messages: [{ message: userInput, timestamp: new Date().toISOString() ,_id: Math.random().toString(36).substring(2, 10), role: 'user' }]
            });
            docRefId = docRef.id;

             return docRefId;
        } 
        
        else {
            console.log('eski dosya' + docRefId)
            
            const chatRef = doc(db, 'chats', docRefId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                throw new Error('Chat not found');
            }

            const chatData = chatDoc.data();
            
            const updatedMessage = {
                role: 'user',
                message: userInput,
                timestamp: new Date().toISOString(),
                terminal: [],
                images:[],
                _id: Math.random().toString(36).substring(2, 10),
            };
            

            await setDoc(chatRef, {
                messages: [...chatData.messages, updatedMessage],
            } , { merge: true });

 

             return docRefId ;
            
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});  




export const sendMessageAi = createAsyncThunk('message/sendMessageAi', async (userInput, thunkAPI) => {
    try {
        const state = thunkAPI.getState(); 
        const docRefId = state.message.docRefId;
 
        const chatRef = doc(db, 'chats', docRefId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat not found');
        }
        
        const filteredMessages = chatDoc.data().messages
            .filter(message => message.role === 'user' || message.role === 'ai')
            .map(message => ({
                role: message.role === 'user' ? 'user' : 'model',
                parts: [{ text: message.message }]
            }));

/*---------------------------------------- Sonradan silinecek kisinm ------------------------------------*/

            if( userInput === "hi Nuru today we will ask you to create a few biometric DNA sequences that meet some criteria." ){
                const updatedMessage = {
                    role: 'ai',
                    message: "Of course, you'll just need to provide the metric research features required on the job. These; DNA race types can be an example of physiological structure about graphical features, general design and biological adaptation.",
                    timestamp: new Date().toISOString(),
                    terminal: [],
                    images:[],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;

            }if( userInput === "The DNA potential you will create will not involve awareness. The race inside the structure you create will belong to the dog type. You can take the 311.png example that we added to your base. You can create an SVG file to exemplify these. Send us the SVG file you created. Based on the visual, the adaptation rate that is not affected by external factors is FRx(0) a DNA mutation. create an example, you can provide its index by using only an organ part example." ){
                const updatedMessage = {
                    role: 'ai',
                    message: "Of course, the DNA I will create will not contain potential awareness. The race inside the structure will belong to the dog type and I will take the 311.png example as the basis. Based on the visual of this example, I will analyze the adaptation rate that is not affected by external factors with biomathematics and biometric concepts. For this, I will create an SVG file and provide the DNA mutation example we created, using only an organ section example. * In this way, it will be possible to create DNA sequences and analyze adaptation rates using biometric and biomathematical concepts. I will send you the SVG file I created.",
                    timestamp: new Date().toISOString(),
                    terminal: [],
                    images:[],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;
            }
            if( userInput === "ınstallation start successful" ){
                const updatedMessage = {
                    role: 'ai',
                    message: "The installation is complete, I will be here for more content, if you need help, just call me. Please check my interface.",
                    timestamp: new Date().toISOString(),
                    terminal: [
                        {
                            geneID: 1,
                            name: 'Mitokondriyal DNA',
                            sequence: 'ATCGGCTAGCGATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC'
                        },
                        {
                            geneID: 2,
                            name: 'Melanin Üretim Geni',
                            sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG'
                        },
                        {
                            geneID: 3,
                            name: 'Kürk Rengi Belirleyici Gen',
                            sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG'
                        },
                        {
                            geneID: 4,
                            name: 'Kulak Şekli Geni',
                            sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG'
                        },
                        {
                            geneID: 5,
                            name: 'Kuyruk Uzunluğu Belirleyici Gen',
                            sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG'
                        }
                    ],
                    images:[
                        "https://i.ibb.co/DD8Ftyb/dog1.png",
                        "https://i.ibb.co/vYRRDxk/dog2.png"
                    ],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;
            }
            if( userInput === "now I want you to find the format that we have previously uploaded to you from your own infrastructure The infrastructure you found belongs to a K9 German breed dog Based on this I approve various research and development commands create me a physiological and living example" ){
                const updatedMessage = {
                    role: 'ai',
                    message: "The given resources will make my tasks easier. I can assist you with this. Please wait a moment. When the process is complete, I'll inform you, and you can simply restart.",
                    timestamp: new Date().toISOString(),
                    terminal: [],
                    images:[],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;
            }
            if( userInput === "restart" ){
                const updatedMessage = {
                    role: 'ai',
                    message: "Please check my interface.",
                    timestamp: new Date().toISOString(),
                    terminal: [],
                    images:[],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;
            }
/*---------------------------------------- Sonradan silinecek kisinm ------------------------------------*/
            else{
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
                const prompt = filteredMessages.length === 0 ? userInput : filteredMessages.map(msg => msg.parts[0].text).join('\n');
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                    
                const updatedMessage = {
                    role: 'ai',
                    message: text,
                    timestamp: new Date().toISOString(),
                    terminal: [],
                    images:[],
                    _id: Math.random().toString(36).substring(2, 10),
                };

                await setDoc(chatRef, {
                    messages: [...chatDoc.data().messages, updatedMessage],
                }, { merge: true });
        
                return docRefId;

            }
      


        

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getMessageData = createAsyncThunk('message/getMessageData', async (docRefId ,thunkAPI) => {
    try {

        const chatRef = doc(db, 'chats', docRefId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat not found');
        }

         
        const messageData = chatDoc.data()
        

        
          return messageData ;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})


 

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        // Gerekirse, ekstra reducer'ları buraya ekle
    },
    extraReducers: (builder) => {
        // Asenkron thunk aksiyonunun beklenen, tamamlanan ve reddedilen durumlarını işle
        builder
            .addCase(sendMessageUser.pending, (state) => {
                state.status = 'loading';
                state.waitLoading = true
            })
            .addCase(sendMessageUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.docRefId = action.payload
                  
                
            })
            .addCase(sendMessageUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
                state.waitLoading = false

            })
            
            .addCase(sendMessageAi.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(sendMessageAi.fulfilled, (state, action) => {
                state.status = 'idle';
                state.docRefId = action.payload
                  
            })
            .addCase(sendMessageAi.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(getMessageData.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(getMessageData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.messageData = action.payload
                state.waitLoading = false

                  
            })
            .addCase(getMessageData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
                state.waitLoading = false

            });;
            
    },
});

export default messageSlice.reducer;
