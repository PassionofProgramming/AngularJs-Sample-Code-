import { MessagelistModule } from './messagelist.module';

describe('MessagelistModule', () => {
  let notFoundModule: MessagelistModule;

  beforeEach(() => {
    layoutModule = new MessagelistModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
