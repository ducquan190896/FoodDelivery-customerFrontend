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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASKETDISH, DISH } from '../model/index.d';
import  {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { basketByIdAction, resetBasketAction } from '../store/actions/BasketAction';
import { basketDishesByBasketAction, resetAllBasketDishesAction } from '../store/actions/BasketDishAction';
import BasketScreenItem from '../components/BasketScreenItem';
import { restaurantByIdAndAuthCustomerAction } from '../store/actions/RestaurantAction';
import BasketScreenHeader from '../components/BasketScreenHeader';
import BasketScreenFooter from '../components/BasketScreenFooter';
import DetailedRestaurantDishChoice from '../components/DetailedRestaurantDishChoice';
import LoadingComponent from '../components/LoadingComponent';

export type BasketScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "BasketScreen">,
BottomTabNavigationProp<BottomTabProps>
>;

type BasketScreenRouteProp = RouteProp<RestaurantStackParamList, "BasketScreen">;

const BasketScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const [basketItem, setBasketItem] = useState<BASKETDISH |null>(null);
    const tw = useTailwind();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const { basket, basketError, basketSuccess} = useSelector((state: RootState) => state.BASKETS);
    const {basketDishes, basketDish} = useSelector((state: RootState) => state.BASKETDISHES);
    const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const dispatch = useDispatch();
    const {basketId, restaurantId} = useRoute<BasketScreenRouteProp>().params;
    const navigation = useNavigation<BasketScreenNavigationProp>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPonits = useMemo(() => ['3', '40'], [])
    const width = useWindowDimensions().width;


    const handleSheetChange = useCallback((index: any) => {
        console.log(index)
    }, []);

    const handlePresentModalPress = useCallback((item: BASKETDISH) => {
        bottomSheetModalRef.current?.present();
        setBasketItem(item)
    }, []);

    const handleDismissModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
        setBasketItem(null);
    }, []);

    const loadBasket = useCallback(async () => {
        await dispatch(resetBasketAction() as any)
        dispatch(basketByIdAction(basketId) as any);
    }, [authUser, basketId, basketDishes, basketDish]);

    const loadBasketDishes = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(resetAllBasketDishesAction() as any)
        await dispatch(basketDishesByBasketAction(basketId) as any);
        setIsRefreshing(false);
    }, [authUser, basketId]);

    const loadRestaurant = useCallback(async () => {
        await dispatch(restaurantByIdAndAuthCustomerAction(restaurantId) as any);
    }, [authUser, restaurantId]);

    useEffect(() => {
        setIsLoading(true);
        loadBasket().then(() => loadRestaurant()).then(() => loadBasketDishes()).then(() => setIsLoading(false));
    }, [basketId, authUser])

    const handleRenderItem: ListRenderItem<any> = ({item}: {item: BASKETDISH}) => {
        return (
           <BasketScreenItem handlePressItem={() => handlePresentModalPress(item)}  basketDish={item}></BasketScreenItem>
        )
    }

    const navigateToOrderScreen = () => {
        navigation.navigate("CheckoutScreen", {basketId: basket?.id})
    }

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
    }

  return (
    <BottomSheetModalProvider>
        <View style={tw('flex-1 relative bg-white')}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[{top: 30, left: 10, height: 40, width: 40, zIndex: 10}, tw('bg-white rounded-full absolute items-center justify-center bg-gray-300')]}>
                <AntDesign name='arrowleft' size={26} color="#f7691a"></AntDesign>
            </TouchableOpacity>
           {restaurant && basketDishes?.length > 0 && basket && (
                <FlatList
                    ListHeaderComponent={() => <BasketScreenHeader navigation={navigation} restaurant={restaurant}></BasketScreenHeader>}
                    refreshing={isrefreshing}
                    onRefresh={loadBasketDishes}
                    data={basketDishes}
                    keyExtractor={(item: any) => item.id}
                    renderItem={handleRenderItem}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <BasketScreenFooter price={basket.total} quantity={basket.quantity}></BasketScreenFooter>}
                />
           )}
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPonits}
                    onChange={handleSheetChange} 
                    onDismiss={() => setBasketItem(null)}
                >
                    <View style={styles.contentContainer}>
                        {basketItem && basket && <DetailedRestaurantDishChoice basket={basket?.id} dish={basketItem?.dish} basketDishId={basketItem.id} closeModal={handleDismissModalPress}></DetailedRestaurantDishChoice>}
                    </View>
                </BottomSheetModal>
            </View>
            {basket && basket.total > 0 && (
                <TouchableOpacity onPress={navigateToOrderScreen} style={[tw('absolute bg-[#f7691a] rounded-md items-center justify-center'), {bottom: 10, left: width/4, width: width / 2, height: 50}]}>
                    <Text style={tw('text-white font-bold text-lg')}>Go Checkout</Text>
                </TouchableOpacity>
            )}
        </View>
    </BottomSheetModalProvider>
  )
}

export default BasketScreen

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