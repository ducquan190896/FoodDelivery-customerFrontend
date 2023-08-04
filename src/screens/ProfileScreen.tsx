import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import { RootStackParamList } from '../navigators/MainStack';
import { PersonalStackParamList } from '../navigators/PersonalStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabProps } from '../navigators/BottomTabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { getAuthUserAction, logOutAction, updateImageProfileAction } from '../store/actions/userAction';
import LoadingComponent from '../components/LoadingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadImageFunction } from '../utils/ImageUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';



export type ProfileScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<PersonalStackParamList, "ProfileScreen">,
NativeStackNavigationProp<RootStackParamList>
>;

const ProfileScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageurl, setImageurl] = useState<string | null>(null);
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const tw = useTailwind();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();

    const loadAuthUser = useCallback(async () => {
        dispatch(getAuthUserAction() as any);
      }, []);
    
    useEffect(() => {
        setIsLoading(true);
        loadAuthUser().then(() => setIsLoading(false));
    }, [])
    
    useEffect(() => {
        if(authUser && authUser?.imageurl) {
            setImageurl(authUser?.imageurl);
        }
    }, [authUser])

    const navigateToProfileForm = () => {
       navigation.navigate("UpdateProfileForm");
    }
    
    const navigateToChangePasswordForm = () => {
        navigation.navigate("PasswordUpdateForm")
    }

    const addImage = async () => {
        const image = await uploadImageFunction();
        console.log("image:  " + image)
        setImageurl(image);
        if(image && image?.length > 0) {
            dispatch(updateImageProfileAction(image) as any)
        }
    }

    const logOutHandler = async () => {
        dispatch(logOutAction() as any);
        navigation.navigate("Login");
    };


    if(isLoading) {
        return <LoadingComponent/>
    }
    

  return (
    <SafeAreaView style={tw('flex-1 bg-white items-center justify-start pt-4 pb-2 px-2')}>
        <View style={[tw('w-full flex flex-row items-center justify-start px-4 my-2'), {marginBottom: 40}]}>
            {imageurl == null ? (
                <TouchableOpacity onPress={addImage} style={tw('mr-8 bg-gray-200 rounded-full px-4 py-4')}>
                    <FontAwesome name='user' size={30} color={"#f7691a"}></FontAwesome>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={addImage} style={[tw('rounded-full border-2'), { marginRight: 20, borderColor: "#f7691a"}]}>
                    <Image source={{uri: HOST_URL + "/api/images/image/" + imageurl}} style={[tw('rounded-full'), {height: 100, width: 100, objectFit: "cover",}]}></Image>
                </TouchableOpacity>
            )}
            <Text style={tw('my-2 text-2xl text-[#f7691a] font-bold')}>{authUser?.firstname?.toUpperCase()} {authUser?.surename?.toUpperCase()}</Text>
        </View>
        {/* <View style={[tw('bg-gray-300 w-full mt-2 mb-4'), {height: 1}]}></View> */}
        <View style={[tw('w-full'), {marginBottom: 60}]}>
            <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
                <Text style={tw('text-black text-lg')}>Firstname</Text>
                <Text style={tw('text-black text-lg')}>{authUser?.firstname}</Text>
            </View>
            <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
                <Text style={tw('text-black text-lg')}>surename</Text>
                <Text style={tw('text-black text-lg')}>{authUser?.surename}</Text>
            </View>
            <View style={tw('flex flex-row items-center border-b border-gray-300 justify-between px-4 py-2')}>
                <Text style={tw('text-black text-lg')}>username</Text>
                <Text style={tw('text-black text-lg')}>{authUser?.username}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={navigateToProfileForm} style={tw('flex-row items-center w-full h-10 px-4 mb-8')}>
            <View style={tw('mr-8')}>
                <Ionicons name='person-circle-outline' size={34} color={"#f7691a"}></Ionicons>
            </View>
            <View style={[tw('flex-1'), {}]}>
                <Text style={tw('text-lg font-bold text-gray-500')}>Update Profile</Text>
            </View>
            <View style={tw('')}>
                <AntDesign name='right' size={24} color={"#f7691a"}></AntDesign>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToChangePasswordForm} style={tw('flex-row items-center w-full h-10 px-4 mb-8')}>
            <View style={tw('mr-8')}>
                <MaterialIcons name='security' size={34} color={"#f7691a"}></MaterialIcons>
            </View>
            <View style={[tw('flex-1'), {}]}>
                <Text style={tw('text-lg font-bold text-gray-500')}>Change Password</Text>
            </View>
            <View style={tw('')}>
                <AntDesign name='right' size={24} color={"#f7691a"}></AntDesign>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOutHandler} style={tw('flex-row items-center w-full h-10 px-4 mb-2')}>
            <View style={tw('mr-8')}>
                <AntDesign name='logout' size={34} color={"#f7691a"}></AntDesign>
            </View>
            <View style={[tw('flex-1'), {}]}>
                <Text style={tw('text-lg font-bold text-gray-500')}>Log Out</Text>
            </View>
            <View style={tw('')}>
                <AntDesign name='right' size={24} color={"#f7691a"}></AntDesign>
            </View>
        </TouchableOpacity>


    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})