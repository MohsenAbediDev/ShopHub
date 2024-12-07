const cartProducts = JSON.parse(localStorage.getItem('products')) || []

const productsContainer = document.querySelector('#products-container')
const emptyCartElem = document.querySelector('.emptyCart')

// Show Products in Cart
function showProducts(datas) {
	datas &&
		datas.forEach((data) => {
			const {
				id,
				image,
				title,
				description,
				colors,
				size,
				available,
				price,
				off,
			} = data

			productsContainer.insertAdjacentHTML(
				'beforeend',
				`
      <div
						class="w-full h-36 sm:h-96 flex sm:flex-col rounded-xl bg-white dark:bg-darkGray dark:shadow-none shadow-xl duration-300"
					>
						<!--? Left Product Box (Image) -->
						<div
							class="min-w-[15%] h-full sm:min-w-full overflow-hidden transition-colors duration-300"
						>
							<img
								class="w-full h-full rounded-l-md object-cover object-center"
								src=${image}
								alt=${title}
							/>
						</div>

						<!--? Right Product Box -->
						<div
							class="flex sm:flex-col sm:gap-y-4 w-[85%] my-5 mx-5 justify-between"
						>
							<div
								class="max-w-5 flex flex-col sm:flex-row sm:gap-5 dark:text-white"
							>
								<p class="dark:text-grayText">Name</p>
								<span class="text-xl dark:text-white">${title}</span>
							</div>

							<div
								class="max-w-5 flex flex-col sm:flex-row sm:gap-5 text-white"
							>
								<p class="dark:text-grayText">Color</p>
								<span class="text-xl">${colors}</span>
							</div>

							<div
								class="max-w-5 flex flex-col sm:flex-row sm:gap-5 text-white"
							>
								<p class="dark:text-grayText">Price</p>
								<span class="text-xl">${price}</span>
							</div>

							<div
								class="max-w-5 sm:hidden flex flex-col sm:flex-row sm:gap-5 text-white"
							>
								<p class="dark:text-grayText">Count</p>

								<div class="bg-gray h-6 flex items-center gap-2 rounded-full">
									<span
										id="product-${id}-minus"
										class="countChanger h-full flex items-center justify-center w-4 rounded-l-full bg-white text-black select-none text-xl cursor-pointer"
									>
										-
									</span>

									<span id="product-${id}-count">1</span>

									<span
										id="product-${id}-plus"
										class="countChanger h-full flex items-center justify-center w-4 rounded-r-full bg-white text-black select-none text-lg cursor-pointer"
									>
										+
									</span>
								</div>
							</div>

							<div class="max-w-5 sm:hidden flex flex-col dark:text-white">
								<button
									class="deleteProduct w-14 h-14 bg-red dark:text-white rounded-md"
									onclick="deleteProduct(${id})"
								>
									Delete
								</button>
							</div>

							<div
								class="hidden sm:w-full sm:flex sm:items-center sm:justify-between"
							>
								<div
									class="max-w-5 flex flex-col sm:flex-row sm:gap-5 text-white"
								>
									<p class="dark:text-grayText">Count</p>

									<div class="bg-gray h-6 flex items-center gap-2 rounded-full">
										<span
											id="product-${id}-minus"
											class="countChanger h-full flex items-center justify-center w-4 rounded-l-full bg-white text-black select-none text-xl cursor-pointer"
										>
											-
										</span>

										<span id="product-${id}-count">1</span>

										<span
											id="product-${id}-plus"
											class="countChanger h-full flex items-center justify-center w-4 rounded-r-full bg-white text-black select-none text-lg cursor-pointer"
										>
											+
										</span>
									</div>
								</div>

								<div class="max-w-5 flex flex-col dark:text-white">
									<button
										class="deleteProduct w-14 h-10 bg-red dark:text-white rounded-md"
										onclick="deleteProduct(${id})"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
      `
			)

			// Check if cart is have products and show product counts
			showProductsCount(id)
		})

	// Check if cart is empty
	emptyCart()
}

// Show Error
function errorFetchDatas() {
	$.querySelector('.errorFetch').classList.remove('hidden')
}

