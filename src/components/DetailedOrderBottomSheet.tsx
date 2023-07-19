import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import { ORDER, ORDERDISH, ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import OrderDetailedItem from './OrderDetailedItem';
import DeliveryProgressingBar from './DeliveryProgressingBar';

type BottomSheetProp = {
    order: ORDER,
    orderDishes: ORDERDISH[] | []
}

const DetailedOrderBottomSheet = ({order, orderDishes}: BottomSheetProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const orderCreatedTime = new Date(order?.createdDate);
    const estimatedTime = new Date(orderCreatedTime.getTime() + order?.totalTime * 60000)

  return (
    <View style={tw('flex-1 bg-gray-200')}>
      {/* <ScrollView style={tw('flex-1 bg-gray-200')}> */}
        {order?.status == ORDER_STATUS.COMPLETED && (
            <View style={tw('my-6 mx-auto')}>
                <Text style={tw('text-3xl font-bold text-black')}>Order Delivered</Text>
            </View>
        )}
        {order?.status != ORDER_STATUS.COMPLETED && (
            <View style={tw('w-full my-4  items-start justify-center')}>
                <View style={tw(' w-full flex-row items-start justify-center mb-4')}>
                    <Text style={tw('text-2xl font-bold text-black mr-8')}>Estimated Arrival: </Text>
                    <Text style={tw('text-2xl font-bold text-black')}>{estimatedTime.getHours()} : {estimatedTime.getMinutes()}</Text>
                </View>
                <DeliveryProgressingBar status={ORDER_STATUS.NEW}></DeliveryProgressingBar>
            </View>    
          )}
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
      {/* </ScrollView> */}
    </View>
  )
}

export default DetailedOrderBottomSheet

const styles = StyleSheet.create({})