import Component from '../Component.js';
import Header from '../common/Header.js';
import QuoteList from './QuoteList.js';
import Search from './Search.js';
import Paging from './Paging.js';
import { getQuotes } from '../services/quote-api.js';

class QuotesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const optionsSection = dom.querySelector('.options-section');
        const search = new Search();
        optionsSection.appendChild(search.renderDOM());
        const paging = new Paging();
        optionsSection.appendChild(paging.renderDOM());

        const listSection = dom.querySelector('.list-section');
        
        const quoteList = new QuoteList({ quotes: [] });
        listSection.appendChild(quoteList.renderDOM());
        
        async function loadQuotes() {
            try {
                const quotes = await getQuotes();
                    
                quoteList.update({ quotes: quotes });

                paging.update({ 
                    // This API does not give total results :(
                    // totalResult: ?
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        loadQuotes();

        window.addEventListener('hashchange', () => {
            loadQuotes();
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
                        <!-- quote list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default QuotesApp;