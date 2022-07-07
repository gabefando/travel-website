var input = document.getElementById("input");
var currencies = document.getElementById("currencies");
const hotelCard = document.getElementById("hotel-card");

// Hotels API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '515713f87cmshd44d83b936c5dcdp1b3a63jsn8f42e98cb281',
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
				cardDiv.setAttribute("class", "card col-1 me-2 test");
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
				
				var hotelRating = document.createElement("p");
				hotelRating.setAttribute("class", "card-text");
				var hotelAddress = document.createElement("a");
				hotelAddress.setAttribute("class", "btn btn-primary");
				hotelAddress.textContent = "See Hotel";
				var googleMapUrl = "https://www.google.com/maps/place";
				cardBody.append(hotelRating);
				cardBody.append(hotelAddress);
				
				var destId = entities[i].destinationId;
				function fetchDetails() {
					fetch('https://hotels4.p.rapidapi.com/properties/get-details?id='+destId+'', options)
					.then(response => response.json())
					.then(function(response){
						console.log(response);

						// create a url to refer google map
						var address = response.data.body.propertyDescription.address.fullAddress;
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
									var hotelImg = document.createElement("img");
									hotelImg.setAttribute("class", "rounded")
									hotelImg.setAttribute("src", hotelImagesUrl);
									cardDiv.append(hotelImg);
								}
							})
							.catch(err => console.error(err));
						};
					fetchImages();
					console.log(cardDiv);
					})
				};
				fetchDetails();
				hotelCard.appendChild(cardDiv);
						};
					})
				};
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
	var currenciesList = currencyData.rates
	var currenciesListObj = Object.keys(currencyData.rates);
	currenciesListObj.sort();
	console.log(currenciesListObj.length);
	console.log(currenciesList.MXN)
	for(let i = 0; i < currenciesListObj.length; i++) {
		console.log("test");
		var option = document.createElement("option");
		option.innerText=currenciesListObj[i];
		currencies.appendChild(option);	
	}
	var convBtn = document.getElementById("convBtn")

	convBtn.addEventListener("click", function(){
	var rate = currenciesList[currencies.value];
	var amountConv = document.getElementById("amountConv").value;
	var to = document.getElementById("to");
	var result = rate * amountConv;
	to.innerText = result;
	console.log(result);
	console.log(currenciesList[currencies.value])
})
});
