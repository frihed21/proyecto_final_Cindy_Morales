import {test, expect} from '@playwright/test';

test('Validar el inicio de la pagina', async ({ page }) => {
    
    await page.goto('https://learnqa.dev/en/qa-shop/');
    await expect(page).toHaveTitle(/Learning/);
    await page.getByRole('link', { name: 'Spec mode is on' }).click();
});


test('Campo de busqueda', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('Shirt');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();

    await expect(page.getByRole('heading', { name: 'Search results: shirt' })).toBeVisible();
    await expect(page.getByText('Slim Fit Green Shirt', { exact: true })).toBeVisible();
 
});

test('Nombre del primer producto', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('Shirt');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();

    await expect(page.getByRole('heading', { name: 'Search results: shirt' })).toBeVisible();
    await expect(page.getByText('Slim Fit Green Shirt', { exact: true })).toBeVisible();
 
});

test ('No existe producto', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('dfess');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();
   await expect(page.getByTestId('urun-sayisi')).toHaveText('0');

});

test ('Localizar todos los productos', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder = page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('Shirt');
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();
    const nombresProductos = page.locator('span.line-clamp-2');
    
    const cantidad = await nombresProductos.count();
    for (let i = 0; i < cantidad; i++) {
    await expect(nombresProductos.nth(i)).toBeVisible();
    }
//    console.log(await nombresProductos.allTextContents());
});

test ('Modo estricto', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const byplaceholder=page.getByPlaceholder('Search products, brands or categories');
    await byplaceholder.fill('dress');
    
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();

    const searchdress = page.getByRole('heading', { name: 'Search results: dress' });
    await expect(searchdress).toBeVisible();

    //rompiendo para modo estricto 
    const dressproduct = page.getByText('Dress');
    await expect(dressproduct).toBeVisible();
  
});

test ('Resolviendo Modo estricto con first', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const bytest_id = page.getByTestId('urun-ara');
    await bytest_id.fill('dress');
   
    
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();

    const searchdress = page.getByRole('heading', { name: 'Search results: dress' });
    await expect(searchdress).toBeVisible();

    const nombresProductos = page.locator('span.line-clamp-2').first();
    await expect(nombresProductos).toBeVisible();   

});

test ('Resolviendo Modo estricto con filtro', async ({ page }) => {
    await page.goto('https://learnqa.dev/en/qa-shop/');
    //expect a title to contain a substring
    await expect(page).toHaveTitle(/Learning/);

    const bytest_id = page.getByTestId('urun-ara');
    await bytest_id.fill('dress');
   
    
    const byrole = page.getByRole('button', { name: 'Search' });
    await byrole.click();

    const searchdress = page.getByRole('heading', { name: 'Search results: dress' });
    await expect(searchdress).toBeVisible();

    const nombresProductos = page.locator('span.line-clamp-2').filter({ hasText: 'Dress' }).first();
    await expect(nombresProductos).toBeVisible();   

});