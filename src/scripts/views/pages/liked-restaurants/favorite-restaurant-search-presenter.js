/* eslint-disable class-methods-use-this */
class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants, view }) {
        this._view = view;
        this._listenToSearchRequestByUser();
        this._favoriteRestaurants = favoriteRestaurants;
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((userQuery) => {
            this._searchRestaurants(userQuery);
        });
    }

    async _searchRestaurants(userQuery) {
        this._userQuery = userQuery.trim();

        let foundRestaurants;
        if (this._userQuery.length > 0) {
            foundRestaurants = await this._favoriteRestaurants.searchRestaurants(this._userQuery);
        } else {
            foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
        }

        this._showFoundRestaurants(foundRestaurants);
    }

    _showFoundRestaurants(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }

    get userQuery() {
        return this._userQuery;
    }
}

export default FavoriteRestaurantSearchPresenter;
