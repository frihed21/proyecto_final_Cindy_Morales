import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';

test.describe('Autenticacion', () => {
    let loginPage;  
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Inicio de Sesion Exitoso', async () => {
        await loginPage.login(process.env.BASE_USERNAME, process.env.BASE_PASSWORD);
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
   });

    test('Inicio de Sesion Fallido', async () => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
    });

  test('Log out user', async () => {
    await loginPage.login(process.env.BASE_USERNAME, process.env.BASE_PASSWORD);
    await expect(loginPage.logoutButton).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.page).toHaveURL('/login');
  });
});
