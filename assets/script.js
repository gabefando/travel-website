var inputNav = document.getElementById("inputNav");
var currencies = document.getElementById("currencies");
const hotelCard = document.getElementById("hotel-card");
const destination = document.getElementById("destination");

// Hotels API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c8cf0e0ac6msh2e511bdd7650d44p19674ejsn5c64dddbd8d6',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

function inputSearch() {
	if (localStorage.getItem("search")) {
        let x = localStorage.getItem("search");
        inputNav.innerText = x;
		destination.innerText = "Hotels in " + x[0].toUpperCase() + x.substring(1);
		
		fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query='+x+'&locale=en_US&currency=USD', options)
		.then(response => response.json())
		.then(function(response){
			let entities = response.suggestions[1].entities;
			console.log(entities);
			for(let i = 0; i < entities.length; i++) {
				//create card div element
				var cardDiv = document.createElement("div");
				cardDiv.setAttribute("class", `card col-1 me-2 test-${i}`);
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

				cardBody.append(hotelRating);
				var destId = entities[i].destinationId;
				function fetchDetails() {
					fetch('https://hotels4.p.rapidapi.com/properties/get-details?id='+destId+'', options)
					.then(response => response.json())
					.then(function(response){
						console.log(response);

						// create a url to refer google map
						var hotelAddress = document.createElement("a");
						hotelAddress.setAttribute("class", `btn btn-primary`);
						hotelAddress.setAttribute("target", "_blank");
						
						var googleMapUrl = "https://www.google.com/maps/place/";
						var address = response.data.body.propertyDescription.address.fullAddress;
						var addressArray = address.split(" ");
						googleMapUrl = googleMapUrl + addressArray.join("+");
						
						hotelAddress.setAttribute("href", googleMapUrl);
						hotelAddress.textContent = "See Hotel";
						
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
									var test = document.querySelector(`.test-${i}`)
									hotelImg.setAttribute("class", "rounded")
									hotelImg.setAttribute("src", hotelImagesUrl);
									test.append(hotelImg);
									test.append(hotelAddress);
								}
							})
							.catch(err => console.error(err));
						};
					fetchImages();
					})
				};
				fetchDetails();
				hotelCard.appendChild(cardDiv);
				console.log(hotelCard);
			};
				})
			};
		};

// use add event listener so that when button is clicked, the js is updated
document.getElementById("btnNav").addEventListener("click", function(event) {
	event.preventDefault;
	localStorage.setItem("search", inputNav.value);
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