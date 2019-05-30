describe('Sanity', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true, delete: true, permissions: {notifications: 'YES'}});
  });

  beforeEach(async () => {
    await device.launchApp({newInstance: true});
    await element(by.text('Sanity')).tap();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.text('Say Hello'))).toBeVisible();
    await expect(element(by.text('Say World'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.text('Say Hello')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.text('Say World')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
});
