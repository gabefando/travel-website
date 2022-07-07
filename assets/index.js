var inputIndex = document.getElementById("inputIndex");
var optionIndex = document.getElementById("optionIndex");
let x = localStorage.getItem("search");

optionIndex.value = x;

function initialSearch() {
	if (localStorage.getItem("search")) {
        let x = localStorage.getItem("search");
	};
};

document.getElementById("btnIndex").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", inputIndex.value);
	initialSearch();
});

