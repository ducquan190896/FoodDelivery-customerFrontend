import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HOST_URL } from "../store";
import { REVIEW } from "../../model/index.d";

export const getReviewByIdAction = async (reviewID: number) => {
     try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
        } else {
            const res = await axios.get(HOST_URL + "/api/reviews/review/id/" + reviewID, {
                headers: {
                    "Authorization": token
                }
            });
            const data : REVIEW = res.data;
            console.log("review_by_id");
            console.log(res.data);
            return data;
        }
    } catch (err) {
        console.log("loading of the review failed"  + err);
    }
}

export const getReviewByRestaurantAndAuthUserAction = async (restaurantID: number) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token"); 
       if(token == null) {
           console.log("token is null");
       } else {
           const res = await axios.get(HOST_URL + "/api/reviews/review/restaurant/" + restaurantID, {
               headers: {
                   "Authorization": token
               }
           });
           const data : REVIEW= res.data;
           console.log("review_by_restaurant_and_customer");
           console.log(res.data);
           return data;
       }
   } catch (err) {
       console.log("loading of the review failed"  + err);
   }
}

export const checkReviewByRestaurantAndAuthUserAction = async (restaurantID: number) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token"); 
       if(token == null) {
           console.log("token is null");
       } else {
           const res = await axios.get(HOST_URL + "/api/reviews/checkReview/restaurant/" + restaurantID, {
               headers: {
                   "Authorization": token
               }
           });
           const data : boolean = res.data;
           console.log("check_review");
           console.log(res.data);
           return data;
       }
   } catch (err) {
       console.log("loading of the review failed"  + err);
       return false;
   }
}

export const createNewReviewAction = async (restaurantID: number, rate: number) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token"); 
       if(token == null) {
           console.log("token is null");
       } else {
           const res = await axios.post(HOST_URL + `/api/reviews/review/restaurant/${restaurantID}/rate/${rate}`, {},{
               headers: {
                   "Authorization": token
               }
           });
           const data : REVIEW = res.data;
           console.log("create_review");
           console.log(res.data);
           return data;
       }
   } catch (err) {
       console.log("loading of the review failed"  + err);
   }
}