import { ForgotPasswordModule } from './forgot-password.module';

describe('ForgotPasswordModule', () => {
  let notFoundModule: ForgotPasswordModule;

  beforeEach(() => {
    homeModule = new ForgotPasswordModule();
  });

  it('should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
