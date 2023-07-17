

export interface USER {
    id: number,
    username: string,
    firstname: string,
    surename: string,
    roles: string[],
    longitude: number |null,
    latitude: number |null,
    imageurl: string | null
}

export interface declaredStateUser  {
    authUser: USER | {},
    userUpdateStatus: boolean,
    userUpdated: USER | {},
    message: string | null,
    authSuccess: boolean,
    authError: boolean
}

export interface ACTION {
    type: string,
    payload?: any
}

export interface LoginForm {
    username: string,
    password: string,
    longitude: number |null,
    latitude: number |null
}

export interface UserRegisterForm {
    username: string,
    firstname: string,
    surename: string,
    password: string,
}

export interface CHANGEPASSWORD {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface RESTAURANT {
    id: number,
    name: string,
    address: string,
    imageurl: string | null,
    owner: number,
    city: string,
    zipcode: string,
    latitude: number,
    longitude: number,
    rating: number,
    cookingTime: number,
    distance: number,
    estimatedTime: number | null,
    cratedDate: string,
    updatedDate: string
}

export interface declaredStateRestaurant  {
    restaurant: RESTAURANT | {},
    restaurants: RESTAURANT[] | [],
    message: string | null,
    restaurantSuccess: boolean,
    restaurantError: boolean
}

export interface DISH {
    id: number,
    name: string,
    imageurl: string | null,
    description: string,
    price: number,
    availability: boolean,
    restaurant: number,
    cratedDate: string,
    updatedDate: string
}

export interface declaredStateDish  {
    dish: DISH | {},
    dishes: DISH[] | [],
    message: string | null,
    dishSuccess: boolean,
    dishError: boolean
}

export interface BASKET {
    id: number,
    quantity: number,
    total: number,
    restaurant: number,
    customer: number
}


export interface declaredStateBasket  {
    basket: BASKET | {},
    message: string | null,
    basketSuccess: boolean,
    basketError: boolean
}

export interface BASKETDISH {
    id: number,
    quantity: number,
    dish: DISH,
    basket: number
}

export interface declaredStateBasketDish  {
    basketDish: BASKETDISH | {},
    basketDishes: BASKETDISH[] | [],
    message: string | null,
    basketDishSuccess: boolean,
    basketDishError: boolean
}

export interface CUSTOMER {
    id: number,
    user: USER
}

export interface declaredStateCustomer  {
    customer: CUSTOMER | {},
    message: string | null,
    customerSuccess: boolean,
    customerError: boolean
}

