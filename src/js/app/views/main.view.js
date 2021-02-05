goog.module('app.views.MainView');
goog.module.declareLegacyNamespace();

const Component = goog.require('goog.ui.Component');

class MainView extends Component {
    constructor() {
        super();
    }

    /** @override */
    enterDocument() {
        super.enterDocument();
        this.getElement().innerHTML = '<div class="o-main">Hello form main component.</div>';
    }
}

exports = MainView;