const productContainer = document.getElementById('product-container')
const productOverlay = document.getElementById('product-overlay')
const closeBtn = document.getElementById('close-btn')
const productName = document.getElementById('product-name')
const productPrice = document.getElementById('product-price')

/* ====================== API ===================== */

fetch('https://ecommercebackend.fundamentos-29.repl.co')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const productElement = document.createElement('div')
      productElement.classList.add('product-card')
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <div class="name">${product.name}</div>
          <div class="price">$${product.price}</div>
        </div>
        <p>${product.description}</p>
        <div class="additional-info">
          <p class="category">Categoría: ${product.category}</p>
          <p class="quantity">Cantidad: ${product.quantity}</p>
        </div>
        <button class="details-btn">Ver detalles</button>
      `;
      productContainer.appendChild(productElement)

      const detailsBtn = productElement.querySelector('.details-btn')  
      detailsBtn.addEventListener('click', () => {
        showProductDetails(product)
      })
    })
  })
  .catch(error => console.error(error))

/* ====================== Detalles del producto ===================== */

function showProductDetails(product) {
  productName.textContent = product.name
  productPrice.textContent = `$${product.price}`
  productOverlay.style.display = 'flex'
}

closeBtn.addEventListener('click', () => {
  productOverlay.style.display = 'none'
});
