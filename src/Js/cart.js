//? $ = document

const cartProducts = JSON.parse(localStorage.getItem('products'))

const productsContainer = $.querySelector('#products-container')
const cartCount = $.querySelector('#cartCount')

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
                  <span
                    class="h-full flex items-center justify-center w-4 rounded-l-full bg-white text-black select-none text-xl cursor-pointer"
                  >
                    -
                  </span>

                  <span>1</span>

                  <span
                    class="h-full flex items-center justify-center w-4 rounded-r-full bg-white text-black select-none text-lg cursor-pointer"
                  >
                    +
                  </span>
                </div>
              </div>

              <div class="max-w-5 flex flex-col dark:text-white">
                <button id=${id} class="deleteProduct w-14 h-14 bg-red dark:text-white rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
      `
		)
	})

	emptyCart()
}

// Show Error
function errorFetchDatas() {
	$.querySelector('.errorFetch').classList.remove('hidden')
}

// Delete Product
function deleteProduct(deleteElem) {
	const productIdElem = deleteElem.id

	const filteredProducts = cartProducts.filter(
		(product) => product.id != productIdElem
	)

	localStorage.setItem('products', JSON.stringify(filteredProducts))

	console.log(filteredProducts)

	// Clear the current products container
	productsContainer.innerHTML = ''

	// Show the updated list of products
	showProducts(filteredProducts)
	emptyCart()
}

// Show Emty Cart Picture
function emptyCart() {
	if (cartProducts.length == []) {
		$.querySelector('.emptyCart').classList.remove('hidden')
	} else {
		$.querySelector('.emptyCart').classList.add('hidden')
	}
}

window.addEventListener('load', () => {
	showProducts(cartProducts)

	const deleteElems = $.querySelectorAll('.deleteProduct')

	deleteElems.forEach((deleteElem) => {
		deleteElem.addEventListener('click', () => {
			deleteProduct(deleteElem)
		})
	})
})
