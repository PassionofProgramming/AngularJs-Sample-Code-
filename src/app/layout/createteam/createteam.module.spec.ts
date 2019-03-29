import { CreateteamModule } from './createteam.module';

describe('CreateteamModule', () => {
  let notFoundModule: CreateteamModule;

  beforeEach(() => {
    layoutModule = new CreateteamModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
