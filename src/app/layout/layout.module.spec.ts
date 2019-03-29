import { LayoutModule } from './layout.module';

describe('LayoutModule', () => {
  let notFoundModule: LayoutModule;

  beforeEach(() => {
    layoutModule = new LayoutModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
