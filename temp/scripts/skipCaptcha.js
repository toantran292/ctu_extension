window.onload = function () {
  document.querySelector("#login-sv > tbody > tr:nth-child(3)")?.remove();

  if (
    document.querySelector("#table-main > tbody > tr > td:nth-child(1) > form")
  )
    document.querySelector(
      "#table-main > tbody > tr > td:nth-child(1) > form"
    ).action = "https://qldt.ctu.edu.vn/htql/sinhvien/dang_nhap.php";
};
