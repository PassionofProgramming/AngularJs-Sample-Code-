import { DataManageModule } from './datamanage.module';

describe('DataManageModule', () => {
    let chartsModule: DataManageModule;

    beforeEach(() => {
        chartsModule = new DataManageModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
