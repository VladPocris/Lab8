/** @type {import('./$types').PageServerLoad} */
export async function load( { fetch, params }) {

    let products;
    let categories;

    try {
        // Call fetch
        const res_products = await fetch('/api/products');

        // if resonse code 200 (ok)
        if (res_products.ok) {
            // get json from resonse
            products = await res_products.json();
        }

        const res_categories = await fetch('/api/categories');

        if(res_categories.ok){
            categories = await res_categories.json();
        }
    } catch(error){
            // an error occured - return status code amd mesage
        return {
            status: 500,
            error: new Error(`Could not fetch data`)
        }
    }

    return {
        products: products.data,
        categories: categories.data
    }

}