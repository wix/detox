const {device, expect, element, by, waitFor} = require('detox');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should have welcome screen', async () => {
    await expect(await element(by.id('welcome'))).toBeVisible();
  });
  
  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(await element(by.text('Hello!!!'))).toBeVisible();
  });
  
  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(await element(by.text('World!!!'))).toBeVisible();
  });

  it('waitFor should be exported', async () => {
    await waitFor(element(by.id('welcome'))).toExist().withTimeout(2000);
    await expect(await element(by.id('welcome'))).toExist();
  });
});
