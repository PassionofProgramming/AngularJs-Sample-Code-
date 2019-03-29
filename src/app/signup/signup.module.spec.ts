import { SignupModule } from './signup.module';

describe('SignupModule', () => {
  let notFoundModule: SignupModule;

  beforeEach(() => {
    loginModule = new SignupModule();
  });

  it('should create an instance', () => {
    expect(loginModule).toBeTruthy();
  });
});
