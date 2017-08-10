goog.provide('app.views.MainView');

goog.require('goog.ui.Component');

goog.require('goog.soy');
goog.require('app.views.template');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
app.views.MainView = function () {
    goog.base(this);
};
goog.inherits(app.views.MainView, goog.ui.Component);

/** @override */
app.views.MainView.prototype.enterDocument = function () {
    goog.base(this, 'enterDocument');

    goog.soy.renderHtml(this.getElement(), app.views.template.main());
};