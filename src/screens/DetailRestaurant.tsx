import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
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
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import DetailedRestaurantHeader from '../components/DetailedRestaurantHeader';
import DetailedRestaurantDishChoice from '../components/DetailedRestaurantDishChoice';
import { basketByAuthUserAndRestaurantAction, resetBasketAction } from '../store/actions/BasketAction';

const imageDefault = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

export type DetailRestaurantNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "DetailRestaurant">,
BottomTabNavigationProp<BottomTabProps>
>;

type DetailedRestaurantRouteProp = RouteProp<RestaurantStackParamList, "DetailRestaurant">;

const DetailRestaurant = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const [food, setFood] = useState<DISH | null>(null);
    const navigation = useNavigation<DetailRestaurantNavigationProp>();
    const tw = useTailwind();
    const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const {dishes, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const { basket, basketError, basketSuccess} = useSelector((state: RootState) => state.BASKETS);
    const dispatch = useDispatch();
    const {restaurantId} = useRoute<DetailedRestaurantRouteProp>().params;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPonits = useMemo(() => ['3', '40'], [])
    const width = useWindowDimensions().width;

    const handleSheetChange = useCallback((index: any) => {
        console.log(index)
    }, []);

    const handlePresentModalPress = useCallback((item: DISH) => {
        bottomSheetModalRef.current?.present();
        setFood(item);
    }, []);

    const handleDismissModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
        setFood(null);
    }, []);


    const loadRestaurant = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(restaurantByIdAndAuthCustomerAction(restaurantId) as any);
        setIsRefreshing(false);
    }, [authUser, restaurantId]);

    const loadBasket = useCallback(async () => {
        await dispatch(resetBasketAction() as any)
        dispatch(basketByAuthUserAndRestaurantAction(restaurantId) as any);
    }, [authUser, restaurantId]);


    const loadDishes = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(dishesByRestaurantAction(restaurantId) as any);
        setIsRefreshing(false);
    }, [authUser, restaurant]);

    const handleRenderItem: ListRenderItem<any> = ({item}: {item: DISH}) => {
        return (
           <DishComponent handlePressItem={() => handlePresentModalPress(item)} navigation={navigation} dish={item}></DishComponent>
        )
    }
    
    useEffect(() => {
        setIsLoading(true);
        loadRestaurant();
        loadBasket();
    }, [authUser, restaurantId])

    useEffect(() => {
        setIsLoading(true);
        loadDishes().then(() => setIsLoading(false));
    }, [restaurantId])

    const navigateToBasketScreen = () => {
        if(basket) {
             navigation.navigate("BasketScreen", {basketId: basket?.id, restaurantId: restaurantId})
        }
    }

    if(isLoading) {
        return <LoadingComponent/>
    }

  return (
    <BottomSheetModalProvider>
        <View style={tw('flex-1 relative')}>
            <FlatList
                ListHeaderComponent={() => <DetailedRestaurantHeader navigation={navigation} restaurant={restaurant}></DetailedRestaurantHeader>}
                refreshing={isrefreshing}
                onRefresh={loadDishes}
                data={dishes?.length > 0 && dishes}
                keyExtractor={(item: any) => item.id}
                renderItem={handleRenderItem}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPonits}
                    onChange={handleSheetChange} 
                    onDismiss={() => setFood(null)}
                >
                    <View style={styles.contentContainer}>
                        {food && basket && <DetailedRestaurantDishChoice basket={basket?.id} dish={food} closeModal={handleDismissModalPress}></DetailedRestaurantDishChoice>}
                    </View>
                </BottomSheetModal>
            </View>
            {basket && basket.total > 0 && (
                <TouchableOpacity onPress={navigateToBasketScreen} style={[tw('absolute bg-blue-500 rounded-md items-center justify-center'), {bottom: 10, left: width/4, width: width / 2, height: 50}]}>
                    <Text style={tw('text-white font-bold text-lg')}>{basket.quantity} items  -  €{Math.round(basket.total * 100 / 100).toFixed(2)}</Text>
                </TouchableOpacity>
            )}
        </View>
    </BottomSheetModalProvider>
  )
}

export default DetailRestaurant

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%"
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    }
})