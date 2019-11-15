const request = require('superagent');
// const stringHash = require('string-hash');

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';


module.exports = {
    async get(search, page) {
        page = page || 1;
        search = search || '';
    
        const response = await request
            .get(URL)
            .query({ page, search });

        return response.body.drinks.map(transformDrink);
    }
};

function transformDrink(drink) {
    drink.isFavorite = false;
    drink.id = drink.idDrink;
    return drink;
}
