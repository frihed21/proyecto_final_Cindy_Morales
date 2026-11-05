import { test, expect } from '../fixtures';

test.describe('CP-AUTH-01:Autenticacion', () => {
    test('Inicio de Sesion Exitoso', async ({loginPage, credentials}) => {
        await loginPage.login(credentials.username, credentials.password);
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
   });

    test('CP-AUTH-02:Inicio de Sesion Fallido', async ({loginPage}) => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
    });

  test('CP-AUTH-03:Log out user', async ({loginPage, credentials}) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.logoutButton).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.page).toHaveURL('/login');
  });
});
