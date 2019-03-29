import { LayoutModule } from './adminlayout.module';

describe('LayoutModule', () => {
    let layoutModule: LayoutModule;

    beforeEach(() => {
        layoutModule = new LayoutModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
