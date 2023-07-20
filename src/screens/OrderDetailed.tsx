import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';
import { useTailwind } from 'tailwind-rn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabProps } from '../navigators/BottomTabs';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { orderByIdAction, resetOrderAction, updateOrderFromWebsocket } from '../store/actions/OrderAction';
import { orderDishesByOrderIdAction, resetOrderDishesAction } from '../store/actions/OrderDishAction';
import { ORDER, ORDER_STATUS } from '../model/index.d';
import { OrderStackParamList } from '../navigators/OrderStack';
import LoadingComponent from '../components/LoadingComponent';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DetailedOrderBottomSheet from '../components/DetailedOrderBottomSheet';
import axios from 'axios';
import SockJS from "sockjs-client";
import {over} from "stompjs"
import AsyncStorage from '@react-native-async-storage/async-storage';



const GOOGLE_MAPS_APIKEY = '';


export type OrderDetailedNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<OrderStackParamList, "OrderDetailed">,
BottomTabNavigationProp<BottomTabProps>>;

type OrderDetailedRouteProp = RouteProp<OrderStackParamList, "OrderDetailed">;

type LOCATION = {
  longitude: number,
  latitude: number
}

const OrderDetailed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<ORDER | null>(null);
  const [origin, setOrigin] = useState<LOCATION | null>(null);
  const [destination, setDestination] = useState<LOCATION | null>(null);
  const tw = useTailwind();
  const navigation = useNavigation<OrderDetailedNavigationProp>();
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const {order, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
  const {orderDish, orderDishes} = useSelector((state: RootState) => state.ORDERDISHES);
  const dispatch = useDispatch();
  const map = useRef<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25', '90'], [])
  const orderID = useRoute<OrderDetailedRouteProp>().params.orderID; 
  // const orderID = 1;
  const [stompClient, setStompClient] = useState<any | null>(null);


  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const loadOrder = useCallback(async () => {
     if(orderID) {
      await dispatch(resetOrderAction() as any)
      dispatch(orderByIdAction(orderID) as any);
     }
  }, [authUser, orderID]);

  const loadOrderDishes = useCallback(async () => {
    if(orderID) {
      setIsRefreshing(true);
      await dispatch(resetOrderDishesAction() as any)
      await dispatch(orderDishesByOrderIdAction(orderID) as any);
      setIsRefreshing(false);
    } 
  }, [authUser, orderID]);

  useEffect(() => {
    setIsLoading(true);
    loadOrder().then(() => loadOrderDishes()).then(() => setIsLoading(false))
  }, [orderID, authUser])

  useEffect(() => {
    if(order ) {
      setActiveOrder(order)
      setOrigin({
        longitude: order?.fromLongitude,
        latitude: order?.fromLatitude
      })
      setDestination({
        longitude: order?.toLongitude,
        latitude: order?.toLatitude
      })
    }
  }, [order, orderID])

  useEffect(() => {
    if(origin && destination) {
      console.log(origin);
      console.log(destination);
    }
  }, [origin, destination])


  const connect =  async () => {
    const token = await AsyncStorage.getItem("token");
    let sock = SockJS(HOST_URL + "/socket");
    let stompClient = over(sock);
    setStompClient(stompClient);
    if(stompClient.status !== "CONNECTED") {
      stompClient.connect({Authorization: token}, (frame: any) => {
        stompClient.subscribe(`/order/${orderID}`, orderUpdated)
      }, notConnected)
    }
  }

  const orderUpdated = (payload: any) => {
    const orderUpdated : ORDER = JSON.parse(payload.body);
    console.log("order received from websocket");
    console.log(orderUpdated);
    if(orderUpdated.id == orderID) {
      setActiveOrder(orderUpdated);
      // update the order in order list of redux store
      dispatch(updateOrderFromWebsocket(orderUpdated) as any);
    }
  }

  const notConnected = () => {
    console.log("not connected")
  }

  useEffect(() => {
    if(stompClient == null && orderID) {
      connect();
    }
  }, [stompClient])

  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
  }

  if(!activeOrder) {
    return (
      <View style={tw('flex-1 items-center justify-center')}>
        <Text>No order</Text>
      </View>
    )
  }

  return (
    <View style={tw('flex-1 relative')}>
      <TouchableOpacity onPress={() => navigation.navigate("OrderListScreen")} style={[{top: 10, left: 10, height: 40, width: 40, zIndex: 10}, tw('bg-white rounded-full absolute items-center justify-center')]}>
                <AntDesign name='arrowleft' size={26} color="#f7691a"></AntDesign>
      </TouchableOpacity>
      {activeOrder  && activeOrder?.id == orderID && destination && origin && (
        <>
          <MapView      
                ref={map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                style={{height: "100%", width: "100%"}}
                provider={PROVIDER_GOOGLE}  
          >
              <Marker
                  coordinate={destination}
                  title="your home"
              >
                  <View style={{
                    backgroundColor:"white",
                    padding: 2,
                    borderRadius: 20,
                    borderColor: "grey",
                    borderWidth: 1,
                  }}>
                    <Entypo name='home' size={24} color="#f7691a"></Entypo>
                  </View>
              </Marker>
              <Marker
                  coordinate={origin}
                  title={order?.restaurant?.name}
              >
                  <View style={{
                    backgroundColor:"white",
                    padding: 2,
                    borderRadius: 20,
                    borderColor: "grey",
                    borderWidth: 1,
                  }}>
                    <Ionicons name="fast-food" size={24} color="#f7691a" />
                  </View>
              </Marker>
          </MapView>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetScrollView>
              <DetailedOrderBottomSheet order={activeOrder} orderDishes={orderDishes}></DetailedOrderBottomSheet>
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      )} 
    </View>
  )
}

export default OrderDetailed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});