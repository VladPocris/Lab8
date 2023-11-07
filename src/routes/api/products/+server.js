import { json } from '@sveltejs/kit';

// import the client instance (created earlier)
import {supabase} from "$lib/supabase.js";

// Get all products
export async function GET({ request, cookies }) {

    // Query data
    const products = await supabase
    .from('product')
    .select('*');

    if (products.error) {
        return json({
            status: products.status,
            error: products.error
        });
    }

    return json({
        data: products.data,
        status: products.status
    });
}

// Add a new product
export async function POST({ request, cookies }) {
    // Get data from request body
    let data = await request.json();

    // Insert data
    const product = await supabase
    .from('product')
    .insert([data])
    .select()


    return json({
        data: product.data
    });
}