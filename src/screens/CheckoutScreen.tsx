import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabProps } from '../navigators/BottomTabs';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASKETDISH, DISH, ORDER_REQUEST } from '../model/index.d';
import  {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { basketByIdAction, resetBasketAction } from '../store/actions/BasketAction';
import { basketDishesByBasketAction, resetAllBasketDishesAction } from '../store/actions/BasketDishAction';
import BasketScreenItem from '../components/BasketScreenItem';
import { restaurantByIdAndAuthCustomerAction } from '../store/actions/RestaurantAction';
import BasketScreenHeader from '../components/BasketScreenHeader';
import BasketScreenFooter from '../components/BasketScreenFooter';
import DetailedRestaurantDishChoice from '../components/DetailedRestaurantDishChoice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { createOrderAction, resetOrderAction } from '../store/actions/OrderAction';

export type CheckoutScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "CheckoutScreen">,
BottomTabNavigationProp<BottomTabProps>
>;

type CheckoutScreenRouteProp = RouteProp<RestaurantStackParamList, "CheckoutScreen">;

const CheckoutScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const tw = useTailwind();
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const { basket, basketError, basketSuccess} = useSelector((state: RootState) => state.BASKETS);
  const {basketDishes, basketDish} = useSelector((state: RootState) => state.BASKETDISHES);
  const {order, orderSuccess} = useSelector((state: RootState) => state.ORDERS)
  const dispatch = useDispatch();
  const {basketId} = useRoute<CheckoutScreenRouteProp>().params;
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const width = useWindowDimensions().width;


  useEffect(() => {
    if(order) {
      dispatch(resetOrderAction() as any);
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "back"
    })
  }, [navigation, basketId])

  const submitFunction = async () => {
      if(basketId && address?.length > 0 && zipcode?.length > 0 && city?.length > 0) {
        const request : ORDER_REQUEST = {
          basketID: basketId,
          address: address,
          zipcode: zipcode,
          city: city
        }
        if(note?.length > 0) {
          request.note = note
        }
        await dispatch(createOrderAction(request, navigation) as any);
        setAddress("")
        setNote("")
        setCity("")
        setZipcode("")
      } else {
        Alert.alert("please fill in required information");
      }
  }


  return (
    <KeyboardAvoidingView style={tw('flex-1 bg-white')}>
          <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
              <ScrollView style={tw('flex-1  px-4')}>     
                  <Text style={tw('text-black mx-auto text-3xl mt-10 mb-10')}>Check Out</Text>    
                  <View style={tw('w-full')}>
                    <Text style={tw('text-black ml-2 mb-2')}>Leave note for courier (optionally)</Text>        
                    <TextInput value={note} placeholder="note" onChangeText={(text: string) => setNote(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>  
                  </View>  
                  <TextInput value={address} placeholder="address" onChangeText={(text: string) => setAddress(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
                  <TextInput  value={zipcode}  placeholder="zipcode" onChangeText={(text: string) => setZipcode(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} ></TextInput>
                  <TextInput value={city} placeholder="city" onChangeText={(text: string) => setCity(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={submitFunction}></TextInput>
                  <Button  color="#6203fc" containerStyle={tw('w-full rounded-lg mb-6 mt-10')} size='lg' title='Place Order' onPress={submitFunction}></Button>
                         
              </ScrollView>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({})