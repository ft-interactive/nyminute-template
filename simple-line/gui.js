document.querySelector('#datainput').addEventListener('change', function() {
  var data = d3.tsv.parse(this.value);
  drawFrames(data);
  handleData(data);
});
