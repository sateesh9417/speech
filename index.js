let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
  let searchText = e.target.value;
  console.log(searchText);
  SearchMovies(searchText);
  // when key press hide form text and H1
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});

//speech Recognition api
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;
  console.log(recognition);

  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      p.innerHTML = transcript;
      let speechText = transcript;
      SpeechRecognise(speechText);
    }
  });

  recognition.start();
});

function SpeechRecognise(speechText) {
  const APi = `http://localhost:4500/api/speechRecognise`;
  window
    .fetch(APi)
    .then((data) => {
      data
        .json()
        .then((speechData) => {
          console.log(speechData);
            output += `
            <div>
              <h1>${speechData}</h1>
            </div>  
            `;
          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}