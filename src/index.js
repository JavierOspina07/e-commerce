const productContainer = document.getElementById('product__container');
const productOverlay = document.getElementById('product__overlay');
const closeBtn = document.getElementById('close__btn');
const productName = document.getElementById('product__name');
const productPrice = document.getElementById('product__price');

/* ====================== API ===================== */
fetch('https://ecommercebackend.fundamentos-29.repl.co')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product__card');
      productElement.innerHTML = `
        <div class="image__container">
          <img src="${product.image}" alt="${product.name}">
          <button class="add__to__cart__btn"><i class='bx bx-shopping-bag'></i></button>
        </div>
        <div class="product__info">
          <div class="name">${product.name}</div>
        </div>
        <div class="price">$${product.price}</div>
        <p>${product.description}</p>
        <div class="additional__info">
          <p class="category">Categoría: ${product.category}</p>
          <p class="quantity">Cantidad: ${product.quantity}</p>
        </div>
        <button class="details__btn">Ver detalles</button>
      `;
      productContainer.appendChild(productElement);

      const detailsBtn = productElement.querySelector('.details__btn');
      detailsBtn.addEventListener('click', () => {
        showProductDetails(product);
      });

      const addToCartBtn = productElement.querySelector('.add__to__cart__btn');
      addToCartBtn.addEventListener('click', () => {
        addToCart(product);
      });
    });
  })
  .catch(error => console.error(error));

/* ====================== Detalles del producto ===================== */

function showProductDetails(product) {
  productName.textContent = product.name;
  productPrice.textContent = `$${product.price}`;
  productOverlay.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
  productOverlay.style.display = 'none';
});

