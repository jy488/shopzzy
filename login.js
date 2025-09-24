document.addEventListener("DOMContentLoaded", () => {
  // 최초 관리자 계정 자동 등록 (이미 있으면 추가하지 않음)
  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  if (!accounts.some(a => a.username === "admin1" && a.role === "admin")) {
    accounts.push({ username: "admin0503", password: "Min070503!", role: "admin" });
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const user = accounts.find(
      (a) => a.username === username && a.password === password
    );

    if (!user) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      return;
    }

    // 로그인 성공 → currentUser 저장
    localStorage.setItem("currentUser", JSON.stringify(user));
    // 로그인 성공한 사용자 기록
    let loginHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
    if (!loginHistory.includes(user.username)) {
      loginHistory.push(user.username);
      localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
    }
    alert(`${user.username}님 환영합니다!`);

    // index.html로 이동 후 main.js가 nav 업데이트
    window.location.href = "index.html";
  });
});
