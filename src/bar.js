/**
 *
 * bar.js
 * simple, elegant bar chart library
 * 01.29.2019 - version 1.0
 * https://github.com/brodave318/barChartJS
 *
 * Copyright dave brodave318@gmail.com
 * Relased under the MIT License
 * https://github.com/brodave318/barChartJS/blob/master/LICENSE.md
 *
 */
"use strict";

function BarChart(targetId, width, height, data) {
  // Base
  const chart = this;

  // Specify Configurations
  chart.configureChart(targetId, width, height, data);

  // Pre Operations
  chart.performPreOperations();

  // Draw Chart
  chart.drawChart();
}

BarChart.prototype.configureChart = function(targetId, width, height, data) {
  // Base
  const chart = this;

  // Global Specifications come from outside
  chart.setCanvasParameters(targetId, width, height, data);

  // Chart Specifications
  chart.setChartParameters();
};

BarChart.prototype.setCanvasParameters = function(
  targetId,
  width,
  height,
  data
) {
  // Base
  const chart = this;

  // Canvas Specifications come from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function() {
  // Base
  const chart = this;

  // X Configurations
  chart.axisRatio = 10; // in terms of percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = "#b1b1b1";
  chart.axisWidth = 0.75;

  // Label Configurations
  chart.fontRatio = 3; // in terms of percentage
  chart.fontFamily = "times";
  chart.fontStyle = "normal";
  chart.fontWeight = "300";
  chart.fontColor = "#666";
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline Configurations
  chart.guidelineColor = "#e5e5e5";
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performPreOperations = function() {
  // Base
  const chart = this;

  // Create Canvas
  chart.createCanvas();

  // Get data
  chart.handleData();

  // Prepare data
  chart.prepareData();
};

BarChart.prototype.createCanvas = function() {
  // Base
  const chart = this;

  // Create Canvas
  const canvas = document.createElement("canvas");
  canvas.id = chart + "-" + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append canvas to target container
  document.getElementById(chart.id).innerHTML = ""; // clean container
  document.getElementById(chart.id).appendChild(canvas); // add canvas to clean content;

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext("2d");
};

BarChart.prototype.handleData = function() {
  // Base
  const chart = this;

  // Data sets
  chart.labels = [];
  chart.values = [];

  // Handle Data
  chart.data.forEach(item => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function() {
  // Base
  const chart = this;

  // Global variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // X Specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margins
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin; // left and right margins

  // Label Specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function() {
  // Base
  const chart = this;

  // Vertical Axis
  chart.drawVerticalAxis();

  // Vertical Labels
  chart.drawVerticalLabels();

  // Horizontal Axis
  chart.drawHorizontalAxis();

  // Horizontal Labels
  chart.drawHorizontalLabels();

  // Horizontal GuideLines
  chart.drawHorizontalGuidelines();

  // Vertical Guidelines
  chart.drawVerticalGuidelines();

  chart.drawBars();
};

BarChart.prototype.drawVerticalAxis = function() {
  // Base
  const chart = this;

  // Verticle Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabels = function() {
  // Base
  const chart = this;

  // Text Specifications
  const labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    "px " +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = "right";
  chart.context.fillStyle = chart.fontColor;

  // Scale Values
  const scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  // Draw Labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    const labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
    const verticalLabelX =
      chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalAxis = function() {
  // Base
  const chart = this;

  // Verticle Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );
  chart.context.stroke();
};

BarChart.prototype.drawHorizontalLabels = function() {
  // Base
  const chart = this;

  // Text Specifications
  const labelFont =
    chart.fontStyle +
    " " +
    chart.fontWeight +
    " " +
    chart.verticalFontSize +
    "px " +
    chart.fontFamily;
  chart.context.font = labelFont;
  chart.context.textAlign = "center";
  chart.context.textBaseline = "top";
  chart.context.fillStyle = chart.fontColor;

  // Draw Labels
  for (let i = 0; i < chart.itemsNum; i++) {
    const horizontalLabelX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / 2;
    const horizontalLabelY =
      chart.height -
      chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio;

    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuidelines = function() {
  // Base
  const chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Scale Values
  const scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq;

  // Draw Labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    // Starting point coordinates
    const horizontalGuidelineStartX = chart.horizontalMargin;
    const horizontalGuidelineStartY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;

    // End point coordinates
    const horizontalGuidelineEndX =
      chart.horizontalMargin + chart.horizontalAxisWidth;
    const horizontalGuidelineEndY =
      chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawVerticalGuidelines = function() {
  // Base
  const chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Draw Labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    // Starting point coordinates
    const verticalGuidelineStartX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq;
    const verticalGuidelineStartY = chart.height - chart.verticalMargin;

    // End point coordinates
    const verticalGuidelineEndX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq;
    const verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawBars = function() {
  // Base
  const chart = this;

  const color = chart.createRandomRGBColor();

  for (let i = 0; i < chart.itemsNum; i++) {
    const color = chart.createRandomRGBColor();
    const fillOpacity = "0.3";
    const fillColor = `rgba(${color.r}, ${color.g}, ${
      color.b
    }, ${fillOpacity})`;
    const borderColor = `rgba(${color.r}, ${color.g}, ${color.b})`;

    chart.context.beginPath();

    const barX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      (2 * chart.horizontalLabelFreq) / chart.axisRatio;
    const barY = chart.height - chart.verticalMargin;
    const barWidth =
      chart.horizontalLabelFreq -
      (2 * chart.horizontalLabelFreq) / chart.axisRatio;
    const barHeight =
      (-1 * chart.verticalAxisWidth * chart.values[i]) / chart.maxValue;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.createRandomRGBColor = function() {
  const red = getRandomInt(0, 257);
  const green = getRandomInt(0, 257);
  const blue = getRandomInt(0, 257);
  return { r: red, g: green, b: blue };
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
