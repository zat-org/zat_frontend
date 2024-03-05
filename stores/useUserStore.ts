import { defineStore } from 'pinia'
import type { IUser } from '~/Models/AuthModels';

export const useUserStore = defineStore('user', () => {

    const user = ref<IUser | null>(null)
    const jwtToken = ref<string | null>(null)
    const isAuthenticated = computed(() =>
        user.value !== null && jwtToken.value !== null)
    // on load in client read the user data 

    const refetchUser = async () => {
        if (isAuthenticated.value && jwtToken.value) {
            const { $api } = useNuxtApp();
            const { fetchAuthUserData } = $api.auth.useLogin();
            let res = await fetchAuthUserData(jwtToken.value);
            console.log(res);
            if (res) {
                user.value = res
            } else {
                user.value = null
                jwtToken.value = null
            }
        }
    }

    const loginUser = (userData: IUser, token: string) => {
        user.value = userData
        jwtToken.value = token
        // save in local storage 
    }

    const logoutUser = () => {
        user.value = null
        jwtToken.value = null
        // delete from local storage 

    }
    return { user, jwtToken, logoutUser, loginUser, isAuthenticated, refetchUser }
}, {
    persist: {
        storage: persistedState.localStorage,
    },
})