let dataTable = {};
const url =
  "https://dkmh.ctu.edu.vn/htql/sinhvien/ctdt/codes/sindex.php?mID=S101";
fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.text();
    }
    throw new Error("Response wasn't ok");
  })
  .then((string) => {
    dataTable = stringToData(string);

    let origin = document.querySelector("form").innerHTML;
    document.querySelector(
      "form"
    ).innerHTML = `<div class="schedule" style="display: flex"></div> ${origin}`;

    const schedule = document.querySelector(".schedule");
    const years = Object.keys(dataTable);

    createChooseYears(years, schedule);

    console.log({ dataTable, years });
  });

const createChooseYears = (years, parent) => {
  console.log(":::createChooseYears");

  //create wrapper;
  const wrapper = document.createElement("div");
  wrapper.className = "yearSelect";
  //create label
  const label = document.createElement("label");
  label.innerText = "Năm học";

  //create select
  const select = document.createElement("select");
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.innerText = year;

    select.appendChild(option);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  parent.appendChild(wrapper);
};

const createChooseSemester = (dataTable, parent) => {
  // create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "semesterChoose";

  // create label
  const label = document.createElement("label");
  label.innerText = "Học kỳ";

  // create selection;
  const year = document.querySelector
};
