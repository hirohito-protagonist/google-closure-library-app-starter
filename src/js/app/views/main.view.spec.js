goog.require('app.views.MainView');
goog.require('goog.dom');

describe('Main View Component', function () {

    var maiViewComponent;
    var decoratedNode;

    beforeEach(() => {
        maiViewComponent = new app.views.MainView();
        decoratedNode = goog.dom.createDom('div');
        maiViewComponent.decorate(decoratedNode);
    });

    afterEach(function () {
        maiViewComponent.dispose();
    });

    it('should render template', function () {
        
        expect(decoratedNode.innerHTML).toEqual('<div class="o-main">Hello form mian component.</div>');
    });
});