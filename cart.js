// 장바구니 렌더링 함수
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const list = document.getElementById("cart-list");
  const totalPriceEl = document.getElementById("total-price");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "8px";

    // 상품 정보
    const info = document.createElement("span");
    info.textContent = `${item.name} - ${item.price.toLocaleString()}원`;

    // 수량 조절
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = item.quantity;
    qtyInput.style.width = "50px";
    qtyInput.addEventListener("change", () => {
      const newQty = parseInt(qtyInput.value);
      if (newQty < 1) {
        qtyInput.value = 1;
        return;
      }
      cart[index].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    const right = document.createElement("span");
    right.appendChild(qtyInput);
    right.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(right);
    list.appendChild(li);

    total += item.price * item.quantity;
  });

  totalPriceEl.textContent = total.toLocaleString();
}

// 결제 버튼
document.getElementById("checkout").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length === 0) {
    alert("장바구니가 비어 있습니다.");
    return;
  }

  // 총 합계 계산
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 구매자 등급 반영 (예: 구매 횟수 / 총합 기준)
  let username = localStorage.getItem("currentUser"); // 로그인한 사용자
  if (username) {
    let purchaseCount = parseInt(
      localStorage.getItem(`purchaseCount_${username}`) || 0
    );
    purchaseCount += 1;
    localStorage.setItem(`purchaseCount_${username}`, purchaseCount);

    // 예시 등급 정책
    let level = "일반";
    if (purchaseCount >= 5) level = "브론즈";
    if (purchaseCount >= 10) level = "실버";
    if (purchaseCount >= 20) level = "골드";

    localStorage.setItem(`userLevel_${username}`, level);
    alert(
      `결제가 완료되었습니다!\n총합: ${total.toLocaleString()}원\n회원 등급: ${level}`
    );
  } else {
    alert(`결제가 완료되었습니다!\n총합: ${total.toLocaleString()}원`);
  }

  // 장바구니 초기화
  localStorage.removeItem("cart");
  renderCart();
});

// 페이지 로드 시 렌더
renderCart();
// js/cart.js
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <p>${item.name} - ${item.price}원 × ${item.quantity}</p>
      <button onclick="removeFromCart(${index})">삭제</button>
    `;
    cartContainer.appendChild(itemEl);
    total += item.price * item.quantity;
  });

  totalPriceEl.textContent = `총합계: ${total.toLocaleString()}원`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
