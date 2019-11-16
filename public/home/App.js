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
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdQ7ng8mvf4DjKUAiWpeRygc2MLMGjmoGcvyl6UJajGxYJLsmC">
                    </p>
                    <p>
                        <a href="drinks.html">Explore Drinks...</a>
                    </p>
                </main>
            </div>
        `;
    }
}

export default App;