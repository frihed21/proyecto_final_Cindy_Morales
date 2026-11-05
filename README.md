PROYECTO\_FINAL\_CINDY\_MORALES

Automatización de pruebas con Playwright – AutomationExercise

Proyecto de pruebas end-to-end (E2E) con Playwright sobre el sitio automationexercise.com. Uso del patrón Page Object Model (POM) y fixtures personalizados para mantener las pruebas ordenadas, reutilizables y fáciles de mantener.

Estructura del proyecto
├── pages/                  # Page Objects
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   └── CartPage.js
├── fixtures/
│   └── index.js            # Fixtures personalizados (test y expect)
├── tests/                  # Especificaciones de pruebas
│   ├── login.spec.js
│   └── cart.spec.js
├── playwright.config.js    # Configuración de Playwright
├── .env                    # Variables de entorno (no se sube al repositorio)
├── package.json
└── README.md
Requisitos previos
Node.js 18 o superior
npm
Git
Instalación
bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

# 2. Instalar dependencias
npm install

# 3. Instalar los navegadores de Playwright
npx playwright install
Configuración de variables de entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
BASE_URL=https://automationexercise.com
BASE_USERNAME=tu_correo@ejemplo.com
BASE_PASSWORD=tu_contraseña
Variable	Descripción
BASE_URL	URL base del sitio bajo prueba
BASE_USERNAME	Correo de un usuario registrado en el sitio
BASE_PASSWORD	Contraseña del usuario registrado

⚠️ No subas el archivo .env al repositorio. Agrégalo al .gitignore.

Ejecución de las pruebas
bash
# Ejecutar todas las pruebas (todos los navegadores)
npx playwright test

# Ejecutar en un navegador específico
npx playwright test --project=chromium

# Ejecutar un archivo específico
npx playwright test tests/login.spec.js

# Ejecutar con el navegador visible
npx playwright test --headed

# Ejecutar en modo UI (interactivo)
npx playwright test --ui

# Ejecutar en modo debug
npx playwright test --debug

# Ver el reporte HTML
npx playwright show-report
Casos de prueba
Autenticación (login.spec.js) – CP-AUTH-01
ID	Caso de prueba	Resultado esperado
CP-AUTH-01	Inicio de sesión exitoso	El usuario inicia sesión con credenciales válidas y es redirigido a la página de inicio.
CP-AUTH-02	Inicio de sesión fallido	Con credenciales inválidas se muestra el mensaje "Your email or password is incorrect!".
CP-AUTH-03	Cerrar sesión	Tras iniciar sesión se visualiza el botón Logout; al usarlo, el usuario regresa a /login.
Tienda virtual (cart.spec.js) – CP-SHOP-01
ID	Caso de prueba	Resultado esperado
CP-SHOP-02	Agregar producto al carrito	Se abre el producto Blue Top, se agrega al carrito, aparece la confirmación "Added!", y en el carrito el producto se muestra con cantidad 1.
Arquitectura
Page Object Model (POM)

Cada página del sitio se representa con una clase que encapsula sus localizadores y acciones, de modo que las pruebas no dependen de selectores directos.

Page Object	Responsabilidad
HomePage	Navegar al inicio y abrir el detalle de un producto (openProduct).
LoginPage	Abrir /login, iniciar sesión (login) y cerrar sesión (logout).
ProductPage	Agregar al carrito, continuar comprando y abrir el carrito.
CartPage	Localizar la fila de un producto (rowFor) y su cantidad (quantityOf).
Fixtures personalizados

El archivo de fixtures extiende test de Playwright e inyecta automáticamente los Page Objects y las credenciales en cada prueba:

loginPage: instancia LoginPage y navega a /login.
homePage: instancia HomePage y navega a /.
productPage y cartPage: instancias listas para usar.
credentials: usuario y contraseña tomados desde las variables de entorno.

Ejemplo de uso en una prueba:

js
import { test, expect } from '../fixtures';

test('Inicio de Sesion Exitoso', async ({ loginPage, credentials }) => {
  await loginPage.login(credentials.username, credentials.password);
  await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
});
Configuración (playwright.config.js)
testDir: ./tests
baseURL: tomado de BASE_URL
Ejecución en paralelo (fullyParallel)
En CI: 2 reintentos y 1 worker; se bloquea test.only (forbidOnly)
Trazas (trace) activadas en el primer reintento
Proyectos: Chromium, Firefox y WebKit
Reporte: HTML
Reportes

Al finalizar la ejecución se genera el reporte HTML en la carpeta playwright-report/. Para abrirlo:

bash
npx playwright show-report
Buenas prácticas aplicadas
Patrón Page Object Model para separar la lógica de la página de las pruebas.
Fixtures para reutilizar la preparación de cada prueba.
Uso de localizadores semánticos (getByRole, getByText) y data-qa cuando están disponibles.
Credenciales y URL fuera del código mediante variables de entorno.
Identificadores de casos de prueba (CP-...) para dar trazabilidad.
