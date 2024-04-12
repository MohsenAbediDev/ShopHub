//? $ = document

const cartProducts = JSON.parse(localStorage.getItem('products'))

const productsContainer = $.querySelector('#products-container')
const emptyCartElem = $.querySelector('.emptyCart')

// Show Products in Cart
function showProducts(datas) {
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
            class="w-full flex h-36 rounded-xl bg-white dark:bg-darkGray dark:shadow-none shadow-xl duration-300"
          >
            <!--? Left Product Box (Image) -->
            <div
              class="min-w-[15%] h-full overflow-hidden transition-colors duration-300"
            >
              <img
                class="w-full h-full rounded-l-md"
                src=${image}
                alt="nike react miller shoes"
              />
            </div>

            <!--? Right Product Box -->
            <div class="flex w-[85%] my-5 mx-5 sm:mx-2 justify-between">
              <div class="max-w-5 flex flex-col dark:text-white">
                <p class="dark:text-grayText">Name</p>
                <span class="text-xl dark:text-white">${title}</span>
              </div>

              <div class="max-w-5 flex flex-col text-white">
                <p class="dark:text-grayText">Color</p>
                <span class="text-xl">${colors}</span>
              </div>

              <div class="max-w-5 flex flex-col text-white">
                <p class="dark:text-grayText">Price</p>
                <span class="text-xl">${price}</span>
              </div>

              <div class="max-w-5 flex flex-col text-white">
                <p class="dark:text-grayText">Count</p>

                <div class="bg-gray h-6 flex items-center gap-2 rounded-full">
                  <span id="product-${data.id}-minus"
                    class="countChanger h-full flex items-center justify-center w-4 rounded-l-full bg-white text-black select-none text-xl cursor-pointer"
                  >
                    -
                  </span>

                  <span id="product-${data.id}-count">1</span>

                  <span id="product-${data.id}-plus"
                    class="countChanger h-full flex items-center justify-center w-4 rounded-r-full bg-white text-black select-none text-lg cursor-pointer"
                  >
                    +
                  </span>
                </div>
              </div>

              <div class="max-w-5 flex flex-col dark:text-white">
                <button class="deleteProduct w-14 h-14 bg-red dark:text-white rounded-md" onclick="deleteProduct(${id})">
                  Delete
                </button>
              </div>
            </div>
          </div>
      `
		)
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
	// Get Products
	const cartProducts = JSON.parse(localStorage.getItem('products'))

	// Filter out the product to delete
	const filteredProducts = cartProducts.filter(
		(product) => product.id != productIdElem
	)

	// Update local storage
	localStorage.setItem('products', JSON.stringify(filteredProducts))

	// Update Show Products
	productsContainer.innerHTML = ''
	showProducts(filteredProducts)

	// Check if cart is empty
	emptyCart()
}

// Show Empty Cart Picture
function emptyCart() {
	// Get Products
	const cartProducts = JSON.parse(localStorage.getItem('products'))

	if (cartProducts.length == 0) {
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

	const countElem = document.querySelector(`#product-${idNumber}-count`)

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
		}
	}

	filteredProductCount.count = countNumber
	countElem.innerHTML = countNumber

	// Update the products count in local storage
	localStorage.setItem('products-count', JSON.stringify(productsCount))
}

window.addEventListener('load', () => {
	showProducts(cartProducts)

	// Get count changer buttons
	const countChangers = $.querySelectorAll('.countChanger')

	// Get the button to change the count when clicked
	countChangers.forEach((countChanger) => {
		countChanger.addEventListener('click', () =>
			changeProductCount(countChanger)
		)
	})
})
