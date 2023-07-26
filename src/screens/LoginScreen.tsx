import { Alert,  Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTailwind from 'tailwind-rn/dist/use-tailwind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed';
import { RootStackParamList } from '../navigators/MainStack'
import { RootState } from '../store/store'
import { ResetUser, login } from '../store/actions/userAction'
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from '../utils/GeolocationPermission'
import { getLocation } from '../utils/GetLocationFromDevice'
import { resetCustomLocationAction } from '../store/actions/CustomerAction'

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [longitude, setLongitude] = useState<number | null>(null)
    const [latitude, setLatitude] = useState<number | null>(null)
    const [location, setLocation] = useState<Geolocation.GeoPosition | null>();
    const tw = useTailwind()
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS)
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    useEffect(() => {
      dispatch(resetCustomLocationAction() as any);
      getLocation(setLocation);
    }, [])
    
    useEffect(() => {
      if(authSuccess) {
        navigation.navigate('BottomTabs')
        dispatch(ResetUser() as any);
      }
    }, [login, authSuccess])

    const submitFunction = async () => {
        console.log("login")
        if(username && username.length > 0 && password && password.length > 0, location) {
            // const newLocation : any = await getLocation();
            const longitude =  location?.coords?.longitude;
            const latitude =  location?.coords?.latitude;
            dispatch(resetCustomLocationAction() as any);
            await  dispatch(login({username, password, longitude, latitude}) as any)
            console.log(username + " : " + password)
            setUsername("")
            setPassword("")
            
        } else {
            Alert.alert("please fill all required information")
        }
        
    }

    const navigateToSignUp = () => {
        // navigation.navigate("SignUp")
    }

  return (

    <KeyboardAvoidingView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <SafeAreaView style={tw('flex-1 items-center justify-center px-4')}>                 
                <TextInput value={username} placeholder="username" onChangeText={(text: string) => setUsername(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
                <TextInput secureTextEntry={true} value={password}  placeholder="Password" onChangeText={(text: string) => setPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={submitFunction}></TextInput>
                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Log In' onPress={submitFunction}></Button>
                <View style={tw('flex flex-row')}>
                    <Text style={tw('text-base text-gray-400 mr-4')}>Don't have an account?</Text>
                    <TouchableOpacity activeOpacity={0.2} onPress={navigateToSignUp}>
                        <Text style={tw('text-base text-zinc-700 mr-4')}>Sign Up</Text>
                    </TouchableOpacity>
                </View>          
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
   
})