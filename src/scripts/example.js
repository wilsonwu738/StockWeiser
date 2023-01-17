class Example {
  constructor(ele) {
    this.ele = ele;
    this.ele.innerHTML = "<h1>StockWeiser is Live!!!</h1>"
    this.handleClick = this.handleClick.bind(this);
    this.ele.addEventListener('click', this.handleClick);
    this.getData()
  }

  handleClick(e) {
    e.preventDefault();
    this.ele.children[0].innerText = 'Ouch!'
  }

  getData() {
    let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&interval=5min&apikey=N7AW4I5CEJEADDLD'
    const stockData = fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
  }
}



export default Example;