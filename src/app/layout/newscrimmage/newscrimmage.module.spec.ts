import { NewscrimmageModule } from './newscrimmage.module';

describe('NewscrimmageModule', () => {
  let notFoundModule: NewscrimmageModule;

  beforeEach(() => {
    layoutModule = new NewscrimmageModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
