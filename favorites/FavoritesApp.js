import Component from '../Component.js';
import Header from '../common/Header.js';
import QuoteList from '../quotes/QuoteList.js';
import { getFavorites } from '../services/quote-api.js';

class FindQuotesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const listSection = dom.querySelector('.list-section');
        
        const quoteList = new QuoteList({ quotes: [], removeUnFavorites: true });
        listSection.appendChild(quoteList.renderDOM());
        
        getFavorites()
            .then(quotes => {
                quoteList.update({ quotes: quotes });
            });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main> 
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- quote list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default FindQuotesApp;