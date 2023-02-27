import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApiSource {
    static async restaurantList() {
        try {
            const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
            const responseJson = await response.json();
            return responseJson.restaurants;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async restaurantDetail(id) {
        try {
            const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
            const responseJson = await response.json();
            return responseJson.restaurant;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async searchRestaurant(keyword) {
        try {
            const response = await fetch(API_ENDPOINT.RESTAURANT_SEARCH(keyword));
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async insertCustomerReview(review) {
        console.log(review);

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            };

            const response = await fetch(API_ENDPOINT.RESTAURANT_POST_REVIEW, options);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default RestaurantApiSource;
