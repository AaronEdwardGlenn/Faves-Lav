import Component from '../Component.js';
import { makeFavorite, unFavorite } from '../../services/quote-api.js';

class QuoteItem extends Component {

    onRender(li) {
        const quote = this.props.quote;
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-star');
        favoriteButton.addEventListener('click', () => {
            quote.isFavorite = !quote.isFavorite;
            if (quote.isFavorite) {
                makeFavorite(quote);
            }
            else {
                unFavorite(quote.id);
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
        const quote = this.props.quote;
        const starClass = quote.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class="quote-item">
                <h2>
                    <img src="${quote.image}">
                    <span class="character-name">${quote.character}</span>
                    <button class="favorite-star ${starClass}">★</button>
                </h2>
                
                <quote>
                    ${quote.quote}
                </quote>

            </li>
        `;
    }
}

export default QuoteItem;