import Component from '../Component.js';
import { makeFavorite, unFavorite } from '../services/drinks-api.js';

class DrinkItem extends Component {

    onRender(li) {
        const drink = this.props.drink;
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-star');
        favoriteButton.addEventListener('click', () => {
            drink.isFavorite = !drink.isFavorite;
            if (drink.isFavorite) {
                makeFavorite(drink);
            }
            else {
                unFavorite(drink.id);
                li.classList.add('fade');
                setTimeout(() => {
                    if (removeUnFavorites) {
                        this.rootElement.remove();
                    }
                }, 300);
            }
            favoriteButton.classList.toggle('is-favorite');
        });
    }

    renderHTML() {
        const drink = this.props.drink;
        console.log(this.props.drink);
        const starClass = drink.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class="drink-item">
                <h2>
                    <img src="${drink.strDrinkThumb}">
                    <span class="drink-name">${drink.strDrink}</span>
                    <button class="favorite-star ${starClass}">★</button>
                </h2>
                
                <drink>
                    ${drink.strIngredient1}
                </drink>

            </li>
        `;
    }
}

export default DrinkItem;