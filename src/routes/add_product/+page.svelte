<script>
	/** @type {import('./$types').PageData} */

	// dependencies
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// create form instance
	const { form, errors, enhance, delayed, message, constraints, reset } = superForm(data.form);
</script>

<div class="m-5">
    <!--Show message after sucessful add location-->
      {#if $message}
          <h4 class="message" class:success={$page.status < 400} class:error={$page.status >= 400}>
              {$message}
          </h4>
      {/if}
  
      <h1>Add Product</h1>
      <!-- Bootstrap Form Layout-->
      <div class="w-75 mw-300 p-3">
          <!-- this form will post when submitted -->
          <form method="POST" use:enhance>
              <!-- ID -->
              <div class="mb-3">
                <label for="id" class="form-label">Id</label>
                <input type="number" name="id" class="form-control" bind:value={$form.id} />
            </div>

            <div class="mb-3">
                <label for="category_id" class="form-label">Category</label>
                <select name="category_id" bind:value={$form.category_id} class="form-select">
                    <option value="0">Choose a category</option>
                    <!-- Add each category to the select -->
                    {#each data.categories as cat}
                        <option value={cat.id}>{cat.category_name}</option>
                    {/each}
                </select>
            </div>

              <!-- name -->
              <div class="mb-3">
                  <label for="product_name" class="form-label">Product_Name</label>
                  <input type="text" name="product_name" class="form-control" bind:value={$form.product_name} />
              </div>
  
              <!-- description -->
              <div class="mb-3">
                <label for="product_description" class="form-label">Product_Description</label>
                <input type="text" name="product_description" class="form-control" bind:value={$form.product_description} />
            </div>

            <!-- product_stock -->
            <div class="mb-3">
                <label for="product_description" class="form-label">Product_Stock</label>
                <input type="text" name="product_description" class="form-control" bind:value={$form.product_stock} />
            </div>

            <!-- product_price -->
            <div class="mb-3">
                <label for="product_price" class="form-label">Product_Price</label>
                <input type="text" name="product_price" class="form-control" bind:value={$form.product_price} />
            </div>
            
              <!-- submit button -->
              <div class="mb-3">
                  <button class="btn btn-primary">Submit</button>
              </div>

          </form>
      </div>
  </div>