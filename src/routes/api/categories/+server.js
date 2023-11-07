import { json } from '@sveltejs/kit';

// import the client instance (created earlier)
import {supabase} from "$lib/supabase.js";

// Get all categories
export async function GET({ request, cookies }) {

    // Query data
    const categories = await supabase
    .from('category')
    .select('*');

    if (categories.error) {
        return json({
            status: categories.status,
            error: categories.error
        });
    }

    return json({
        data: categories.data,
        status: categories.status
    });
}

// Add a new category
export async function POST({ request, cookies }) {
    // Get data from request body
    let data = await request.json();

    // Insert data
    const cat = await supabase
    .from('category')
    .insert([data])
    .select()


    return json({
        data: cat.data
    });
}