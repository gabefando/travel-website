var inputIndex = document.getElementById("inputIndex");
var optionIndex = document.getElementById("optionIndex");

function initialSearch() {
	if (localStorage.getItem("search")) {
        let x = localStorage.getItem("search");
		optionIndex.innerText = x;
	};
};

document.getElementById("btnIndex").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", inputIndex.value);
	initialSearch();
});

value="'+month[i]+'"