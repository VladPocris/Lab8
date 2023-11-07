/** @type {import('./$types').PageServerLoad} */
export async function load( { fetch, params }) {

    let products;
    let prodID;

    if (params.prod_id){
         prodID = Number(params.prod_id)
    }

    try {
        // Call fetch
        const res_products = await fetch('/api/products');

        // if resonse code 200 (ok)
        if (res_products.ok) {
            // get json from resonse
            products = await res_products.json();
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
        prodID: prodID
    }
}