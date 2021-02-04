goog.require('app.views.MainView');
goog.require('goog.dom');

describe('Main View Component', () => {

    it('should render template', () => {
        // Given
        const mainView = new app.views.MainView();
        let content = null;

        // When
        mainView.decorate(goog.dom.createDom('div'));
        content = mainView.getElement().innerHTML;
        
        // Then
        expect(content).toEqual('<div class="o-main">Hello form main component.</div>');
    });
});