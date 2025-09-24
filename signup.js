document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const role = e.target.role.value;

  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");

  // 중복 체크
  if (accounts.find(a => a.username === username)) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  // 셀러는 관리자 승인 필요
  if (role === "seller") {
    let sellerRequests = JSON.parse(localStorage.getItem("sellerRequests") || "[]");
    sellerRequests.push({ username, password, approved: false });
    localStorage.setItem("sellerRequests", JSON.stringify(sellerRequests));
    alert("셀러 가입 요청 완료! 관리자의 승인을 기다려주세요.");
  } else {
    // 구매자는 바로 계정 생성
    accounts.push({ username, password, role });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("가입 완료! 로그인 후 이용 가능합니다.");
  }

  window.location.href = "login.html";
});
