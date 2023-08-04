import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import RestaurantReducer from './reducers/RestaurantReducer';
import DishReducer from './reducers/DishReducer';
import BasketDishReducer from './reducers/BasketDishReducer';
import BasketReducer from './reducers/BasketReducer';
import CustomerReducer from './reducers/CustomerReducer';
import OrderReducer from './reducers/OrderReducer';
import OrderDishReducer from './reducers/OrderDishReducer';



export const HOST_URL= "http://100.76.188.137:8080";
const initialState= {};

const rootReducer = combineReducers({
    USERS: userReducer,
    RESTAURANTS: RestaurantReducer,
    DISHES: DishReducer,
    BASKETDISHES: BasketDishReducer,
    BASKETS: BasketReducer,
    CUSTOMERS: CustomerReducer,
    ORDERS: OrderReducer,
    ORDERDISHES: OrderDishReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
   
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch