
//graph options
var lineSmoothing="linear";//choose 'linear' for an unsmoothed line 'monotone' for smooth
var logScale=false;
var logScaleStart=1000;
var markers=false;//show circle markers
var numTicksy = 3;//rough number of ticks for y axis
var numTicksx = 5;//rough number of ticks for x axis
var interval="years";//days, months or years
var tick//=[0.2,0.3];//option to force x-axis tick values for online
var yAxisMin; // optional. use as overrides
var yAxisMax; // optional. use as overrides
var roundLines=true; // true for rounded corners

// leave these blank if you don't want to override the dates
var overrideFirstDate; // e.g. "May 4,|2014"
var overrideLastDate; // if there's a |, it will put stuff after the comma on a second line


// listen to change on form and reload frames
document.querySelectorAll('form > *').forEach(function(selector) {
  selector.addEventListener('change', function() {
    drawChart();
  });
});

drawChart();

function drawChart() {
  var data;
  if (document.querySelector('#datainput').value === '') {
    var dataURL = "data.tsv"

    if (dataURL.indexOf('.csv') >= 0) {
        d3.csv(dataURL, function(data) {
          updatePage(data);
        });
    } else {
        d3.tsv(dataURL, function(data) {
          updatePage(data);
        });
    }
  } else {
    data = d3.tsv.parse(document.querySelector('#datainput').value);
    updatePage(data);
  }
}

function updatePage(data) {
  var title = document.querySelector('#title').value;
  var source = document.querySelector('#source').value || "Source: Bloomberg";
  var yAxisHighlight = document.querySelector('#yAxisHighlight').value;
  var yAxisHighlightLabelSide = document.querySelector('#yAxisHighlightLabelSide').value;
  var unit = document.querySelector('#unit').value;
  var valueFormat = document.querySelector('#valueFormat').value;
  var gaps = (document.querySelector('#gaps').value === 'true');
  var xAxisDateFormat = document.querySelector('#xAxisDateFormat').value;
  var secondLineXAxisDateFormat = document.querySelector('#secondLineXAxisDateFormat').value;

  drawFrames(data, title, source);
  handleData(data, yAxisHighlight, yAxisHighlightLabelSide, unit, valueFormat, gaps, xAxisDateFormat, secondLineXAxisDateFormat);
}
