goog.module('app.Application');

const dom = goog.require('goog.dom');
const MainView = goog.require('app.views.MainView');


/**
 * Self-calling application entry point.
 * @static
 */
const main = (() => {

    const main = new MainView();
    main.decorate(dom.getElement('app'));
})();