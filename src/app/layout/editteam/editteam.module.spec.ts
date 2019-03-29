import { EditteamModule } from './editteam.module';

describe('EditteamModule', () => {
  let notFoundModule: EditteamModule;

  beforeEach(() => {
    layoutModule = new EditteamModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
