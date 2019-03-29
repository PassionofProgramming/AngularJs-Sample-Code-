import { AccountsettingModule } from './accountsetting.module';

describe('AccountsettingModule', () => {
  let notFoundModule: AccountsettingModule;

  beforeEach(() => {
    layoutModule = new AccountsettingModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
