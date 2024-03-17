//? Variable $ = document
const productApi = 'http://localhost:3000/products'
const productsContainer = $.querySelector('#products-container')

fetch(productApi)
	.then((res) => res.json())
	.then((data) => showProducts(data))
	.catch((error) => errorFetchDatas())

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
            <img
              src="./public/icons/Outline/shopping-cart.svg"
              class="w-5 h-5 cursor-pointer"
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

function errorFetchDatas() {
  const errorElem = $.querySelector('.errorFetch')

  errorElem.classList.remove('hidden')
}