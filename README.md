# Customer Mobile App - Food Delivery
The mobile app is used for customers to make an order from restaurants, and track the order location and status when the order is updated by its courier and restaurant.

# Food Delivery Project
The project aims to simulate the whole process of food delivery from the time when customer makes the order, then the restaurant confirms and cooks the order, the order is finally delivery by the courier to the customer's destination. The project focuses on the order delivery tracking in real-time, so all customer, restaurant, courier will be informed of the order's status whenever it's status get updated by other entities. The project includes three separate mobile apps for couriers, customers, and restaurants.  

The Food delivery project includes 4 repositories and was developed by Quan Doan And Hajri Mohamed.
- Customer mobile: Quan Doan 
- Restaurant mobile: Quan Doan
- Courier mobile: Hajri Mohamed
- Backend repository: Quan Doan

# Video demo for the customer app
link: https://www.youtube.com/watch?v=-0hClUvOCvw

# Features of the customer app
- Login and register user
- the app get user's current location whenever they sign in or sign up into the app
- user gets a list of restaurant based on the user's current location.
- users can change the location on mobile phone to get the new list of restaurants
- users can make a new order or re-order from their previous orders. The orders of the customer are only allowed to be made within 20 km from the restaurant to the customer location.
- users can track the real-time order status and location on map whenever the order's restaurant and courier update it.
- update user's profile and password


# Technologies for the project
- SpringBoot, Spring Security, Maven
- WebSocket
- PostgresSQL
- React-Native
- Typescript
- Tailwind CSS
