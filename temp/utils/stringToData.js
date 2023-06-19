const stringToData = (string) => {
  const document = stringToHTML(string);
  let data = {};
  const row = document.querySelectorAll(
    "form > table > tbody > tr:nth-child(n+3)"
  );
  for (let i = 0; i < row.length - 1; i++) {
    const year = row[i]
      .querySelector("td:nth-child(5)")
      .innerHTML.split("&nbsp;")[0];
    const id = row[i].querySelector("td:nth-child(2)").innerText;
    const name = row[i].querySelector("td:nth-child(3)").innerText;
    const semester = row[i].querySelector("td:nth-child(6)").innerText;
    if (!data[year]) data[year] = {};
    if (data[year] && !data[year][semester]) data[year][semester] = [];
    if (data[year] && data[year][semester])
      data[year][semester].push({
        id: id,
        name: name,
      });
  }
  return data;
};
