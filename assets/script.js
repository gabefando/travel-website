var input = document.getElementById("input");

// Hotels API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6f5f1ad54emsh7c79d8f9d7674cep14c7bbjsnebe2a371671f',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

function inputSearch() {
	if (localStorage.getItem("search")) {
        let x = localStorage.getItem("search");
        input.innerText = x;
		fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query='+x+'&locale=en_US&currency=USD', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
    }
};

// use add event listener so that when button is clicked, the js is updated
document.getElementById("btn").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", input.value);
	inputSearch();
});

inputSearch();