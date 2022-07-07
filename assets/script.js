var input = document.getElementById("input");
var currencies = document.getElementById("currencies");

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
		.then(function(response){
			let entities = response.suggestions[1].entities;
			console.log(entities);
			for(let i = 0; i < entities.length; i++) {
				var destId = entities[i].destinationId;
				function fetchDetails() {
					fetch('https://hotels4.p.rapidapi.com/properties/get-details?id='+destId+'', options)
					.then(response => response.json())
					.then(function(response){
						console.log(response);
						var hotelId = response.data.body.pdpHeader.hotelId;
						function fetchImages() {
							fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id='+hotelId+'', options)
							.then(response => response.json())
							.then(response => console.log(response))
							.catch(err => console.error(err));
						};
					fetchImages();
					})
				};
			fetchDetails();
			};
		});		
    }
};

// use add event listener so that when button is clicked, the js is updated
document.getElementById("btn").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", input.value);
	inputSearch();
});

inputSearch();

async function fetchCurrencyApi() {
	const response = await fetch('https://api.currencyfreaks.com/latest?apikey=7ee5ea6285854aa6a43846d578b46cfe&');
	const currencyData = await response.json();
	return currencyData;
}

fetchCurrencyApi().then(currencyData => {
	console.log(currencyData);
	var currenciesList = Object.keys(currencyData.rates);
	console.log(currenciesList.length);
	for(let i = 0; i < currenciesList.length; i++) {
		console.log("test");
		var option = document.createElement("option");
		option.innerText=currenciesList[i];
		currencies.appendChild(option);
	}
});

