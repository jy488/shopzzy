document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "login.html";
}


  // 로그인 안 된 경우 → 로그인 페이지로 이동
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html"; // 자동 이동
    return;
  }

  // 로그인 상태일 때 사용자 정보 표시
  const userInfoSection = document.getElementById("user-info");
  userInfoSection.innerHTML = `
    <p><strong>아이디:</strong> ${currentUser.username}</p>
    <p><strong>등급:</strong> ${currentUser.role}</p>
  `;

  // 구매 내역
  const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.username}`) || "[]");
  const ordersList = document.getElementById("orders-list");
  if (orders.length > 0) {
    orders.forEach(order => {
      const li = document.createElement("li");
      li.textContent = `${order.productName} - ${order.quantity}개`;
      ordersList.appendChild(li);
    });
  } else {
    ordersList.innerHTML = "<li>구매 내역이 없습니다.</li>";
  }

  // 셀러면 판매 내역 표시
  if (currentUser.role === "seller") {
    const salesSection = document.getElementById("user-sales");
    const salesList = document.getElementById("sales-list");
    salesSection.classList.remove("hidden");

    const sales = JSON.parse(localStorage.getItem(`sales_${currentUser.username}`) || "[]");
    if (sales.length > 0) {
      sales.forEach(sale => {
        const li = document.createElement("li");
        li.textContent = `${sale.productName} - ${sale.quantity}개 판매`;
        salesList.appendChild(li);
      });
    } else {
      salesList.innerHTML = "<li>판매 내역이 없습니다.</li>";
    }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("로그인이 필요합니다.");
  window.location.href = "login.html";
}

  }
});
