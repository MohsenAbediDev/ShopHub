const productApi = 'http://localhost:3000/products'
const products = []
const productsCountArray = JSON.parse(localStorage.getItem('products-count')) || []

const productsContainer = document.querySelector('#products-container')
const cartCount = document.querySelector('#cartCount')
const cartProducts = JSON.parse(localStorage.getItem('products'))

fetch(productApi)
	.then((res) => res.json())
	.then((data) => showProducts(data))
	.catch(() => errorFetchDatas())

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

		products.push(data)

		productsContainer.insertAdjacentHTML(
			'beforeend',
			`
      <div class="w-96 sm:w-full h-60 flex overflow-hidden transition-colors duration-300 dark:bg-darkGray dark:shadow-none shadow-xl rounded-2xl">
      <!--? Left Box Side (Image) -->
      <div class="w-1/2 h-full bg-gray transition-colors duration-300">
        <img
          class="w-full h-full"
          src=${image}
          alt="${title}"
        />
      </div>
    
      <!--? Right Product Box (Details) -->
      <div class="w-1/2 h-full text-dark font-almarai px-5 pt-5">
        <span class="font-bold text-lg dark:text-[#F8F8F8]">
          ${title}
        </span>
    
        <p class="font-medium text-[#474747] dark:text-[#F8F8F8] text-sm mt-2">
          ${description}
        </p>
    
        ${
					colors
						? `<div class="flex items-center font-medium text-[#474747] dark:text-[#F8F8F8] text-sm mt-2">
                    Colors
                    <div class="flex items-center p-1 ml-5 rounded-full bg-gray gap-1">
                      <!--? Select Colors Box -->
                      ${colors
												.map(
													(color) =>
														`<span class="w-4 h-4 rounded-full bg-${color} cursor-pointer"></span>`
												)
												.join('')} 
                    </div>
                  </div>`
						: ''
				}
    
        ${
					size
						? `<div class="flex items-center gap-1 mt-2 font-medium text-sm dark:text-[#F8F8F8]">
          <span class="font-bold">${size}</span>
          <span class="font-bold">-</span>
          <p>Sizes available</p>
        </div>`
						: ''
				}
    
        <div class="flex items-center justify-between text-sm mt-2">
          <!--? Products Count -->
          ${
						available
							? `
              <div class="rounded-lg px-3 py-[2px] text-white bg-green">
                Available
              </div>`
							: `
              <div class="rounded-lg px-3 py-[2px] text-white bg-productsCount">
                Only <span>5</span> left
              </div>`
					}
    
          <!--? Off -->
          ${
						off
							? `<p class="text-off dark:text-offDark text-sm font-bold">
            ${off}% off
          </p>`
							: ''
					}
        </div>
    
        <!--? Buy -->
        <div class="flex items-center justify-between mt-4 dark:text-[#F8F8F8]">
          <p class="font-bold text-base">$${price}</p>
    
          <div class="flex items-center gap-2">
						<div id="product-${
							data.id
						}-box" class="bg-gray flex items-center gap-2 rounded-full hidden">
							<span id="product-${
								data.id
							}-minus" class="h-full w-4 flex items-center justify-center rounded-l-full bg-white text-black select-none text-center text-xl cursor-pointer">-</span>
							
							<span id="product-${data.id}-count">1</span> 
							
							<span id="product-${
								data.id
							}-plus" class="h-full w-4 flex items-center justify-center rounded-r-full bg-white text-black select-none text-center text-lg cursor-pointer">+</span>
						</div>
						<img
              src="./public/icons/Outline/shopping-cart.svg"
              class="w-5 h-5 addToCart cursor-pointer"
              id=${data.id}
            />
            <img
              src="./public/icons/Outline/heart.svg"
              class="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
    `
		)
	})
}

// Show Error
function errorFetchDatas() {
	$.querySelector('.errorFetch').classList.remove('hidden')
}

