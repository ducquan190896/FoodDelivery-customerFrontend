import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'

export const basketByIdAction = (basketId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basket_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/baskets/basket/id/" + basketId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basket_by_id");
            console.log(res.data);
            dispatch({
                type: "basket_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basket failed") 
        dispatch({
            type: "basket_error",
            payload: "loading basket failed"
        });
    }
}

export const basketByAuthUserAndRestaurantAction = (restaurantId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basket_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/baskets/authenticatedUser/restaurant/" + restaurantId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basket_by_authenticatedUser_and_restaurant");
            console.log(res.data);
            dispatch({
                type: "basket_by_authenticatedUser_and_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basket failed") 
        dispatch({
            type: "basket_error",
            payload: "loading basket failed"
        });
    }
}
export const basketByCustomerAndRestaurantAction = (restaurantId: number, customerId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basket_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + `/api/baskets/customer/${customerId}/restaurant/${restaurantId}`, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basket_by_customer_and_restaurant");
            console.log(res.data);
            dispatch({
                type: "basket_by_customer_and_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basket failed") 
        dispatch({
            type: "basket_error",
            payload: "loading basket failed"
        });
    }
}
export const resetBasketAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "basket_reset"
    })
}