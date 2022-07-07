var input = document.getElementById("input");
var currencies = document.getElementById("currencies");
const hotelCard = document.getElementById("hotel-card");

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
				//create card div element
				var cardDiv = document.createElement("div");
				cardDiv.setAttribute("class", "card col-1 me-2");
				cardDiv.setAttribute("style", "width: 18rem;");
				
				//create inside div element
				var cardBody = document.createElement("div");
				cardBody.setAttribute("class", "card-body");
				cardDiv.append(cardBody);

				//create document elements to display hotel information
				var hotelName = document.createElement("h5");
				hotelName.setAttribute("class", "card-body");
				hotelName.textContent = entities[i].name;
				cardBody.append(hotelName);

				var hotelImg = document.createElement("img");
				hotelImg.setAttribute("style", "width: 80%; height: 80%; box-sizing: border-box")
				var hotelRating = document.createElement("p");
				hotelRating.setAttribute("class", "card-text");
				var hotelAddress = document.createElement("a");
				hotelAddress.setAttribute("class", "btn btn-primary");
				hotelAddress.textContent = "See Hotel";
				var googleMapUrl = "https://www.google.com/maps/place";
				
				var destId = entities[i].destinationId;
				function fetchDetails() {
					fetch('https://hotels4.p.rapidapi.com/properties/get-details?id='+destId+'', options)
					.then(response => response.json())
					.then(function(response){
						console.log(response);

						// create a url to refer google map
						var address = response.data.propertyDescription.address.fullAddress;
						var addressArray = address.split(" ");
						googleMapUrl = googleMapUrl + addressArray.join("+");
						hotelAddress.setAttribute("href", googleMapUrl);

						var hotelId = response.data.body.pdpHeader.hotelId;
						function fetchImages() {
							fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id='+hotelId+'', options)
							.then(response => response.json())
							.then(function(response){
								console.log(response);
								if(response.hotelImages[0]){
									var urlArray = response.hotelImages[0].baseUrl.split("_{size}");
									var hotelImagesUrl = urlArray.join("");
									hotelImg.setAttribute("src", hotelImagesUrl);
								}
							})
							.catch(err => console.error(err));
						};
					fetchImages();
					cardBody.append(hotelImg);
					cardBody.append(hotelAddress);
					console.log(cardDiv);
					})
				};
			fetchDetails();
			hotelCard.appendChild(cardDiv)
							.then(response => console.log(response))
							.catch(err => console.error(err));
						};
					fetchImages();
					})
				};
			fetchDetails();
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

