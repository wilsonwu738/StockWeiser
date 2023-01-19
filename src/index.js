// const csvtojson = require('csvtojson');
// import Example from './scripts/example';
// import LineChart from './scripts/hist_price_chart';
// import * as d3 from "d3"
import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const stockPick = document.querySelector('input[name="tickers"]:checked').value

    let priceUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockPick}&apikey=N7AW4I5CEJEADDLD`;
    fetch(priceUrl)
      .then(res => res.json())
      .then(data => { 
        // console.log(data)
        
        let stockData = data["Monthly Time Series"]["2023-01-18"]["4. close"]
        console.log(stockData)
        document.querySelector("#last_quote").innerText = stockData
        let obj = data["Monthly Time Series"]
        
        let result = Object.entries(obj)    //turn data into 2D array
        console.log(result)
        let dateArr = [];
        let priceArr = [];
        for (let i = 0; i < result.length; i++) {
          dateArr.push(result[i][0]);
          priceArr.push(result[i][1]["4. close"]);
        };

        let graph = lineChart(dateArr.reverse(), priceArr.reverse());

        let newResult = result.map((ele) => [ele[0], Number(ele[1]["4. close"])]) //2D array data for d3
        // console.log(newResult)
        // drawChart(newResult)
      })
    

    let infoUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockPick}&apikey=N7AW4I5CEJEADDLD`;
    fetch(infoUrl)
      .then(res => res.json())
      .then(data => { 
        // console.log(data)
        let description = data["Description"];
        let fiftytwoHigh = data["52WeekHigh"];
        let fiftytwoLow = data["52WeekLow"];
        let peRatio = data["PERatio"];
        document.querySelector("#companyDescription").innerText = description;
        document.querySelector("#fiftytwoHigh").innerText = fiftytwoHigh;
        document.querySelector("#fiftytwoLow").innerText = fiftytwoLow;
        document.querySelector("#peRatio").innerText = peRatio;
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






function lineChart(dArr, pArr) {
  
  let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
 
  var ctx = document.getElementById('myChart').getContext('2d')
  // let cleanVanvas = canvas.clearRect(0, 0, 200, 100);
  // let ctx = document.getElementById('myChart').getContext('2d') 
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dArr, // array of dates to use as x-axis labels
          datasets: [{
              label: 'Historical Price',
              data: pArr, // array of data points to plot on the chart
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          // scales: {
          //     x: {
          //         type: 'time', // set the x-axis to use time scale
          //         time: {
          //             parser: 'YYYY-MM-DD', // set the format of the date labels
          //             unit: 'day',
          //             stepSize: 1,
          //             displayFormats: {
          //                 'day': 'MM/DD/YYYY'
          //             }
          //         }
          //     },
          //     y: {
          //         beginAtZero: true
          //     }
          // }
      }
  });


}




//d3.js did not work
// function drawChart(data) {
//   // console.log(data)
//   var svg = d3.select("svg"),
//             margin = 200,
//             width = svg.attr("width") - margin,
//             height = svg.attr("height") - margin
  
//   let dateArr = [];
//   for (let i = 0; i < data.length; i++) {
//     dateArr.push([new Date(data[i][0]), data[i][1]])
//   }
//   console.log(dateArr)

//   var xScale = d3.scaleTime().domain([new Date(data[data.length - 1][0]), new Date(data[0][0])]).range([0, width]);
//   // var xScale = d3.scaleTime().domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })]).range([0, width + 100]);    
//   var yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

//   // var g = svg.append("g")
//   //     .attr("transform", "translate(" + 100 + "," + 100 + ")");

//   // Title
//   svg.append('text')
//   .attr('x', width/2 + 100)
//   .attr('y', 100)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 20)
//   .text('Line Chart');
  
//   // X label
//   svg.append('text')
//   .attr('x', width/2 + 100)
//   .attr('y', height -15 + 150)
//   .attr('text-anchor', 'middle')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Date');
  
//   // Y label
//   svg.append('text')
//   .attr('text-anchor', 'middle')
//   .attr('transform', 'translate(60,' + height + ')rotate(-90)')
//   .style('font-family', 'Helvetica')
//   .style('font-size', 12)
//   .text('Prices');

//   svg.append("g")
//   .attr("transform", "translate(60," + height + ")")
//   .call(d3.axisBottom(xScale));
 
//   svg.append("g")
//   .call(d3.axisLeft(yScale));

//   svg.append('g')
//   .selectAll("dot")
//   .data(dateArr)
//   .enter()
//   .append("circle")
//   .attr("cx", function (d) { return xScale(d[0]); } )
//   .attr("cy", function (d) { return yScale(d[1]); } )
//   .attr("r", 2)
//   .attr("transform", "translate(" + 100 + "," + 100 + ")")
//   .style("fill", "#CC0000");

//   var line = d3.line()
//         .x(function(d) { return xScale(d[0]); }) 
//         .y(function(d) { return yScale(d[1]); }) 
//         .curve(d3.curveMonotoneX)
        
//   svg.append("path")
//     .datum(dateArr) 
//     .attr("class", "line") 
//     .attr("transform", "translate(" + 100 + "," + 100 + ")")
//     .attr("d", line)
//     .style("fill", "none")
//     .style("stroke", "#CC0000")
//     .style("stroke-width", "2");
// }
