import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useTailwind } from 'tailwind-rn';
import { Rating } from 'react-native-ratings';
import { createNewReviewAction } from '../store/actions/ReviewAction';
import { useDispatch } from 'react-redux';
import { restaurantByIdAndAuthCustomerAction } from '../store/actions/RestaurantAction';

type REVIEWFORMPROPS = {
    restaurantId: number,
    closeReviewForm: () => void,
    setReviewExist: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewForm = ({restaurantId, closeReviewForm, setReviewExist}: REVIEWFORMPROPS) => {
    const tw = useTailwind();
    const [rate, setRate] = useState<number>(4);
    const dispatch = useDispatch();

    const ratingCompleted = (rating: number) => {
        setRate(rating);
    }

    const addRateHandler = async () => {
        await createNewReviewAction(restaurantId, rate);
        dispatch(restaurantByIdAndAuthCustomerAction(restaurantId) as any);
        setReviewExist(true);
        closeReviewForm();
    }

  return (
    <View style={tw('w-full mt-10')}>
        <Rating
            type='star'
            ratingCount={5}
            imageSize={40}
            startingValue={rate}
            onFinishRating={(rating: number) => ratingCompleted(rating)}
        />
        <TouchableOpacity onPress={addRateHandler} style={[tw('bg-[#f7691a] mx-auto rounded-full px-6 py-2 items-center justify-center'), {marginTop: 50}]}>
            <Text style={tw('text-white font-bold text-lg')}>Rate Restaurant</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
    rating: {
        paddingVertical: 10,
    }
})