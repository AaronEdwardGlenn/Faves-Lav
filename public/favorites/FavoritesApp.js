import Component from '../Component.js';
import Header from '../common/Header.js';
import DrinkList from '../drinks/DrinkList.js';
import { getFavorites } from '../services/drinks-api.js';

class FindDrinksApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
        console.log(this.props);
        const listSection = dom.querySelector('.list-section');
        
        const drinksList = new DrinkList({ drinks: [], removeUnFavorites: true });
        console.log(drinksList);
        listSection.appendChild(drinksList.renderDOM());
        
        getFavorites()
            .then(drinks => {
                drinksList.update({ drinks: drinks });
            });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main> 
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- drink list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default FindDrinksApp;