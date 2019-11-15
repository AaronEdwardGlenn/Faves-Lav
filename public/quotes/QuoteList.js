import Component from '../Component.js';
import QuoteItem from './QuoteItem.js';

class QuoteList extends Component {
    
    onRender(dom) {
        const quotes = this.props.quotes;

        quotes.forEach(quote => {
            const props = { 
                quote: quote,
                removeUnFavorites: this.props.removeUnFavorites
            };
            const quoteItem = new QuoteItem(props);
            const quoteItemDOM = quoteItem.renderDOM();
            dom.appendChild(quoteItemDOM);
        });

    }

    renderHTML() {
        
        return /*html*/`
            <ul class="quotes"></ul>
        `;
    }
}

export default QuoteList;
