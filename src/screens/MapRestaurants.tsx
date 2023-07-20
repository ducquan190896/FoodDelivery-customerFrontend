import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';
import { useTailwind } from 'tailwind-rn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../navigators/RestaurantStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabProps } from '../navigators/BottomTabs';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { recommendedRestaurantsAction } from '../store/actions/RestaurantAction';
import LoadingComponent from '../components/LoadingComponent';
import { RESTAURANT } from '../model/index.d';
import RestaurantCustomMarker from '../components/RestaurantCustomMarker';

export type MapRestaurantsNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<RestaurantStackParamList, "MapRestaurants">,
BottomTabNavigationProp<BottomTabProps>>;

const MapRestaurants = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const tw = useTailwind();
  const navigation = useNavigation<MapRestaurantsNavigationProp>();
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const {restaurants, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const dispatch = useDispatch();
  const map = useRef<any>();

  const loadRecommendedRestaurants = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(recommendedRestaurantsAction() as any);
    setIsRefreshing(false);
  }, [authUser, restaurants]);

  useEffect(() => {
    setIsLoading(true);
    loadRecommendedRestaurants().then(() => setIsLoading(false));
  }, [authUser])

  if(isLoading) {
    return <LoadingComponent/>
  }

  return (
    <View style={tw('flex-1')}>
        <MapView      
            ref={map}
            initialRegion={{
              latitude: authUser?.latitude,
              longitude: authUser.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            style={{height: "100%", width: "100%"}}
            provider={PROVIDER_GOOGLE}  
        >
          <Marker
            coordinate={{
              latitude: authUser?.latitude,
              longitude: authUser.longitude
            }}
            title={"home"}
          >
            <View style={{
              backgroundColor:"white",
              padding: 2,
              borderRadius: 20,
              borderColor: "grey",
              borderWidth: 1,
            }}>
              <Entypo name='home' size={24} color="#f7691a"></Entypo>
            </View>
          </Marker>
          {restaurants.length > 0 && restaurants.map((item : RESTAURANT) => <RestaurantCustomMarker key={item?.id} restaurant={item}></RestaurantCustomMarker>)}
        </MapView>
    </View>
  )
}

export default MapRestaurants

const styles = StyleSheet.create({})