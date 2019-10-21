const dropbox = document.querySelector(".dropdown__profile");
const loginUserButton = document.querySelector("#loginUser");

loginUserButton.addEventListener("click", e => {
  e.preventDefault();
  console.log("button clicked");
  dropbox.style.display = dropbox.style.display === "none" ? "block" : "none";
  //   yourUl.style.display === "none" ? "" : "none";
});
