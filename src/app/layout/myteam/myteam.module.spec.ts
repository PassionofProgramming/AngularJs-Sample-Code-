import { MyteamModule } from './myteam.module';

describe('MyteamModule', () => {
  let notFoundModule: MyteamModule;

  beforeEach(() => {
    layoutModule = new MyteamModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
