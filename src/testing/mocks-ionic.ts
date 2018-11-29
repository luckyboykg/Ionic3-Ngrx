import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export class PlatformMock {
    public ready(): Promise<String> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public getQueryParam() {
        return true;
    }

    public registerBackButtonAction(): Function {
        return (() => true);
    }

    public hasFocus(): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
    }

    public is(): boolean {
        return true;
    }

    public getElementComputedStyle(): any {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }

    public onResize(callback: any) {
        return callback;
    }

    public registerListener(): Function {
        return (() => true);
    }

    public win(): Window {
        return window;
    }

    public raf(): number {
        return 1;
    }

    public timeout(callback: any, timer: number): any {
        return setTimeout(callback, timer);
    }

    public cancelTimeout() {
        // do nothing
    }

    public getActiveElement(): any {
        return document['activeElement'];
    }
}

export class StatusBarMock extends StatusBar {
    styleDefault() {
        return;
    }
}

export class SplashScreenMock extends SplashScreen {
    hide() {
        return;
    }
}

export class NavParamsMock {
    static returnParam = null;

    static setParams(value) {
        NavParamsMock.returnParam = value;
    }

    public get(): any {
        if (NavParamsMock.returnParam) {
            return NavParamsMock.returnParam;
        }
        return 'default';
    }

}

export class LoadingComponentMock {
    free = true;
    open: boolean;

    present(): void {
        if (this.free) {
            console.error('attempt to present freed loading component');
        }
        if (this.open) {
            console.error('loading component presented twice');
        }
        this.open = true;
    }

    dismiss(): void {
        if (!this.open) {
            console.error('double-dismiss on loading component');
        }

        if (this.free) {
            console.error('attempt to dismiss unallocated loading component');
        }

        this.open = false;
        this.free = true;
    }

    dismissAll(): void {
        this.open = false;
        this.free = true;
    }
}

export class LoadingControllerMock {
    component: LoadingComponentMock = new LoadingComponentMock();

    create(): LoadingComponentMock {
        if (!this.component.free) {
            console.error('can\'t have two loading components out at once');
            return null;
        }

        this.component.free = false;
        return this.component;
    }

    present(): Promise<any> {
        return null;
    }

    dismiss(): Promise<any> {
        return null;
    }
}

export class AlertControllerMock {
    present(): Promise<any> {
        return null;
    }
}

export class ToastControllerMock {
    present(): Promise<any> {
        return null;
    }
}

export class ViewControllerMock {
    public readReady = {
        subscribe() {
        }
    };
    public writeReady = {
        subscribe() {
        }
    };
    public dismiss(): any { return {}; }
    public _setHeader(): any { return {}; }
    public _setIONContent(): any { return {}; }
    public _setIONContentRef(): any { return {}; }
    public _setNavbar(): any { return {}; }
}

export class TranslateLoaderMock {

}

export class NotificationServiceMock {
    public alert() {
        return;
    }
    public toastPresent() {
        return;
    }

    public async showLoader(): Promise<void> {
        return;
    }
    public async hideLoader(): Promise<void> {
        return;
    }
}

export class StorageMock {
    public get(): Promise<any> {
        return Promise.resolve(null);
    }

    public set(): Promise<any> {
        return Promise.resolve({});
    }
}

export class NavControllerMock {
    public pop() {
        return;
    }
    public push() {
        return;
    }
    public setRoot() {
        return;
    }
}
