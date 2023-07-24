import { FlatList, ListRenderItem, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import React , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import RestaurantCard from '../components/RestaurantCard';
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import LocationUpdateBottomSheet from '../components/LocationUpdateBottomSheet';
import { TextInput } from 'react-native-gesture-handler';
import { Tile } from '@rneui/base';

export type SearchRestaurantsNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "SearchRestaurants">,
BottomTabNavigationProp<BottomTabProps>
>;


const SearchRestaurants = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const navigation = useNavigation<SearchRestaurantsNavigationProp>();
    const tw = useTailwind();
    const {restaurants, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const [filterRestaurants, setFilterRestaurants] = useState<RESTAURANT[] | []>([])
    const [keyword, setKeyword] = useState<string>("");
    const width = useWindowDimensions().width;

    const loadRecommendedRestaurants = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(recommendedRestaurantsAction() as any);
        setIsRefreshing(false);
      }, [authUser, restaurants]);
    
      useEffect(() => {
        setIsLoading(true);
        setKeyword("")
        loadRecommendedRestaurants().then(() => setIsLoading(false));
      }, [authUser])

      useEffect(() => {
        setFilterRestaurants(restaurants);
      }, [restaurants])

      useEffect(() => {
        if(keyword.length > 0) {
            setFilterRestaurants(restaurants.filter((res: RESTAURANT) => res.name.includes(keyword.toLowerCase())));
        }
      }, [keyword])    
    
      const handleRenderItem: ListRenderItem<any> = ({item}: {item: RESTAURANT}) => {
        return (
           <RestaurantCard restaurant={item} navigation={navigation}></RestaurantCard>
        )
      }

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100 bg-white')}>
        <View style={[tw('flex-1 items-center justify-center w-full h-full ')]}>
            <View style={tw('w-full my-2 relative px-4 flex-row items-center')}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[{ height: 40, width: 40, zIndex: 10}, tw('bg-gray-200 rounded-full items-center justify-center mr-2')]}>
                    <AntDesign name='arrowleft' size={30} color="#f7691a"></AntDesign>
                </TouchableOpacity>
                <View style={[tw('absolute top-2'), {zIndex: 10, left: 70}]}>
                    <Entypo name='magnifying-glass' size={30} color="#f7691a"></Entypo>
                </View>
                <TextInput value={keyword} onChangeText={setKeyword} placeholder='restaurant name' style={[tw(' py-2 bg-gray-200 rounded-full text-black text-lg'), {paddingLeft: 50, width: width - 70}]}></TextInput>
            </View>
            {filterRestaurants && filterRestaurants.length > 0 && (
                <FlatList 
                    //   refreshing={isrefreshing}
                    //   onRefresh={loadRecommendedRestaurants}
                    data={  filterRestaurants}
                    keyExtractor={(item: any) => item.id}
                    renderItem={handleRenderItem}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
            )}
        </View> 
    </SafeAreaView>
  )
}

export default SearchRestaurants

const styles = StyleSheet.create({})