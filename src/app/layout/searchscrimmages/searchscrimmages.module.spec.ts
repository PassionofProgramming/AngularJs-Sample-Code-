import { SearchScrimmageModule } from './searchscrimmages.module';

describe('SearchScrimmageModule', () => {
  let notFoundModule: SearchScrimmageModule;

  beforeEach(() => {
    layoutModule = new SearchScrimmageModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
