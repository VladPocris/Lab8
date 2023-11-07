// import dependencies
// Zod: validator
// superforms: form helper
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

const schema = z.object({
    id: z.number().optional(),
    category_name: z.string(),
    category_description: z.string(),
});

// Page load
// Build the form and returns to page
export async function load({ fetch, params }) {
    // Build form
    const form = await superValidate(schema);

    const response = await fetch('/api/categories');

    // Return form and categories
    return {
        form
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
        const response = await fetch('/api/categories',{
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
        return message(form, `success: new category added`);
    }
}