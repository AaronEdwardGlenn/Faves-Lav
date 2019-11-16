const request = require('superagent');
// const stringHash = require('string-hash');

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
// search.length > 0 ? 'f=a' : 's=margarita'

module.exports = {
    async get(search, page) {
        page = page || 1;
        search = search || '';
    
        const response = await request
            .get(URL)
            .query(search.length === 0 ? { f: 'a' } : { s: search });

        return response.body.drinks.map(transformDrink);
    }
};

function transformDrink(drink) {
    drink.isFavorite = false;
    drink.id = drink.idDrink;
    return drink;
}