document.querySelector("button").addEventListener("click", getit);

function getit() {
  const inputVal = document.querySelector("input").value;
  let random = Math.floor(Math.random() * 5);
  // var urls = new URL(
  //   "https://gomakethings.com/about?num=42&greeting=hello#contact"
  // );
  const url =
    "https://content.guardianapis.com/search?api-key=5032dd9a-6f6b-4337-a896-c09e8aa384a1&q=5032dd9a-6f6b-4337-a896-c09e8aa384a1" +
    inputVal;

  console.log(inputVal);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerHTML =
        data.response.results[random].webTitle;
      document.querySelector("img").src = data.response.results[random].webUrl;
      // data.results.urls.href;
      document.querySelector("h3").innerHTML =
        data.response.results[random].webPublicationDate;
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });

  // http://newsapi.org/v2/top-headlines?' +
  //         'country=us&' +
  //         'apiKey=6a21a79309654df6b5e5f5264618c703
}
