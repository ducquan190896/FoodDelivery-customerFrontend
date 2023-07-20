import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView, BackHandler } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import { ORDER, ORDERDISH, ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import moment from "moment";
import { Button } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { orderByIdAction, reorderingAction, resetOrderAction } from '../store/actions/OrderAction';
import LoadingComponent from '../components/LoadingComponent';
import { CompositeNavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabProps } from '../navigators/BottomTabs';
import { OrderStackParamList } from '../navigators/OrderStack';
import { RootState } from '../store/store';
import { orderDishesByOrderIdAction, resetOrderDishesAction } from '../store/actions/OrderDishAction';
import OrderDetailedItem from '../components/OrderDetailedItem';

export type CompletedOrderDetailedNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<OrderStackParamList, "CompletedOrderDetailed">,
BottomTabNavigationProp<BottomTabProps>>;

type CompletedOrderDetailedRouteProp = RouteProp<OrderStackParamList, "CompletedOrderDetailed">;

const CompletedOrderDetailed = () => {
    const navigation = useNavigation<CompletedOrderDetailedNavigationProp>();
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const tw = useTailwind();
    const dispatch = useDispatch();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {order, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
    const {orderDish, orderDishes} = useSelector((state: RootState) => state.ORDERDISHES);
    const orderID = useRoute<CompletedOrderDetailedRouteProp>().params.orderID; 


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

     useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.navigate("OrderListScreen");
                return true;
            }
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => backHandler.remove();
        }, [navigation])
     )
   

    const submitFunction = async () => {
        setIsLoading(true);
        await dispatch(reorderingAction(order?.id, navigation) as any);
        setIsLoading(false)
    }

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
    }

  return (
    <View style={tw('flex-1 bg-gray-200')}>
        <ScrollView style={tw('flex-1 bg-gray-200')}>
            <View style={tw('my-6 w-full px-8 mx-auto items-center justify-center')}>
                <Text style={tw('text-3xl font-bold text-black')}>Order Delivered</Text>
                <Text style={tw('text-base font-bold text-gray-400 mt-4')}>{moment(order?.updatedDate).format("MMMM Do YYYY")}</Text>
                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg my-2')} size='lg' title='Reordering' onPress={submitFunction}></Button>
            </View>
        
            <View style={tw('w-full my-2 bg-white py-2 px-4 flex items-start justify-start')}> 
                <Text style={tw('text-2xl font-bold text-black mb-4')}>Delivery Details</Text>
                <Text style={tw('text-lg font-bold text-zinc-400 mb-2')}>Address</Text>
                <Text style={tw('text-base text-black mb-4')}>{order?.address}, {order?.zipcode} {order?.city}</Text>
                {order?.note && (
                    <>
                        <View style={[{width: "100%", height: 1}, tw('bg-gray-300 mb-4')]}></View>
                        <Text style={tw('text-lg font-bold text-zinc-400 mb-2')}>Note</Text>
                        <Text style={tw('text-base text-black')}>{order?.note}</Text>
                    </>
                )}
            </View>
            <View style={tw('w-full my-2 bg-white py-2 px-4 flex items-start justify-start mb-4')}> 
                <Text style={tw('text-2xl font-bold text-black mb-4')}>Order Summary</Text>
                {orderDishes?.length > 0 && orderDishes.map((orderDish: ORDERDISH, index: number) => <OrderDetailedItem key={index} orderDish={orderDish}></OrderDetailedItem>)}
                <View style={[{width: "100%", height: 1}, tw('bg-gray-300 mb-4')]}></View>
                <View style={tw('w-full flex-row items-center justify-between  my-2 px-4')}>
                    <Text style={[tw('text-black font-bold mr-4'), {fontSize: 18}]}>Delivery fee</Text>
                    <Text style={tw('text-black')}>{order?.deliveryFee?.toFixed(2)} €</Text>
                </View>
                <View style={tw('w-full flex-row items-center justify-between  my-2 pb-4 px-4')}>
                    <Text style={[tw('text-black font-bold mr-4'), {fontSize: 18}]}>Total</Text>
                    <Text style={tw('text-black')}>{order?.finalPrice?.toFixed(2)} €</Text>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default CompletedOrderDetailed

const styles = StyleSheet.create({})