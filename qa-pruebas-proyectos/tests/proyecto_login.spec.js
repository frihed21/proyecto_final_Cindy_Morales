import {test, expect} from '@playwright/test';

test("Error de modo estricto", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await expect(page).toHaveTitle (/Exercise/);
});

test('Validar el inicio de la pagina', async ({ page }) => {
    
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle(/Automation/);
    await page.getByRole('link', { name: 'Website for automation practice' }).click();
});


test ('Inicio de Sesion Exitoso', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

   const locatorList = page.getByRole('heading', { name: 'Login to your account' });
   await expect(locatorList).toHaveText('Login to your account');
    
    const locatorUsername = page.locator('[data-qa="login-email"]');
    await locatorUsername.fill('ckm@wowperu.pe');
    await expect(locatorUsername).toHaveValue('ckm@wowperu.pe');  
    
    const locatorPassword = page.getByRole('textbox', { name: 'Password' });    
    await locatorPassword.fill('Qatest2026$');
    await expect(locatorPassword).toHaveValue('Qatest2026$');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://automationexercise.com/');
  
});

test('Inicio de Sesion Fallido', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    
    const locatorsignin = page.getByRole('link', { name: ' Signup / Login' });
    await expect(locatorsignin).toBeVisible();
    await locatorsignin.click();
    await page.waitForURL('https://automationexercise.com/login');

    const locatorList = page.getByRole('heading', { name: 'Login to your account' });
    await expect(locatorList).toHaveText('Login to your account');
    
    const locatorUsername = page.locator('[data-qa="login-email"]');
    await locatorUsername.fill('ckm@win.com');
    await expect(locatorUsername).toHaveValue('ckm@win.com');  
    
    const locatorPassword = page.getByRole('textbox', { name: 'Password' });    
    await locatorPassword.fill('Prueba2026$');
    await expect(locatorPassword).toHaveValue('Prueba2026$');

    await page.getByRole('button', { name: 'Login' }).click();
    const locatorError = page.getByText('Your email or password is incorrect!');
    expect(await locatorError.isVisible()).toBe(true);      //await expect(locatorError).toBeVisible();
    await expect(locatorError).toHaveText('Your email or password is incorrect!');

});


test ('Log out user', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

   const locatorList = page.getByRole('heading', { name: 'Login to your account' });
   await expect(locatorList).toHaveText('Login to your account');
    
    const locatorUsername = page.locator('[data-qa="login-email"]');
    await locatorUsername.fill('ckm@wowperu.pe');
    await expect(locatorUsername).toHaveValue('ckm@wowperu.pe');  
    
    const locatorPassword = page.getByRole('textbox', { name: 'Password' });    
    await locatorPassword.fill('Qatest2026$');
    await expect(locatorPassword).toHaveValue('Qatest2026$');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://automationexercise.com/');
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
    await page.getByRole('link', { name: ' Logout' }).click();
});