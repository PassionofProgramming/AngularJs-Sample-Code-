import { MessageModule } from './message.module';

describe('MessageModule', () => {
  let notFoundModule: MessageModule;

  beforeEach(() => {
    layoutModule = new MessageModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
