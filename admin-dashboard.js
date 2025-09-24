// 1️⃣ 관리자 로그인 체크
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
  alert("관리자만 접근 가능합니다.");
  window.location.href = "index.html";
}

// 2️⃣ DOM 요소 가져오기
const sellerRequestsContainer = document.getElementById("seller-requests");
const accountsContainer = document.getElementById("accounts-list");

// 3️⃣ 셀러 승인 요청 불러오기
let sellerRequests = JSON.parse(localStorage.getItem("sellerRequests") || "[]");

function renderSellerRequests() {
  sellerRequestsContainer.innerHTML = ""; // 초기화

  if (sellerRequests.length === 0) {
    sellerRequestsContainer.textContent = "승인 대기 중인 셀러가 없습니다.";
    return;
  }

  sellerRequests.forEach((req, index) => {
    const div = document.createElement("div");
    div.textContent = req.username;

    const approveBtn = document.createElement("button");
    approveBtn.textContent = "승인";
    approveBtn.onclick = () => {
      // accounts에 셀러 계정 추가
      const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
      accounts.push({ username: req.username, password: req.password, role: "seller" });
      localStorage.setItem("accounts", JSON.stringify(accounts));

      // 요청 목록에서 제거
      sellerRequests.splice(index, 1);
      localStorage.setItem("sellerRequests", JSON.stringify(sellerRequests));

      alert(`${req.username} 님이 셀러로 승인되었습니다.`);
      renderSellerRequests();
      renderAccounts();
    };

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = "거절";
    rejectBtn.onclick = () => {
      sellerRequests.splice(index, 1);
      localStorage.setItem("sellerRequests", JSON.stringify(sellerRequests));
      alert(`${req.username} 님의 요청이 거절되었습니다.`);
      renderSellerRequests();
    };

    div.appendChild(approveBtn);
    div.appendChild(rejectBtn);
    sellerRequestsContainer.appendChild(div);
  });
}

// 4️⃣ 모든 계정 리스트 (고객/셀러) 표시
function renderAccounts() {
  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  const loginHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
  accountsContainer.innerHTML = "";

  // 로그인 성공한 계정만 회원 목록에 표시
  const loggedInAccounts = accounts.filter(acc => loginHistory.includes(acc.username));

  if (loggedInAccounts.length === 0) {
    accountsContainer.textContent = "로그인한 회원이 없습니다.";
    return;
  }

  loggedInAccounts.forEach((acc) => {
    const div = document.createElement("div");
    div.textContent = `${acc.username} (${acc.role})`;
    accountsContainer.appendChild(div);
  });
}


// 5️⃣ 초기 렌더링
renderSellerRequests();
renderAccounts();
// 6️⃣ 로그아웃 기능
document.getElementById("nav-logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

// 7️⃣ 네비게이션 바 사용자 이름 표시
document.getElementById("nav-username").textContent = currentUser.username; 