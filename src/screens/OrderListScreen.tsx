import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
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
import { AllOrdersofCustomerAction, completedOrdersAction, orderByIdAction, resetOrderAction } from '../store/actions/OrderAction';
import { ORDER, ORDER_STATUS } from '../model/index.d';
import { OrderStackParamList } from '../navigators/OrderStack';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticatedCustomerAction } from '../store/actions/CustomerAction';
import fakeOrders from "../dummyData/order.json"
import OrderCardInListOrders from '../components/OrderCardInListOrders';

export type OrderListScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<OrderStackParamList, "OrderListScreen">,
BottomTabNavigationProp<BottomTabProps>>;

const OrderListScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const tw = useTailwind();
  const navigation = useNavigation<OrderListScreenNavigationProp>();
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const {customer} = useSelector((state: RootState) => state.CUSTOMERS);
  const {orders, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
  const dispatch = useDispatch();

  const loadCustomer = useCallback( async () => {
      dispatch(authenticatedCustomerAction() as any);
  }, [authUser])

  const loadOrders = useCallback(async () => {
    if(customer) {
      setIsRefreshing(false)
      await dispatch(resetOrderAction() as any)
      dispatch(AllOrdersofCustomerAction(customer?.id) as any);
      setIsRefreshing(true)
    }
  }, [authUser, customer]);

  useEffect(() => {
    loadCustomer();
  }, [authUser])

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => setIsLoading(false));
  }, [customer])

  const handleRenderItem: ListRenderItem<any> = ({item}: {item: ORDER}) => {
      return (
        <OrderCardInListOrders order={item}></OrderCardInListOrders>
      )
  }

  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
  }

  if(orders?.length <= 0) {
    return (
      <SafeAreaView style={tw('flex-1 items-center justify-center bg-white ')}>
        <Text style={tw('font-bold text-lg text-[#f7691a]')}>You Have No Orders</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={tw('flex-1 items-center justify-start bg-white ')}>
      <View style={[tw('flex-1 w-full '), {paddingHorizontal: 40}]}>
       <FlatList
                ListHeaderComponent={() => <Text style={tw('text-2xl mx-auto font-bold text-[#f7691a] my-4')}>Your Orders</Text>}
                // refreshing={isrefreshing}
                // onRefresh={loadOrders}
                data={orders}
                keyExtractor={(item: any) => item.id}
                renderItem={handleRenderItem}
                showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default OrderListScreen

const styles = StyleSheet.create({})