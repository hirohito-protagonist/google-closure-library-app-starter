goog.provide('app.Application');

goog.require('goog.dom');


/**
 * Self-calling application entry point.
 * @static
 */
app.Application.main = function () {
    goog.dom.getElement('app').innerHTML = 'hi';
}();