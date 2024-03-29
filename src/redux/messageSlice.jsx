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
            _id: Math.random().toString(36).substring(2, 10),
        };

        await setDoc(chatRef, {
            messages: [...chatDoc.data().messages, updatedMessage],
        }, { merge: true });

        return docRefId;

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
