goog.provide('app.Application');

goog.require('goog.dom');

goog.require('app.views.MainView');


/**
 * Self-calling application entry point.
 * @static
 */
app.Application.main = function () {

    var main = new app.views.MainView();
    main.decorate(goog.dom.getElement('app'));
}();