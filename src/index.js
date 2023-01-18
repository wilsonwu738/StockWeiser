const csvtojson = require('csvtojson');
import Example from './scripts/example';
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const stockPick = document.querySelector('input[name="tickers"]:checked').value
    console.log(stockPick)
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockPick}&apikey=N7AW4I5CEJEADDLD`;
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(data => { 
        let stockData = data["Monthly Time Series"]['2023-01-17']["4. close"]
        document.querySelector("#last_quote").innerText = stockData
      // console.log(stockData["Monthly Time Series"]['2023-01-17']["4. close"])
      })
  })
  //this fetch the CSV format of the intraday data.
  // let url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&slice=year1month1&apikey=N7AW4I5CEJEADDLD`;
  // const stockData = fetch(url2) //
  //   .then(res => res.text())
  //   .then(csv => { 
  //     csvtojson().fromString(csv)
  //     .then(jsonObj => {
  //       console.log(jsonObj)
  //     })
  //   })
  
  
})




//define graph.js file, inside, use d3/chart.js

//nest everyhting in contentload