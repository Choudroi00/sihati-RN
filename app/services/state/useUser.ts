import { createSlice } from "@reduxjs/toolkit"
import { z } from "zod"
import User from "../../models/User"
import { useEffect, useState } from "react";
import apiClient from "../../utils/api";
import { AppDispatch, dispatch, RootState } from "./store";
import { useSelector } from "react-redux";





const useUser = () => {

    // main state

    const _user = useSelector((state: RootState) => state.user); 
    const [_profile, setProfile] = useState< z.infer<typeof User.UserProfile> | null>(null)

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


    // functions 

    const login = (email: string, password: string) => apiWrapper(
        apiClient.post('/login', {email, password}), 
        undefined,
        (data: {access: string}) => dispatch(setUser({..._user, token: data.access}))
    );
    const _logout = () => dispatch(logout()) ;
    const register = (email: string, password: string) => apiWrapper(
        apiClient.post('/register', {email, password1: password,password2: password }), 
        undefined,
        (data: {access: string, user: z.infer<typeof User.BaseSchema>}) => dispatch(setUser({..._user, token: data.access, ...data.user}))
    )
    const createProfile = (profile: z.infer<typeof User.minUserProfile>, callBack: Function) => apiWrapper(
        apiClient.post('api/files/user-files/', profile),
        undefined,
        (data: z.infer< typeof User.UserProfile >) => {
            setProfile(data)
            callBack(data)
        }
    )
    const getProfile = () => apiWrapper(
        apiClient.get('api/user-profile/'),
        undefined,
        (data: z.infer<typeof User.UserProfile >) => setProfile(data)
    );
    const updateProfile = (profile: Partial<z.infer<typeof User.minUserProfile>>) => apiWrapper(
        apiClient.put('api/files/user-files/1/', profile),
        undefined,
        (data: z.infer<typeof User.UserProfile>) => setProfile(data)
    );

    // Lifecycle 

    useEffect(() => {

    }, [])


    return {
        user: _user,
        profile: _profile,
        login,
        logout: _logout,
        register,
        createProfile,
    }
    

}



const initialState : z.infer<typeof User.UserState> = {
    pk: -1,
    first_name: '',
    last_name: '',
    email: '',
    token: '',

    isAuthenticated: false,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if(!User.UserState.safeParse(action.payload).success) return;
            state = {
                isAuthenticated: true,
                ...action.payload,
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
            state = initialState;
        }
    }
})

export const { setUser, logout } = userSlice.actions

const reducer = userSlice.reducer;

export {reducer as UserReducer };

export default useUser;