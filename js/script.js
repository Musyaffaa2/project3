document.addEventListener("DOMContentLoaded", () => {
  const products = [
      { id: 1, name: "HTML", price: 19.99, image: "img/html.jpg", description: "Website ini dibuat dengan html, Dibuat Oleh Musyaffa Arwiin" },
      { id: 2, name: "Tailwind", price: 29.99, image: "img/tailwind.png", description: "Website ini dibuat dengan Tailwind, Dibuat Oleh Musyaffa Arwiin" },
      { id: 3, name: "Product 3", price: 39.99, image: "img/product3.jpg", description: "Dibuat Oleh Musyaffa Arwiin" },
      { id: 4, name: "Product 4", price: 49.99, image: "img/product5.jpg", description: "Dibuat Oleh Musyaffa Arwiin" },
      { id: 5, name: "Product 5", price: 59.99, image: "img/product4.jpg", description: "Dibuat Oleh Musyaffa Arwiin" },
      { id: 6, name: "Product 6", price: 69.99, image: "img/product6.jpg", description: "Dibuat Oleh Musyaffa Arwiin" },
  ];

  const itemsPerPage = 4;
  let currentPage = 1;

  const productGrid = document.getElementById("productGrid");
  const pagination = document.getElementById("pagination");
  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const closeModalButton = document.getElementById("closeModal");
  const cartItems = [];
  const cartCount = document.getElementById("cartCount");

  function renderProducts() {
      productGrid.innerHTML = "";
      const start = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = products.slice(start, start + itemsPerPage);

      paginatedProducts.forEach(product => {
          const productCard = document.createElement("div");
          productCard.className = "bg-white shadow-md rounded-md overflow-hidden";
          productCard.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover" />
              <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                  <p class="text-gray-600">$${product.price}</p>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block view-details" data-id="${product.id}">View Details</button>
                  <button class="bg-green-600 text-white px-4 py-2 rounded-md mt-2 inline-block add-to-cart" data-id="${product.id}">Add to Cart</button>
                  <button class="bg-yellow-600 text-white px-4 py-2 rounded-md mt-2 inline-block buy-now" data-id="${product.id}">Buy Now</button>
              </div>
          `;
          productGrid.appendChild(productCard);
      });

      attachEventListeners();
  }

  function renderPagination() {
      pagination.innerHTML = "";
      const totalPages = Math.ceil(products.length / itemsPerPage);

      const prevButton = document.createElement("button");
      prevButton.className = "bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300";
      prevButton.disabled = currentPage === 1;
      prevButton.innerText = "Previous";
      prevButton.addEventListener("click", () => {
          currentPage--;
          updateView();
      });
      pagination.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement("button");
          pageButton.className = `bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 ${currentPage === i ? "bg-blue-600 text-white" : ""}`;
          pageButton.innerText = i;
          pageButton.addEventListener("click", () => {
              currentPage = i;
              updateView();
          });
          pagination.appendChild(pageButton);
      }

      const nextButton = document.createElement("button");
      nextButton.className = "bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300";
      nextButton.disabled = currentPage === totalPages;
      nextButton.innerText = "Next";
      nextButton.addEventListener("click", () => {
          currentPage++;
          updateView();
      });
      pagination.appendChild(nextButton);
  }

  function openModal(productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
          modalTitle.innerText = product.name;
          modalImage.src = product.image;
          modalPrice.innerText = `$${product.price}`;
          modalDescription.innerText = product.description;
          productModal.classList.remove("hidden");
      }
  }

  function closeModal() {
      productModal.classList.add("hidden");
  }

  function addToCart(productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
          cartItems.push(product);
          updateCartCount();
      }
  }

  function buyNow(productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
          // Handle 'Buy Now' logic (e.g., redirect to checkout page)
          console.log(`Buying product: ${product.name}`);
      }
  }

  function updateCartCount() {
      cartCount.innerText = cartItems.length;
  }

  function attachEventListeners() {
      const viewDetailsButtons = document.querySelectorAll(".view-details");
      viewDetailsButtons.forEach(button => {
          button.addEventListener("click", () => {
              openModal(button.getAttribute("data-id"));
          });
      });

      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach(button => {
          button.addEventListener("click", () => {
              addToCart(button.getAttribute("data-id"));
          });
      });

      const buyNowButtons = document.querySelectorAll(".buy-now");
      buyNowButtons.forEach(button => {
          button.addEventListener("click", () => {
              buyNow(button.getAttribute("data-id"));
          });
      });

      closeModalButton.addEventListener("click", closeModal);
  }

  function updateView() {
      renderProducts();
      renderPagination();
  }

  // Initialize the app
  updateView();
});

// Search Feature
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');

searchBtn.addEventListener('click', () => {
  searchModal.classList.remove('hidden');
});

closeSearch.addEventListener('click', () => {
  searchModal.classList.add('hidden');
});

// Shopping Cart Feature
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');

cartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  renderCartItems();
});

closeCart.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
      cartItems.forEach((item, index) => {
          const cartItem = document.createElement("div");
          cartItem.className = "flex justify-between items-center py-2 border-b";
          cartItem.innerHTML = `
              <div class="flex items-center">
                  <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4" />
                  <div>
                      <h4 class="text-gray-800">${item.name}</h4>
                      <p class="text-gray-600">$${item.price}</p>
                  </div>
              </div>
              <button class="bg-red-600 text-white px-2 py-1 rounded-md ml-4 remove-from-cart" data-id="${item.id}">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
      removeFromCartButtons.forEach(button => {
          button.addEventListener("click", () => {
              removeFromCart(button.getAttribute("data-id"));
          });
      });
  }
}

function removeFromCart(productId) {
  const productIndex = cartItems.findIndex(p => p.id === parseInt(productId));
  if (productIndex !== -1) {
      cartItems.splice(productIndex, 1);
      updateCartCount();
      renderCartItems();
  }
}
