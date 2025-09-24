document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id == id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name}이 장바구니에 추가되었습니다.`);
  });
});
