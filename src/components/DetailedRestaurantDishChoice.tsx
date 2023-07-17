import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, Button } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { DISH } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IncreaseDecreaseNumber from './IncreaseDecreaseNumber';
import { useDispatch, useSelector } from 'react-redux';
import { basketDishByDishAndBasketAction, resetBasketDishItemAction, addBasketDishAction, removeBasketDishAction, updateBasketDishAction } from '../store/actions/BasketDishAction';
import { RootState } from '../store/store';
import { basketByIdAction } from '../store/actions/BasketAction';
type DishChoiceComponent = {
    dish: DISH,
    basket: number,
    closeModal: () => void
}

const DetailedRestaurantDishChoice = ({dish, basket, closeModal}: DishChoiceComponent) => {
    const [quantity, setQuantity] = useState<number>(1);
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const dispatch = useDispatch();
    const {basketDish} = useSelector((state: RootState) => state.BASKETDISHES);

    const loadBasketDish = useCallback( async () => {
        dispatch(basketDishByDishAndBasketAction(dish.id, basket) as any)
        dispatch(resetBasketDishItemAction() as any);
    }, [basket, dish])

    useEffect(() => {
        console.log("basket " + basket + " , dish: " + dish.id);
        loadBasketDish();
    }, [basket, dish])

    useEffect(() => {
        if(basketDish) {
            setQuantity(basketDish.quantity);
        } else {
            setQuantity(1);
        }
    }, [basket, dish, basketDish])


    const addDishToBasket = async () => {
        await dispatch(addBasketDishAction(dish?.id, basket, quantity) as any);
        dispatch(basketByIdAction(basket) as any);
        closeModal();
    }

    const updateBasket = async () => {
        if(basketDish) {
            dispatch(updateBasketDishAction(basketDish?.id, quantity) as any)
            dispatch(basketByIdAction(basket) as any);
            closeModal();
        }
    }

    const removeBasketDish = async () => {
        if(basketDish) {
            await dispatch(removeBasketDishAction(basketDish.id) as any);
            dispatch(basketByIdAction(basket) as any);
            closeModal();
        }
    }

  return (
    <View style={[{width: width, position: "relative"}, tw('px-4')]}>
      <TouchableOpacity onPress={closeModal} style={[tw('absolute top-0 right-4 bg-gray-200 rounded-full items-center justify-center'), {width: 40, height: 40}]}>
        <AntDesign name="down" size={26} color="black"></AntDesign>
      </TouchableOpacity>
      <Text style={tw('text-3xl font-bold mb-2 text-black mt-10')}>{dish.name}</Text>
      <Text style={tw('text-lg font-bold mb-2 text-blue-500')}>Price: {Math.round(dish.price * 100 / 100).toFixed(2)}</Text>
      <Text style={tw('text-lg mb-2 text-black')}>{dish.description}</Text>
      <View style={[{width: "100%", height: 1}, tw('bg-gray-300 my-6')]}></View>
      {quantity && !basketDish && (
        <View style={tw('flex flex-row items-center justify-center w-full')}>
                <IncreaseDecreaseNumber currentNum={quantity} setCurrentNum={setQuantity}></IncreaseDecreaseNumber>
                <TouchableOpacity onPress={addDishToBasket} style={tw('px-4 py-2 bg-blue-500 rounded-md ml-6')}>
                    <Text style={tw('text-white text-lg')}>Add To Basket €{Math.round(dish.price * quantity * 100 / 100).toFixed(2)}</Text>
                </TouchableOpacity>
        </View>
      )}
      {quantity && basketDish && (
        <View style={tw('flex flex-row items-center justify-center w-full')}>
                <IncreaseDecreaseNumber currentNum={quantity} setCurrentNum={setQuantity}></IncreaseDecreaseNumber>
                <TouchableOpacity onPress={updateBasket} style={tw('px-2 py-2 bg-blue-500 rounded-md ml-2')}>
                    <Text style={tw('text-white text-lg')}>Update Basket €{Math.round(dish.price * quantity * 100 / 100).toFixed(2)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeBasketDish} style={tw('px-2 py-2 bg-red-500 rounded-md ml-2')}>
                    <Ionicons name="trash" size={20} color="white"></Ionicons>
                </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default DetailedRestaurantDishChoice

const styles = StyleSheet.create({})