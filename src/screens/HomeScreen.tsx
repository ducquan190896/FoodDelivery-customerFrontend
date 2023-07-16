import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React , {useCallback, useEffect, useState} from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabProps } from '../Navigators/BottomTabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../navigators/MainStack';
import { useTailwind } from 'tailwind-rn';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { recommendedRestaurantsAction } from '../store/actions/RestaurantAction';
import LoadingComponent from '../components/LoadingComponent';
import { RESTAURANT } from '../model/index.d';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RestaurantCard from '../components/RestaurantCard';

export type MainHomeNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "HomeScreen">,
BottomTabNavigationProp<BottomTabProps>
>;


const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<MainHomeNavigationProp>();
  const tw = useTailwind();
  const {restaurants, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();

  const loadRecommendedRestaurants = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(recommendedRestaurantsAction() as any);
    setIsRefreshing(false);
  }, [authUser, restaurants]);

  useEffect(() => {
    setIsLoading(true);
    loadRecommendedRestaurants().then(() => setIsLoading(false));
  }, [authUser])


  const handleRenderItem: ListRenderItem<any> = ({item}: {item: RESTAURANT}) => {
   
    return (
       <RestaurantCard restaurant={item} navigation={navigation}></RestaurantCard>
    )
  }

  if(isLoading) {
    return <LoadingComponent/>
  }

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100 bg-white')}>
      <View style={tw('flex flex-row justify-between items-center w-full px-2')}>
        <View style={tw('flex flex-row justify-start items-start flex-1')}>
          <Entypo name='location-pin' size={40} color="#3b82f6"></Entypo>
          <Text style={[tw('text-lg font-bold text-blue-500 my-2 ml-4'), {fontFamily: "Segoe UI"}]}>Restaurants near you</Text>
        </View>
        <TouchableOpacity style={tw('')}>
          <Entypo name='map' size={28} color="black"></Entypo>
        </TouchableOpacity>
      </View>
      <View style={[tw('flex-1 items-center justify-center w-full h-full ')]}>
        <FlatList 
            refreshing={isrefreshing}
            onRefresh={loadRecommendedRestaurants}
            data={ restaurants && restaurants.length > 0 && restaurants}
            keyExtractor={(item: any) => item.id}
            renderItem={handleRenderItem}
            showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View> 
  </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})