import Component from '../Component.js';
import DrinkItem from './DrinkItem.js';

class DrinkList extends Component {
    
    onRender(dom) {
        const drinks = this.props.drinks;

        drinks.forEach(drink => {
            const props = { 
                drink: drink,
                removeUnFavorites: this.props.removeUnFavorites
            };
            const drinkItem = new DrinkItem(props);
            const drinkItemDOM = drinkItem.renderDOM();
            dom.appendChild(drinkItemDOM);
        });

    }

    renderHTML() {
        
        return /*html*/`
            <ul class="drinks"></ul>
        `;
    }
}

export default DrinkList;
