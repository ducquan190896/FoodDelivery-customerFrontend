import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabProps } from '../navigators/BottomTabs';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { restaurantByIdAction, restaurantByIdAndAuthCustomerAction } from '../store/actions/RestaurantAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { dishesByRestaurantAction } from '../store/actions/DishAction';
import LoadingComponent from '../components/LoadingComponent';
import { DISH } from '../model/index.d';
import DishComponent from '../components/DishComponent';

const imageDefault = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

export type DetailRestaurantNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "DetailRestaurant">,
BottomTabNavigationProp<BottomTabProps>
>;

type DetailedRestaurantRouteProp = RouteProp<RestaurantStackParamList, "DetailRestaurant">;

const DetailRestaurant = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const navigation = useNavigation<DetailRestaurantNavigationProp>();
    const tw = useTailwind();
    const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const {dishes, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const {restaurantId} = useRoute<DetailedRestaurantRouteProp>().params;
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;


    const loadRestaurant = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(restaurantByIdAndAuthCustomerAction(restaurantId) as any);
        setIsRefreshing(false);
    }, [authUser, restaurant]);

    const loadDishes = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(dishesByRestaurantAction(restaurantId) as any);
        setIsRefreshing(false);
    }, [authUser, restaurant]);

    const handleRenderItem: ListRenderItem<any> = ({item}: {item: DISH}) => {
        return (
           <DishComponent navigation={navigation} dish={item}></DishComponent>
        )
    }
    
    useEffect(() => {
        setIsLoading(true);
        loadRestaurant();
    }, [authUser])

    useEffect(() => {
        setIsLoading(true);
        loadDishes().then(() => setIsLoading(false));
    }, [restaurantId])

    if(isLoading) {
        return <LoadingComponent/>
      }

  return (
    <ScrollView style={tw('flex-1 bg-white relative')}>
       
        <View style={tw('relative')}>
            <Image source={{uri: restaurant?.imageurl ? restaurant?.imageurl : imageDefault}} style={[tw('mb-2'), {height: height/3, width: width}]}></Image>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[{top: 10, left: 10, height: 40, width: 40, zIndex: 10}, tw('bg-white rounded-full absolute items-center justify-center')]}>
                <AntDesign name='arrowleft' size={26} color="black"></AntDesign>
            </TouchableOpacity>
        </View>
        <View style={tw('px-4')}>
            <Text style={tw('text-3xl font-bold text-black my-2')}>{restaurant?.name}</Text>
            <Text style={tw('text-lg text-black')}>{restaurant?.address}, {restaurant?.city} </Text>
            <View style={tw('flex flex-row items-center justify-start mt-6')}>
                <Entypo name={restaurant?.rating > 4 ?  "emoji-flirt" : (restaurant?.rating > 3) ? "emoji-happy" : restaurant?.rating > 2 ? "emoji-neutral" : "emoji-sad"} size={24} color="black"></Entypo>
                <Text style={tw('mx-2 ml-6 text-lg text-black')}>{(Math.round(restaurant?.rating * 100  / 100).toFixed(2))}</Text>
            </View>
            <View style={tw('flex flex-row items-center justify-start my-2 mb-8')}>
                <Ionicons name='bicycle' size={26} color="black"></Ionicons>
                <Text style={tw('mx-2 ml-6 text-lg text-black')}>Delivery in {restaurant?.estimatedTime - 5} - {restaurant?.estimatedTime + 5} minutes</Text>
            </View>
            {dishes && dishes.length > 0 && dishes.map((dish: DISH) => <DishComponent navigation={navigation} dish={dish} key={dish?.id}></DishComponent>)}
            
        </View>
    </ScrollView>
  )
}

export default DetailRestaurant

const styles = StyleSheet.create({})