import { OtherteamModule } from './otherteam-detail.module';

describe('OtherteamModule', () => {
  let notFoundModule: OtherteamModule;

  beforeEach(() => {
    layoutModule = new OtherteamModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
