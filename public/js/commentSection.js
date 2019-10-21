const commentButton = document.querySelector("#commentButton");
const commentSection = document.querySelector("#commentSection");
const likeButton = document.querySelector("#likeButton");
const dislikeButton = document.querySelector("#dislikeButton");

commentButton.addEventListener("click", e => {
  console.log("hello");
  commentSection.style.display =
    commentSection.style.display === "" ? "block" : "";
});

likeButton.addEventListener("click", e => {
  likeButton.style.display =
    likeButton.style.display === "block" ? "" : "block";
  dislikeButton.style.display =
    dislikeButton.style.display === "" ? "block" : "";
});
