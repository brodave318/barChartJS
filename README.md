# barChartJS
Lightweight, configurable and simple bar chart library in JS

![](https://img.shields.io/packagist/l/doctrine/orm.svg.svg?style=flat)
![](https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686.svg?style=flat)
![](https://img.shields.io/chrome-web-store/stars/nimelepbpejjlbmoobocpfnjhihnpked.svg.svg?style=flat)

## Description
barChartJS is a Canvas based simple Javascript Bar Chart Library to provide a configurable, lightweight and dependency-free experience.

![](https://github.com/brodave318/barChartJS/blob/master/barChart.png)

## Installation Guide
Download the `barChart.min.js` and include it in your project

```html
<script src="barChart.min.js"></script>
```

## Usage
To create the bar chart, you need a block level container like a div or p.

```html
<div id="chart">This will be bar chart!</div>
```

Then you can create the BarChart object in your JavaScript file
```js
const bacrChart = new BarChart(chartId, chartWidth, chartHeight, data);
```

### Parameters
- `chartId - containerId (String)`
Defines the id of container like "chart"

- `chartWidth (Interger)`
Define the width of the chart like 500

- `data (Objects Array)`
Defines the data objects. The objects should have 2 key-value pairs: label and value. Example data:

```js
  const data = [
    { label: "Jan", value: 23 },
    { label: "Feb", value: 11 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 893 },
    { label: "May", value: 343 }
  ];
  ```
  
  ## Licence
  [MIT](LICENSE.md) © [dave](https://github.com/brodave318/barChartJS/blob/master/LICENSE.md)
