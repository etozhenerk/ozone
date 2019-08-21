import filter from './filter';

export default function actionPage() {
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