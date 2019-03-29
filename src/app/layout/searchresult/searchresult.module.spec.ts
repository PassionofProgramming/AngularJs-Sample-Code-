import { SearchResultModule } from './searchresult.module';

describe('SearchResultModule', () => {
  let notFoundModule: SearchResultModule;

  beforeEach(() => {
    layoutModule = new SearchResultModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
