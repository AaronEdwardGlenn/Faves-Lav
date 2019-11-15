import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <p>
                        <img 
                            class="planet-express" 
                            src="https://res.cloudinary.com/dzxqhkyqd/image/upload/v1554871230/planet-express.png" 
                            alt="Planet Express Ship from Futurama">
                    </p>
                    <p>
                        <a href="quotes.html">Explore Quotes...</a>
                    </p>
                </main>
            </div>
        `;
    }
}

export default App;