import { MyteamDetailModule } from './myteam-detail.module';

describe('MyteamDetailModule', () => {
  let notFoundModule: MyteamDetailModule;

  beforeEach(() => {
    layoutModule = new MyteamDetailModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
