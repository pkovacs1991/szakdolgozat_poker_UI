import { PokerPage } from './app.po';

describe('poker App', () => {
  let page: PokerPage;

  beforeEach(() => {
    page = new PokerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
