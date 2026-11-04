export class LoginPage {
    constructor(page) {
        this.page = page; //guardo las propiedad de mi pagina
        // guardando los localizadores
        this.username = page.locator('[data-qa="login-email"]');
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('link', { name: ' Logout'});
        this.errorMessage = page.getByText('Your email or password is incorrect!');
    }
    //metodo para abrir la pagina de login
    async goto(){
        await this.page.goto('/login');
    }
    //metodo para iniciar sesion
    async login(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    //metodo para cerrar sesion
    async logout(){
        await this.logoutButton.click();
    }
}