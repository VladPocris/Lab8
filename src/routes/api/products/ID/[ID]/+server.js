import { json } from '@sveltejs/kit';

// import the client instance (created earlier)
import {supabase} from "$lib/supabase.js";

// Get product for a category by category_ID
export async function GET({ params, request, cookies }) {

    let ID = 0;
    if (params.ID && !isNaN(parseInt(params.ID))) {
        ID = parseInt(params.ID)
    }

    if (ID > 0) {

        const product = await supabase
        .from('product')
        .select('*')
        .eq('id', ID);

        if (product.error) {
            return json({
                status: product.status,
                error: product.error
            });
        }

        return json({
            data: product.data,
            status: product.status
        });

    }
    return json({
        status: 400,
        error: 'Bad Request'
    });
}