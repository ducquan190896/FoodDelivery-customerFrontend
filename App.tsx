import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import store from './src/store/store';
import { Provider } from 'react-redux';
import MainStack from './src/navigators/MainStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

    const bottomsheetRef = useRef(null);
    const snapPonits = useMemo(() => ['10', '50'], [])
    const handleSheetChange = useCallback((index: any) => {
        console.log(index)
    }, [])


  return (
    //@ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>   
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <NavigationContainer>
            <MainStack></MainStack>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </TailwindProvider>
  )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
         backgroundColor: 'grey'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'grey'
    }
})