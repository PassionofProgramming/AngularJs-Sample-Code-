import { PrivacyModule } from './privacy.module';

describe('PrivacyModule', () => {
  let gridModule: PrivacyModule;

  beforeEach(() => {
    gridModule = new PrivacyModule();
  });

  it('should create an instance', () => {
    expect(gridModule).toBeTruthy();
  });
});
