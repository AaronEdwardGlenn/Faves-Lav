import Component from '../Component.js';

class Paging extends Component {

    onRender(dom) {
        const prevButton = dom.querySelector('.prev');
        const nextButton = dom.querySelector('.next');

        if (!prevButton) {
            return;
        }

        let currentPage = this.props.currentPage || 1;

        const updatePage = (increment) => {
            const page = currentPage + increment;

            const searchParams = new URLSearchParams();
            searchParams.set('page', page);
            window.location.hash = searchParams.toString();

            this.props.currentPage = page;
            currentPage = page;
        };

        prevButton.addEventListener('click', () => {
            updatePage(-1);
        });
        
        nextButton.addEventListener('click', () => {
            updatePage(1);
        });
    }

    renderHTML() {
        const currentPage = this.props.currentPage || 1;

        return /*html*/`
            <p class="paging">
                <button class="prev">◀</button>
                <span>Page ${currentPage}</span>
                <button class="next">▶</button>
            </p>
        `;
    }
}

export default Paging;