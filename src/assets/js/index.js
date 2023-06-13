const productContainer = document.getElementById('product__container');
const productOverlay = document.getElementById('product__overlay');
const closeBtn = document.getElementById('close__btn');
const productName = document.getElementById('product__name');
const productPrice = document.getElementById('product__price');
const productImage = document.getElementById('product__image');
const productDescription = document.getElementById('product__description')
const productDescriptionText = "Este es el texto de descripción del producto.\nAquí hay otra línea de texto en la descripción.\nY una tercera línea de texto.";

/* ====================== Detalles del producto ===================== */

function showProductDetails(product) {
  productName.textContent = product.name;
  productPrice.textContent = `$${product.price}`;
  productImage.src = product.image;
  productDescription.textContent = product.description;
  productDescription.innerText = productDescriptionText;
  productDescription.style.textAlign = "center";
  productDescription.style.whiteSpace = "pre-line";
  productOverlay.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
  productOverlay.style.display = 'none';
});

/* API CON ASYNC */


async function fetchData() {
  try {
    const response = await fetch('https://ecommercebackend.fundamentos-29.repl.co');
    const data = await response.json();

    data.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product__card');
      productElement.innerHTML = `
     <article class="product">
        <div class="product__image">
          <img src="${product.image}" alt="${product.name}">
       </div>
        <div class="product__content">
          <button type="button" class="add__to__cart__btn">
            <i class='bx bx-cart-add'></i>
          </button>
          <span class="product__price">$${product.price}</span>
          <span class="product__stock">Cantidad: ${product.quantity}</span>  
          <h3 class="product__title">${product.name}</h3>
          </div>
          <span class="product_category">Categoría: ${product.category}</span>
        <button class="details__btn">Ver detalles</button>
      </article>
      `;
      productContainer.appendChild(productElement);

      const detailsBtn = productElement.querySelector('.details__btn');
      detailsBtn.addEventListener('click', () => {
        showProductDetails(product);
      });

      const addToCartBtn = productElement.querySelector('.add__to__cart__btn');
      addToCartBtn.addEventListener('click', () => {
        addToCartBtn(product);
      });

    });
  } catch (error) {
    console.error(error);
  }
}

fetchData()


/* ==============  BONTON DARKMODE  ============= */

const btnSwitch = document.querySelector('#switch')

btnSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  btnSwitch.classList.toggle('active');

  /* guardar el modo dark */
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
})

/* ===========  mantener el modo oscuro  =========== */
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark');
  btnSwitch.classList.add('active');
} else {
  document.body.classList.remove('dark');
  btnSwitch.classList.remove('active');
}

/* ==========  animacion del navbar  ==========  */

window.addEventListener('scroll', function(){
  var header = document.querySelector('header');
  header.classList.toggle('abajo',window.scrollY > 0);
})

/* ===== Loader ==== */
function loader (){
  window.addEventListener('load',function () {
    const loader = document.querySelector('.loader')
    loader.classList.add('loader--hidden')
  })
}

loader()

/* ======  ShowMenu ====== */

function showMenu() {
  const nav = document.querySelector('.nav')
  const menu = document.querySelector('.nav__menu')

  nav.addEventListener('click', function (e) {
    if (e.target.closest('.btn--menu')) {
      menu.classList.toggle('show--menu')
    }

    if (e.target.closest('.btn--close')) {
      menu.classList.remove('show--menu')
    }

    if (e.target.closest('.nav__link')) {
      menu.classList.remove('show--menu')
    }
  })
}

showMenu()

/* ========= showCart =========*/

function showCart() {
  const btnCart = document.querySelector('.btn--cart')
  const cart = document.querySelector('.cart')

  btnCart.addEventListener('click', function () {
    cart.classList.toggle('show--cart')
  })

  cart.addEventListener('click', function (e) {
    if (e.target.closest('.btn--close')) {
      cart.classList.remove('show--cart')
    }
  })
}

showCart()


