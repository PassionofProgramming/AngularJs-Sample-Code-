import { MyscrimmageModule } from './myscrimmage.module';

describe('MyscrimmageModule', () => {
  let notFoundModule: MyscrimmageModule;

  beforeEach(() => {
    layoutModule = new MyscrimmageModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
