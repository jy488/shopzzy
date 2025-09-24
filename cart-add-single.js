const main = document.querySelector("main");
document.getElementById("add-to-cart").addEventListener("click", () => {
  const id = main.dataset.id;
  const name = main.dataset.name;
  const price = parseInt(main.dataset.price);

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
