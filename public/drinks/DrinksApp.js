import Component from '../Component.js';
import Header from '../common/Header.js';
import DrinkList from './DrinkList.js';
import Search from './Search.js';
import Paging from './Paging.js';
import { getDrinks } from '../services/drinks-api.js';

class DrinksApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const optionsSection = dom.querySelector('.options-section');
        const search = new Search();
        optionsSection.appendChild(search.renderDOM());
        const paging = new Paging();
        optionsSection.appendChild(paging.renderDOM());

        const listSection = dom.querySelector('.list-section');
        
        const drinkList = new DrinkList({ drinks: [] });
        listSection.appendChild(drinkList.renderDOM());
        
        async function loadDrinks() {
            try {
                const drinks = await getDrinks();
                    
                drinkList.update({ drinks: drinks });

                paging.update({ 
                    totalResult: 25
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        loadDrinks();

        window.addEventListener('hashchange', () => {
            loadDrinks();
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main>
                    <section class="options-section">
                        <!-- options go here -->
                    </section>
                        
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- drink list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default DrinksApp;