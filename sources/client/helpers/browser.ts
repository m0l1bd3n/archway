export default new (class Browser {
  private cef: BrowserMp | null = null;

  constructor() {
    this.init();
  }

  private init() {
    this.cefCreate();

    mp.events.add('cef:destroy', () => this.cefDestroy());
  }

  private cefCreate() {
    if (this.cef) return;

    this.cef = mp.browsers.new('http://package/browser/index.html');
    mp.console.logInfo('CEF успешно инициализирован!');
  }

  private cefDestroy() {
    if (this.cef) {
      this.cef.destroy();
      this.cef = null;
      mp.console.logInfo('CEF успешно деинициализирован.');
    }
  }
})();
