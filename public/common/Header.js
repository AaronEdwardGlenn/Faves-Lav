import Component from '../Component.js';

class Header extends Component {
    onRender(dom) {
        if(localStorage.getItem('USER')) {
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                localStorage.removeItem('USER');
                location = './';
            });
        }
    }

    renderHTML() {
        const title = this.props.title || 'Dranks We Like';

        return /*html*/`
            <header>
                <img class="logo" src="assets/alchemy-logo.png" alt="Alchemy Code Lab Logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./drinks.html">Drinks</a>
                    <a href="./favorites.html">Favorites</a>
                </nav>
                <button class="log-out hidden">Log Out</button>
            </header>
        `;
    }
}

export default Header;