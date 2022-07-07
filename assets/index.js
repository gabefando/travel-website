var inputIndex = document.getElementById("inputIndex");

function initialSearch() {
	if (localStorage.getItem("search")) {
        let x = localStorage.getItem("search");
        inputNav.innerText = x;
	};
};

document.getElementById("btnIndex").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", inputIndex.value);
	initialSearch();
});