import { FlatList, ListRenderItem, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native'
import React , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { MainHomeNavigationProp } from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from '@rneui/base';
import { requestLocationPermission } from '../utils/GeolocationPermission';
import Geolocation from 'react-native-geolocation-service';
import { updateCoordinateAction, updateTextAddressAction } from '../store/actions/userAction';
import { getLocation } from '../utils/GetLocationFromDevice';
import { addCustomerLocationAction, resetCustomLocationAction, useCurrentLocationAction } from '../store/actions/CustomerAction';
import { CUSTOMLOCATION } from '../model/index.d';
import { recommendedRestaurantsAction } from '../store/actions/RestaurantAction';

type BottomSheetProp = {
    expandModal: () => void,
    closeModal: () => void,
    // setCurrentLocation: React.Dispatch<React.SetStateAction<string | null>>
}

const LocationUpdateBottomSheet = ({expandModal, closeModal}: BottomSheetProp) => {
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {customLocation, customer, isCustomLocation} = useSelector((state: RootState) => state.CUSTOMERS);
    const dispatch = useDispatch();
    const tw = useTailwind();
    const navigation = useNavigation<MainHomeNavigationProp>();
    const [isAddress, setIsAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [location, setLocation] = useState<Geolocation.GeoPosition | null>();


    useEffect(() => {
        getLocation(setLocation)
    }, [customLocation, isCustomLocation])

    const updateCurrentLocation = async () => {
        if(location) {
            const longitude = location.coords?.longitude;
            const latitude = location.coords?.latitude;
            console.log("update currentLocation : longitude " + longitude + " , latitude " + latitude);
            dispatch(resetCustomLocationAction() as any);
            await dispatch(updateCoordinateAction(longitude, latitude) as any);
            dispatch(useCurrentLocationAction() as any);
            closeModal();
        }
    };

    const updateByAddress = async () => {
        if(city?.length > 0 && address?.length > 0 && zipcode?.length > 0) {
            const newLocation: CUSTOMLOCATION = {
                address,
                zipcode,
                city
            }
            dispatch(resetCustomLocationAction() as any);
            await dispatch(updateTextAddressAction(address, zipcode, city) as any);
            dispatch(addCustomerLocationAction(newLocation) as any);
            setIsAddress(prev => !prev);
            closeModal();
        }
    };

    const expandBottomSheetModal = () => {
        expandModal();
        setIsAddress(prev => !prev)
    }

  return (
    <View style={tw('flex-1 items-start justify-start px-4 bg-gray-200 w-full h-full')}>
        {/* <View style={[{width: "100%", height: 2}, tw('bg-gray-600')]}></View> */}
        {!isAddress && (
            <>  
                <TouchableOpacity onPress={updateCurrentLocation}  style={tw('my-4 flex-row w-full items-start justify-start rounded-full p-2 bg-white px-4')}>
                    <Entypo name='location-pin' size={28} color="#f7691a"></Entypo>
                    <Text style={tw('ml-4 text-lg font-bold text-[#f7691a]')}>Your current Location</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={expandBottomSheetModal}  style={tw('my-4 flex-row w-full items-start justify-start rounded-full p-2 bg-white px-4')}>
                    <FontAwesome5  name='search-location' size={28} color="#f7691a"></FontAwesome5 >
                    <Text style={tw('ml-4 text-lg font-bold text-[#f7691a]')}>Add New Address</Text>
                </TouchableOpacity>
            </>
        )}
        {isAddress && (
            <>
                 <TextInput value={address} placeholder="address" onChangeText={(text: string) => setAddress(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6 mt-8 bg-white')}></TextInput>
                  <TextInput  value={zipcode}  placeholder="zipcode" onChangeText={(text: string) => setZipcode(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6 bg-white')} ></TextInput>
                  <TextInput value={city} placeholder="city" onChangeText={(text: string) => setCity(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6 bg-white')} onSubmitEditing={updateByAddress}></TextInput>
                  <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6 mt-10')} size='lg' title='Update location' onPress={updateByAddress}></Button>
            </>
        )}
    </View>
  )
}

export default LocationUpdateBottomSheet

const styles = StyleSheet.create({})