// Add Product To Cart
function addToCart(e) {
	const productId = e.target.id
	const productCartElem = e.target
	const productBoxElem = $.querySelector(`#product-${productId}-box`)
	const filteredData = products.filter((product) => product.id == productId)

	productCartElem.classList.add('hidden')
	productBoxElem.classList.remove('hidden')

	// Retrieve the existing items from localStorage
	const existingItemsString = localStorage.getItem('products')
	let existingItems = []

	// Parse the existing items from string to array
	if (existingItemsString) {
		existingItems = JSON.parse(existingItemsString)
	}

	// Check if the product already exists in the cart
	const isProductInCart = existingItems.some((item) => item.id === productId)

	// If the product is not already in the cart, add it
	if (!isProductInCart) {
		existingItems.push(filteredData[0]) // Assuming filteredData contains only one item
		localStorage.setItem('products', JSON.stringify(existingItems))
	}

	numberProduductsCount()
	changeProductCount(productId, productCartElem, productBoxElem)
}

// This function is used to change the count of a product in the product box.
function changeProductCount(productId, productCartElem, productBoxElem) {
	// Select the elements for increasing and decreasing the product count
	const minusCount = document.querySelector(`#product-${productId}-minus`);
	const productCountElem = document.querySelector(`#product-${productId}-count`);
	const plusCount = document.querySelector(`#product-${productId}-plus`);

	// Check if the product already exists in the productsCountArray
	let productIndex = productsCountArray.findIndex((p) => p.id === Number(productId));

	let productsCount;
	if (productIndex !== -1) {
		// If product exists, get the existing count
		productsCount = productsCountArray[productIndex];
	} else {
		// If product does not exist, create a new entry
		productsCount = {
			id: Number(productId),
			count: 1,
		};
		productsCountArray.push(productsCount); // Add new product count to array
	}

	// Update the product count display
	productCountElem.innerHTML = productsCount.count;

	// Store the updated array in local storage
	localStorage.setItem(`products-count`, JSON.stringify(productsCountArray));

	// Add event listener for increasing the product count
	plusCount.addEventListener('click', () => {
		productsCount.count++;
		productCountElem.innerHTML = productsCount.count;

		// Update the productsCountArray and local storage
		productsCountArray[productIndex] = productsCount;
		localStorage.setItem(`products-count`, JSON.stringify(productsCountArray));
	});

	// Add event listener for decreasing the product count
	minusCount.addEventListener('click', () => {
		if (productsCount.count > 1) {
			productsCount.count--;
			productCountElem.innerHTML = productsCount.count;

			// Update local storage
			productsCountArray[productIndex] = productsCount;
			localStorage.setItem(`products-count`, JSON.stringify(productsCountArray));
		} else {
			// If count reaches 0, remove the product
			const indexToRemove = productsCountArray.findIndex((p) => p.id === productsCount.id);
			if (indexToRemove !== -1) {
				productsCountArray.splice(indexToRemove, 1);
			}
			localStorage.setItem(`products-count`, JSON.stringify(productsCountArray));

			// Hide product box and show cart icon
			productCartElem.classList.remove('hidden');
			productBoxElem.classList.add('hidden');
		}
	});
}

// Change the number of products in the shopping cart
function numberProduductsCount() {
	const existingProductsString = localStorage.getItem('products')
	const productsCount = existingProductsString
		? JSON.parse(existingProductsString).length
		: 0

	cartCount.innerHTML = productsCount
}

// Function to display the count of all products based on their IDs
function showProductsCount() {
	// Retrieve the list of product counts from localStorage and parse it as a JavaScript object
	const productsCount = JSON.parse(localStorage.getItem('products-count'))

	// Loop through each product count
	productsCount.forEach((product) => {
		const productId = product.id

		// Select the HTML elements that display the product count and its cart button
		const productCountBox = document.querySelector(`#product-${productId}-box`)
		const productCartElem =
			document.querySelectorAll('.addToCart')[productId - 1]
		const productElem = document.querySelector(`#product-${productId}-count`)

		// Check if the productCountBox exists and update its display
		if (productCountBox) {
			productCountBox.classList.remove('hidden')
			productCartElem.classList.add('hidden')
		}

		// Update the innerHTML of the product element to show the product count
		if (productElem) {
			productElem.innerHTML = product.count
		}

		// Re-apply changeProductCount function to manage plus and minus buttons after reload
		const productBoxElem = document.querySelector(`#product-${productId}-box`)
		changeProductCount(productId, productCartElem, productBoxElem)
	})
}

// Load Cart Element
window.addEventListener('load', () => {
	const addToCartElems = document.querySelectorAll('.addToCart')

	addToCartElems.forEach((cartElem) =>
		cartElem.addEventListener('click', addToCart)
	)

	localStorage.getItem('products-count') && showProductsCount()

	numberProduductsCount()
})
