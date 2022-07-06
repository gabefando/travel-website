const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";


fetch (url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.length);
        for(keys in data){
            console.log(data[keys]);
        }
    })