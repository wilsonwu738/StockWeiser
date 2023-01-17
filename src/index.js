const csvtojson = require('csvtojson');
import Example from './scripts/example';
document.addEventListener("DOMContentLoaded", () => {
  let stock_ticker = 'AAPL';
  let url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock_ticker}&apikey=N7AW4I5CEJEADDLD`;
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&slice=year1month1&apikey=N7AW4I5CEJEADDLD`;
  fetch(url2)
    .then(res => res.json())
    .then(data => { 
      let stockData = data
      document.querySelector("#last_quote").innerText = JSON.stringify(stockData)
      console.log(stockData["Monthly Time Series"]['2023-01-17']["4. close"])
      console.log(stockData)
    })

  const stockData = fetch(url)
    .then(res => res.text())
    .then(csv => { 
      csvtojson().fromString(csv)
      .then(jsonObj => {
        console.log(jsonObj)

      })
      // let stockData = csvtojson(csv)
      // console.log(stockData)
      // document.querySelector("#last_quote").innerText = JSON.stringify(stockData)
    })
  
  console.log(JSON.stringify(stockData))
})




//define graph.js file, inside, use d3/chart.js

//nest everyhting in contentload