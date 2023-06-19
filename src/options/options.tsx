import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";

const test = <h1 className="text-5xl bg-green-500">options</h1>;

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(test);
