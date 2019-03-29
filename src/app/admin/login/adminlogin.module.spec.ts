import { LoginAdminModule } from './adminlogin.module';

describe('LoginAdminModule', () => {
    let loginModule: LoginAdminModule;

    beforeEach(() => {
        loginModule = new LoginAdminModule();
    });

    it('should create an instance', () => {
        expect(loginModule).toBeTruthy();
    });
});
