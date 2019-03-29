import { NotificationModule } from './notification.module';

describe('NotificationModule', () => {
  let notFoundModule: NotificationModule;

  beforeEach(() => {
    layoutModule = new NotificationModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
