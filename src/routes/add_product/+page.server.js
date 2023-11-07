// import dependencies
// Zod: validator
// superforms: form helper
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

const schema = z.object({
    id: z.number().optional(),
    category_id: z.number(),
    product_name: z.string(),
    product_description: z.string(),
    product_stock: z.number(),
    product_price: z.number(),
});

// Page load
// Build the form and returns to page
export async function load({ fetch, params }) {
    // Build form
    const form = await superValidate(schema);

    const response = await fetch('/api/categories');
    let categories;
    const res_categories = await fetch('/api/categories');

        if(res_categories.ok){
            categories = await res_categories.json();
        }
    // Return form and categories
    return {
        form,
        categories: categories.data
    };
};


// Form actions (e.g. what to do when submit happens)
export const actions = {
    // default form submit
    default: async ({ request, fetch }) => {
        // retrieve form data and validate
        const form = await superValidate(request, schema);
        
      	//console.log('POST', form);

        if (!form.valid) {
            return fail(400, { form });
        }

        //Add the new category via an API call
        //Note POST
        const response = await fetch('/api/products',{
                method: 'POST',
                body: JSON.stringify(form.data),
                headers: {
                    'Content-Type' : 'application/json'
                }
        });
        const new_cat = await response.json();
        if (new_cat.data)
        {
            form.data.id = new_cat.data[0].id;
        }

        // return form and message
        return message(form, `success: new product added`);
    }
}