function toggleCheckbox() {
    const checkbox = document.querySelectorAll(".filter-check_checkbox");
  
    checkbox.forEach(elem => {
      elem.addEventListener("change", function() {
        if (this.checked) {
          this.nextElementSibling.classList.add("checked");
        } else {
          this.nextElementSibling.classList.remove("checked");
        }
      });
    });
  }

function toggleCart() {
    const btnCart = document.getElementById("cart");
    const modalCart = document.querySelector(".cart");
    const closeBtn = document.querySelector(".cart-close");
  
    btnCart.addEventListener("click", () => {
      modalCart.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  
    closeBtn.addEventListener("click", () => {
      modalCart.style.display = "none";
      document.body.style.overflow = "";
    });
  }

function renderCatalog() {
    const cards = document.querySelectorAll(".goods .card"),
      catalogList = document.querySelector(".catalog-list"),
      catalogBtn = document.querySelector(".catalog-button"),
      catalogWrapper = document.querySelector(".catalog");
    const category = new Set();
    const filterTitle = document.querySelector('.filter-title h5');
  
    cards.forEach(card => {
      category.add(card.dataset.category);
    });
  
    category.forEach(elem => {
      const li = document.createElement("li");
      li.textContent = elem;
      catalogList.appendChild(li);
    });
  
    const allLi = catalogList.querySelectorAll("li");
  
    catalogBtn.addEventListener("click", e => {
      if (catalogWrapper.style.display) {
        catalogWrapper.style.display = "";
      } else {
        catalogWrapper.style.display = "block";
      }
  
      if (e.target.tagName === "LI") {
        // cards.forEach(card => {
        //   if (card.dataset.category === e.target.textContent) {
        //     card.parentNode.style.display = "";
        //   } else {
        //     card.parentNode.style.display = "none";
        //   }
        // });
        allLi.forEach(elem => {
          if (elem === e.target) {
            elem.classList.add("active");
          } else {
            elem.classList.remove("active");
          }
        });
        filterTitle.textContent = e.target.textContent;
        filter();
      }
    });
  }

// function renderCards(data) {
//     const goodsWrapper = document.querySelector(".goods");
//     data.goods.forEach(good => {
//       const card = document.createElement("div");
//       card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
  
//       // шаблон верстки
//       card.innerHTML = `     
//                   <div class="card" data-category = "${good.category}">
//                   ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ""}
//                                       <div class="card-img-wrapper">
//                                           <span class="card-img-top"
//                                               style="background-image: url('${good.img}')"></span>
//                                       </div>
//                                       <div class="card-body justify-content-between">
//                                           <div class="card-price" style="${good.sale ? "color: red" : ""}">${
//         good.price
//       } ₽</div>
//                                           <h5 class="card-title">${good.title}</h5>
//                                           <button class="btn btn-primary">В корзину</button>
//                                       </div>
//                                   </div>
//       `;
//       goodsWrapper.appendChild(card);
//     });
//   }

// function getData() {
//     const goodsWrapper = document.querySelector(".goods");
//     return fetch("../db/db.json")
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Данные не были получены , ошибка: " + response.status);
//         }
//       })
//       .then(data => {
//         return data;
//       })
//       .catch(err => {
//         console.warn(err);
//         goodsWrapper.innerHTML =
//           '<div style ="color:red; font-size: 30px">Упс, что-то пошло не так!</div>';
//       });
//   }

function filter() {
    const cards = document.querySelectorAll(".goods .card"),
      discountCheckbox = document.getElementById("discount-checkbox"),
      min = document.getElementById("min"),
      max = document.getElementById("max"),
      activeLi = document.querySelector(".catalog-list li.active");
  
    cards.forEach(elem => {
      const cardPrice = elem.querySelector(".card-price");
      const price = parseFloat(cardPrice.textContent);
      const discount = elem.querySelector(".card-sale");
  
      elem.parentNode.style.display = "";
  
      if ((min.value && price < min.value) || (max.value && price > max.value)) {
        elem.parentNode.style.display = "none";
      } else if (discountCheckbox.checked && !discount) {
        elem.parentNode.style.display = "none";
      } else if (activeLi) {
        if (elem.dataset.category !== activeLi.textContent) {
          elem.parentNode.style.display = "none";
        }
      }
    });
  }

function addCart() {
    const cards = document.querySelectorAll(".goods .card"),
      cartWrapper = document.querySelector(".cart-wrapper"),
      cartEmpty = document.getElementById("cart-empty"),
      countGoods = document.querySelector(".counter");
  
    cards.forEach(card => {
      const btn = card.querySelector("button");
      btn.addEventListener("click", () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        showData();
  
        const removeBtn = cardClone.querySelector(".btn");
        removeBtn.textContent = "Удалить из корзины";
        removeBtn.addEventListener("click", () => {
          cardClone.remove();
          showData();
        });
      });
    });
  
    function showData() {
      const cardsCart = cartWrapper.querySelectorAll(".card"),
        cardsPrice = cartWrapper.querySelectorAll(".card-price"),
        cardTotal = document.querySelector(".cart-total span");
  
      countGoods.textContent = cardsCart.length;
  
      let sum = 0;
      cardsPrice.forEach(elem => {
        let price = parseFloat(elem.textContent);
        sum += price;
      });
      cardTotal.textContent = sum;
  
      if (cardsCart.length !== 0) {
        cartEmpty.remove();
      } else {
        cartWrapper.appendChild(cartEmpty);
      }
    }
  }

function actionPage() {
    const cards = document.querySelectorAll(".goods .card"),
      discountCheckbox = document.getElementById("discount-checkbox"),
      min = document.getElementById("min"),
      max = document.getElementById("max"),
      search = document.querySelector(".search-wrapper_input"),
      searchBtn = document.querySelector(".search-btn");
  
    discountCheckbox.addEventListener("click", filter);
    min.addEventListener("change", filter);
    max.addEventListener("change", filter);
  
    searchBtn.addEventListener("click", () => {
      const searchText = new RegExp(search.value.trim(), "i");
      cards.forEach(elem => {
        const title = elem.querySelector(".card-title");
        if (!searchText.test(title.textContent)) {
          //метод test проверяет есть ли регулярное выражение в этом тексте
          elem.parentNode.style.display = "none";
        } else {
          elem.parentNode.style.display = "";
        }
      });
      search.value = "";
    });
  }




    renderCatalog();
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();

  
  
  