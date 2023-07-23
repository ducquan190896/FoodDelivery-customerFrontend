import { FlatList, ListRenderItem, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import React , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
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
import RestaurantCard from '../components/RestaurantCard';
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import LocationUpdateBottomSheet from '../components/LocationUpdateBottomSheet';

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPonits = useMemo(() => ['3', '25', '60'], [])
  const width = useWindowDimensions().width;
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const handleSheetChange = useCallback((index: any) => {
      console.log(index)
  }, []);

  const handlePresentModalPress = useCallback( () => {
      bottomSheetModalRef.current?.present();
      
  }, []);

  const handleDismissModalPress = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
      
  }, []);

  const handleExpandModalPress = useCallback( () => {
    bottomSheetModalRef.current?.expand();
    
  }, []);


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

  const navigateToMap = () => {
    navigation.navigate("MapRestaurants")
  }
  const navigateToSearchEngine = () => {
    navigation.navigate("SearchRestaurants")
  }

  if(isLoading) {
    return <LoadingComponent/>
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tw('flex-1 bg-gray-100 bg-white')}>
        <View style={tw('flex flex-row justify-between items-center w-full px-2 mt-2')}>
          <TouchableOpacity onPress={handlePresentModalPress} style={tw('flex flex-row justify-start items-start flex-1')}>
            <Entypo name='location-pin' size={40} color="#f7691a"></Entypo>
            {!currentLocation ? (
              <Text style={[tw('text-lg font-bold text-[#f7691a] my-2 ml-4'), {fontFamily: "Segoe UI"}]}>Restaurants near you</Text>
            ): (
              <Text style={[tw('text-lg font-bold text-[#f7691a] my-2 ml-4'), {fontFamily: "Segoe UI"}]}>{currentLocation}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSearchEngine} style={tw('mr-4')}>
            <Entypo name='magnifying-glass' size={30} color="#f7691a"></Entypo>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToMap} style={tw('')}>
            <Entypo name='map' size={28} color="#f7691a"></Entypo>
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
        <View style={[styles.container, tw('')]}>
                  <BottomSheetModal
                      ref={bottomSheetModalRef}
                      index={1}
                      snapPoints={snapPonits}
                      onChange={handleSheetChange} 
                      onDismiss={() => console.log("close bottomsheet")}
                  >
                      <View style={styles.contentContainer}>
                        <LocationUpdateBottomSheet expandModal={handleExpandModalPress} closeModal={handleDismissModalPress} setCurrentLocation={setCurrentLocation}></LocationUpdateBottomSheet>
                      </View>
                  </BottomSheetModal>
        </View>
    </SafeAreaView>
  </BottomSheetModalProvider>
  )
}

export default HomeScreen

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