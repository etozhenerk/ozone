export default function filter() {
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