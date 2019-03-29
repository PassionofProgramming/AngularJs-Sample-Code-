import { FirsttimeModule } from './firsttimepage.module';

describe('FirsttimeModule', () => {
  let notFoundModule: FirsttimeModule;

  beforeEach(() => {
    homeModule = new FirsttimeModule();
  });

  it('should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
