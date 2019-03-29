import { HomeModule } from './home.module';

describe('HomeModule', () => {
  let notFoundModule: HomeModule;

  beforeEach(() => {
    homeModule = new HomeModule();
  });

  it('should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
