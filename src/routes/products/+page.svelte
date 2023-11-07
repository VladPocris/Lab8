<script>
	export let data;

  
	let products = data.products;
  let categories = data.categories;

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

  /**
	 * @param cat_id
   * {number}
	 */
  async function filterByCat(cat_id) {
		let endpoint = '/api/products/';

		if (cat_id != 0) {
			endpoint = `${endpoint}categories/${cat_id}`;
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
</script>

<!-- The HTML content of the page-->

<div class="container">
  <div class="row">
    <!-- Page Header -->
    <h2 class="mt-5">Products from Supabase</h2>
  </div>
  {#if products && categories}
  <div class="row">
    <div class="col-sm-2">
      <!-- Page Body Left Column (menu) -->
      <div id="product" class="list-group">
        <!-- placeholders - replace with real productegory links -->
        <button on:click={() => filterByCat(Number(0))} class="list-group-item list-group-item-action">
            All categories
        </button>
        {#each data.categories as cat }
        <button on:click={() => filterByCat(Number(cat.id))}
          class="list-group-item list-group-item-action">
            {cat.category_name}
        </button>
        {/each}
        <button class="list-group-item list-group-item-action"><a href="/add_category">Add new product</a></button>
      </div>
    </div> <!-- End productegory col -->
    
    <div class="col-sm-2">
      <!-- Page Body Left Column (menu) -->
      <div id="product" class="list-group">
        <!-- placeholders - replace with real productegory links -->
        <button on:click={() => filterById(Number(0))} class="list-group-item list-group-item-action">
            All products ID
        </button>
        {#each data.products as product }
        <button on:click={() => filterById(product.id)}
          class="list-group-item list-group-item-action">
            {product.id}
        </button>
        {/each}
        <button class="list-group-item list-group-item-action"><a href="/add_product">Add new product</a></button>
      </div>
    </div> <!-- End productegory col -->

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
            {#each products as product}
            <tr>
              <td><a href="/products/{product.id}">{product.id}</a></td>
              <td><a href="/products/{product.id}">{product.category_id}</a></td>
              <td><a href="/products/{product.id}">{product.product_name}</a></td>
              <td><a href="/products/{product.id}">{product.product_description}</a></td>
              <td><a href="/products/{product.id}">{product.product_stock}</a></td>
              <td><a href="/products/{product.id}">{product.product_price}$</a></td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div> <!-- End products col -->
  </div> <!-- End Row -->
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