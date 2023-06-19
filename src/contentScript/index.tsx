import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./contentScript";
import "antd/dist/reset.css";
import "../assets/tailwind.css";

function removeCaptcha() {
  document.querySelector("#login-sv > tbody > tr:nth-child(3)")?.remove();
  if (
    document.querySelector("#table-main > tbody > tr > td:nth-child(1) > form")
  )
    (
      document.querySelector(
        "#table-main > tbody > tr > td:nth-child(1) > form"
      ) as HTMLFormElement
    ).action = "https://qldt.ctu.edu.vn/htql/sinhvien/dang_nhap.php";
}

function init() {
  const URL = window.location.href;
  if (URL.indexOf("login.php") !== -1) {
    removeCaptcha();
  } else if (URL.indexOf("lich_hoc") !== -1) {
    const appContainer = document.createElement("div");
    if (!appContainer) {
      throw new Error("Can not find appContainer");
    }
    const table = document.querySelector(".font");
    const main = table?.parentElement;
    main?.insertBefore(appContainer, table);
    const root = createRoot(appContainer);
    root.render(<ContentScript />);
  }
}

init();
