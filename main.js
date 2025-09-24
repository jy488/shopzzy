document.addEventListener("DOMContentLoaded", () => {
  const navLogin = document.getElementById("nav-login");
  const navUser = document.getElementById("nav-user");
  const navLogout = document.getElementById("nav-logout");
  const navMypage = document.getElementById("nav-mypage");
  const navSeller = document.getElementById("nav-seller");
  const navAdmin = document.getElementById("nav-admin");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 모든 네비게이션 요소 초기화: 숨김
  [navMypage, navSeller, navAdmin, navUser, navLogout].forEach(el => el.classList.add("hidden"));
  navLogin.classList.remove("hidden");

  if (currentUser) {
    // 로그인 상태: 로그인 버튼 숨김, 사용자 이름/로그아웃/마이페이지 표시
    navLogin.classList.add("hidden");
    navUser.classList.remove("hidden");
    navLogout.classList.remove("hidden");
    navMypage.classList.remove("hidden");

    navUser.textContent = currentUser.username;
    navUser.onclick = () => window.location.href = "mypage.html";

    // 역할별 메뉴 표시
    if (currentUser.role === "seller") {
      navSeller.classList.remove("hidden");
      navAdmin.classList.add("hidden");
    } else if (currentUser.role === "admin") {
      navAdmin.classList.remove("hidden");
      navSeller.classList.add("hidden");
    } else {
      // 구매자 등 기타 역할: 셀러/관리자 메뉴 모두 숨김
      navSeller.classList.add("hidden");
      navAdmin.classList.add("hidden");
    }

    navLogout.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    };
  }
});