// Delete Product from cart
function deleteProduct(productIdElem) {
	// Get Products and Product Counts from localStorage
	const cartProducts = JSON.parse(localStorage.getItem('products'))
	const productsCount = JSON.parse(localStorage.getItem('products-count'))

	// Filter out the product to delete from 'products' array
	const filteredProducts = cartProducts.filter(
		(product) => product.id != productIdElem
	)

	// Filter out the product to delete from 'products-count' array
	const filteredProductsCount = productsCount.filter(
		(product) => product.id != productIdElem
	)

	// Update localStorage with the new arrays
	localStorage.setItem('products', JSON.stringify(filteredProducts))
	localStorage.setItem('products-count', JSON.stringify(filteredProductsCount))

	// Update Show Products (re-render the product list)
	productsContainer.innerHTML = ''
	showProducts(filteredProducts)

	// Check if cart is empty and display appropriate message or picture
	emptyCart()
}

// Show Empty Cart Picture
function emptyCart() {
	// Get Products
	const cartProducts = JSON.parse(localStorage.getItem('products'))

	if (!cartProducts) {
		emptyCartElem.classList.remove('hidden')
	} else {
		!emptyCartElem.classList.value.includes('hidden') &&
			emptyCartElem.classList.add('hidden')
	}
}

// Change Product Count
function changeProductCount(countChanger) {
	// Get product id number
	const idNumber = countChanger.id.match(/\d+/)[0]

	// Get all products count from local storage
	const productsCount = JSON.parse(localStorage.getItem('products-count'))

	// Get product count
	const filteredProductCount = productsCount.find(
		(product) => product.id == idNumber
	)

	// Select all elements displaying the product count
	const countElems = document.querySelectorAll(`#product-${idNumber}-count`)

	let countNumber = filteredProductCount.count

	// Increasing product count
	if (countChanger.id.includes('plus')) {
		countNumber++
	}

	// Decreasing product count
	if (countChanger.id.includes('minus')) {
		countNumber--

		// If the count reaches zero, remove product from local storage
		if (countNumber == 0) {
			const products = JSON.parse(localStorage.getItem('products'))

			const indexToRemove = productsCount.findIndex((e) => e.id == idNumber)

			// Remove the product from the productsCount array if found
			if (indexToRemove !== -1) {
				productsCount.splice(indexToRemove, 1)
			}

			// Also, remove the corresponding product from the products array
			const productIndexToRemove = products.findIndex(
				(product) => product.id == idNumber
			)

			if (productIndexToRemove !== -1) {
				products.splice(productIndexToRemove, 1)
			}

			// Update localStorage with the modified arrays
			localStorage.setItem('products-count', JSON.stringify(productsCount))
			localStorage.setItem('products', JSON.stringify(products))

			// Update Show Products
			productsContainer.innerHTML = ''
			showProducts(products)
			emptyCart()
		}
	}

	// Update the product count in the localStorage
	filteredProductCount.count = countNumber
	countElems.forEach((countElem) => {
		// Update the innerHTML of all elements with the new count
		countElem.innerHTML = countNumber
	})

	// Update the products count in localStorage
	localStorage.setItem('products-count', JSON.stringify(productsCount))
}

// Function to display the count of a specific product based on its ID
function showProductsCount(productsId) {
	// Retrieve the list of product counts from localStorage and parse it as a JavaScript object
	const productsCount = JSON.parse(localStorage.getItem('products-count'))

	// Find the product in the array whose id matches the provided productsId
	const productCount = productsCount.filter((p) => p.id == productsId)[0]

	// Select all HTML elements that display the product count using the product's ID
	const productElems = document.querySelectorAll(`#product-${productsId}-count`)
	// Loop through each selected element and update its innerHTML
	productElems.forEach((productElem) => {
		// If the product's ID from localStorage matches the ID extracted from the HTML element
		if (productCount.id == productElem.id.match(/\d+/)[0]) {
			// Update the innerHTML of the product element to show the product count
			productElem.innerHTML = productCount.count
		}
	})
}

window.addEventListener('load', () => {
	showProducts(cartProducts)

	// Get count changer buttons
	const countChangers = document.querySelectorAll('.countChanger')

	// Get the button to change the count when clicked
	countChangers.forEach((countChanger) => {
		countChanger.addEventListener('click', () =>
			changeProductCount(countChanger)
		)
	})
})
