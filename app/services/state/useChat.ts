import { createSlice } from "@reduxjs/toolkit"
import { z } from "zod"
import Chat from "../../models/Chat"
import { useEffect } from "react"
import { dispatch, RootState } from "./store"
import { useSelector } from "react-redux"
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import apiClient from "../../utils/api"



type ChatType = z.infer<typeof Chat.ChatSchema>

const useChat = () => {

    const _chat = useSelector((state: RootState) => state.chat)

    const apiWrapper = async (request: Promise<any>, before?: Function | undefined ,callBack?: Function | undefined) => {
        if(before) before()
        try {
            request.then(response => {
                if(callBack) callBack(response.data)
            }).catch(error => {
                console.error(error)        
            })
            
        } catch (error) {
            console.error(error)
        } finally {
        }

    }


    const _sendMessage = (message: string) => apiWrapper(
        apiClient.post('api/ai-chat/', {prompt: message}),
        () => dispatch(sendMessage({
            sender: "user", 
            message: message
        })),
        (data: {response: string}) => dispatch(sendMessage({
            sender: "ai",
            message: data.response
        })) 
    )


    // lifecycle 

    useEffect(()=> {
        dispatch(resetChat())
    }, [])


    return {
        chat: _chat,
        sendMessage: _sendMessage
    }
}


const initialState : ChatType = [] 


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            if(!Chat.MessageSchema.safeParse(action.payload).success) return;
            state.push(action.payload)
        }, 
        resetChat: (state) => {
            state = initialState
        }
    }
})

const {reducer} = chatSlice

export const {sendMessage, resetChat} = chatSlice.actions

export {reducer as ChatReducer }



