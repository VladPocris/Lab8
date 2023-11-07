<script>
    import { onMount } from 'svelte';
    export let data;
    let prodID = Number(data.prodID);
    let products = data.products;
    /**
	 * @param ID {number}
	 */
	async function filterById(ID) {
		let endpoint = '/api/products/';

		if (ID != 0) {
			endpoint = `${endpoint}ID/${ID}`;
		}

		console.log('api endpoint: ', endpoint);

		// Call fetch
		const response = await fetch(endpoint);

		// if resonse code 200 (ok)
		if (response.ok) {
			// get json from resonse
			const json = await response.json();
			products = json.data;
		}
	}
    onMount(async () => {
    // Call filterById on component mount
    await filterById(Number(prodID));});
</script>

<!-- The HTML content of the page-->

<div class="container">
  <div class="row">
    <!-- Page Header -->
    <h2 class="mt-5">Product from Supabase</h2>
  </div>
  <div class="col-sm-2">
    <!-- Page Body Left Column (menu) -->
    <div id="product" class="list-group">
      <!-- placeholders - replace with real productegory links -->
      <button class="list-group-item list-group-item-action">
         <a href="/products"> All products </a>
      </button>
    </div>
  </div> <!-- End productegory col -->
  {#if products}  
    <div class="col-sm-8">
      <!-- Page Body Right Side (Content goes here) -->
      <div id="products">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category_ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {#each products as product }
            <tr>
              <td>{product.id}</td>
              <td>{product.category_id}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.product_stock}</td>
              <td>{product.product_price}$</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div> <!-- End products col -->
  {:else}
  <p> No data to display</p>
{/if}
</div> <!-- End Main Content-->

<style>
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
</style>