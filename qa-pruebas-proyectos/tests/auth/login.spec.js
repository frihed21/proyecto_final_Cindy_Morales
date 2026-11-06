import { test, expect } from '../fixtures';
import dataLogin from "../../test-data/data-login.json";

test.describe('Autenticacion', () => {
    test('CP-AUTH-01:Inicio de Sesion Exitoso', async ({loginPage, credentials}) => {
        await loginPage.login(credentials.username, credentials.password);
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
        await expect(loginPage.logoutButton).toBeVisible();
   });

  for (const { title, username, password, validationType, error, field } of dataLogin) {
    test(`${title}`, async ({ loginPage, credentials }) => {
        // Ejecutar login
        await loginPage.login(
            username ?? credentials.username,
            password ?? credentials.password
        );
        // Validación de mensajes de la aplicación
        if (validationType === "application") {
            await expect(loginPage.errorMessage).toHaveText(error);
        }
        // Validación nativa HTML5
        else if (validationType === "native") {
            const input = field === "username"
                ? loginPage.username
                : loginPage.password;
            const campoVacio = await input.evaluate(
                element => element.validity.valueMissing
            );
            expect(campoVacio).toBe(true);
            const mensaje = await input.evaluate(
                element => element.validationMessage
            );
            expect(mensaje).not.toBe("");
        }
        // Verificar que permanece en login
        await expect(loginPage.page).toHaveURL(/login/);
    });
}

   /* test('CP-AUTH-02:Inicio de Sesion Fallido', async ({loginPage,credentials}) => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
    }); */

  test('CP-AUTH-04:Log out user', async ({loginPage, credentials}) => {
    await loginPage.login(credentials.username, credentials.password);
    await expect(loginPage.logoutButton).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.page).toHaveURL('/login');
  });
});
    