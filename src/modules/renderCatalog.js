import filter from './filter';

export default function renderCatalog() {
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