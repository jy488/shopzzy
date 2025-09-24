document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "seller") {
    window.location.href = "index.html"; // 셀러가 아니면 접근 불가
    return;
  }

  const sellerProductsDiv = document.getElementById("seller-products");
  const addProductForm = document.getElementById("add-product-form");

  function renderProducts() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    // 셀러가 등록한 상품만 필터
    const myProducts = products.filter(p => p.owner === currentUser.username);

    sellerProductsDiv.innerHTML = "";
    myProducts.forEach((p, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${p.name} - ${p.brand} - ${p.price}원</p>
        <button onclick="deleteProduct(${index})">삭제</button>
      `;
      sellerProductsDiv.appendChild(div);
    });
  }

  window.deleteProduct = (index) => {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    // 셀러 상품만 고려
    const myProducts = products.filter(p => p.owner === currentUser.username);
    const productToDelete = myProducts[index];
    products = products.filter(p => p.id !== productToDelete.id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = parseInt(e.target.price.value);
    const brand = e.target.brand.value;

    let products = JSON.parse(localStorage.getItem("products") || "[]");
    const id = Date.now();
    products.push({id, name, price, brand, owner: currentUser.username});
    localStorage.setItem("products", JSON.stringify(products));
    e.target.reset();
    renderProducts();
  });

  // 초기 렌더링
  renderProducts();

  document.getElementById("nav-logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
});
