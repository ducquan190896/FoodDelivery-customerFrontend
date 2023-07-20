import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ORDER, ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { OrderListScreenNavigationProp } from '../screens/OrderListScreen';
import { useNavigation } from '@react-navigation/native';
import moment from "moment"

const OrderCardInListOrders = ({order}: {order: ORDER}) => {
    const tw = useTailwind();
    const navigation = useNavigation<OrderListScreenNavigationProp>();

    const navigateFunction = () => {
        if(order.status != ORDER_STATUS.OWNER_REJECTED) {
            navigation.navigate("OrderDetailed", {orderID: order?.id});
            if(order.status == ORDER_STATUS.COMPLETED) {
                navigation.navigate("CompletedOrderDetailed", {orderID: order?.id});
            } else {
                navigation.navigate("OrderDetailed", {orderID: order?.id});
            }
        }
    }

    const statusNotification = () => {
        if(order?.status == ORDER_STATUS.COMPLETED) {
            return "Completed";
        } else if(order?.status == ORDER_STATUS.NEW) {
            return "New";
        } else if(order?.status == ORDER_STATUS.COOKING) {
            return "In Cooking";
        } else if(order?.status == ORDER_STATUS.OWNER_REJECTED) {
            return "Decline";
        } else if(order?.status == ORDER_STATUS.PICKED_UP) {
            return "Picked Up";
        } else if(order?.status == ORDER_STATUS.READY_FOR_PICKUP) {
            return "Waiting for courier";
        } else if(order?.status == ORDER_STATUS.COURIER_ACCEPTED || order?.status == ORDER_STATUS.COURIER_REJECTED) {
            return "In Cooking";
        } 
    }

  return (
    <TouchableOpacity onPress={navigateFunction} style={[tw(`my-2 bg-[#FCE4D6] rounded-lg border-2 ${order?.status == ORDER_STATUS.COMPLETED ? "border-gray-300" : order?.status == ORDER_STATUS.OWNER_REJECTED ? "border-red-500" : "border-blue-500"} py-2 items-center justify-center`), {with: "60%"}]}>
        <Text style={tw('text-lg font-bold text-black')}>{order?.restaurant?.name}</Text>
        <View style={tw('w-full mb-2 mt-4 flex-row items-center justify-between px-4')}>
            <Text style={tw('text-base text-black')}>Order status:</Text>
            <Text style={tw(`text-base ${order?.status == ORDER_STATUS.COMPLETED ? "text-black" :  order?.status == ORDER_STATUS.OWNER_REJECTED ? "text-red-500 font-bold" : "text-blue-500 font-bold"}`)}>{statusNotification()}</Text>
        </View>
        { order?.status != ORDER_STATUS.OWNER_REJECTED && (
            <>    
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Delivered at:</Text>
                    <Text style={tw('text-base text-black')}>{moment(order?.updatedDate).format("DD-MM-YYYY")}</Text>
                </View>
                <View style={tw('w-full mb-2 flex-row items-start justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Delivered to:</Text>
                    <View style={[{width: "60%"}, tw('flex items-end')]}>
                        <Text style={tw('text-base text-black')}>{order?.address}, {order?.city?.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Total Price:</Text>
                    <Text style={tw('text-base text-black')}>€ {order?.finalPrice?.toFixed(2)}</Text>
                </View>
            </>
        )}
         { order?.status == ORDER_STATUS.OWNER_REJECTED && (
            <>    
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Ordered at:</Text>
                    <Text style={tw('text-base text-black')}>{moment(order?.updatedDate).format("DD-MM-YYYY")}</Text>
                </View>
            </>
        )}
    </TouchableOpacity>
  )
}

export default OrderCardInListOrders

const styles = StyleSheet.create({})