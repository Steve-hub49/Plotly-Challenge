function buildMetadata(samples) {

    var plotData = "samples.json";
    d3.json(plotData).then(function(sample){ 
        var metaData= sample.metadata;
        var array = metaData.filter(obj => obj.id == samples);
        var firstItem = array[0]

        var sampleData = d3.select('#sample-metadata');
        // console.log(firstItem)
        sampleData.html(" ");
  
        Object.entries(firstItem).forEach(function ([key, value]) {
        var row = sampleData.append('panel-body');
        row.text(`${key}: ${value} \n`);
  })
  });

  }
  

  function buildCharts(samples) {
  
  // var plotData = `/samples/${sample}`;
    var plotData = "samples.json";
 //   d3.json(plotData).then(function(sample){ 
//       var metaData= sample.metadata;
//       var array = metaData.filter(obj => obj.id == samples);
//       var firstItem = array[0]
  d3.json(plotData).then(function (item) {

    var Samples = item.samples
    var array = Samples.filter(obj => obj.id == samples);
    var data = array[0];

    var x_axis = data.otu_ids;
    var y_axis = data.sample_values;
    var size = data.sample_values;
    var color = data.otu_ids;
    var texts = data.otu_labels;
  
    var bubble = {
  
      x: x_axis,
      y: y_axis,
      text: texts,
      mode: `markers`,
      marker: {
        size: size, 
        color: color
      }
    };
      
    var data = [bubble];
    var layout = {
      xaxis: {title: "OTU ID"}, 
      title: "Belly Button Bacteria",
      
    };
  
    Plotly.newPlot('bubble', data, layout);
  
    d3.json(plotData).then(function(data) {
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);

      // var piechart = [{
        // values: values,
        // labels: labels,
        // hovertext: display,
        // type: "pie"

      // }];
      // Plotly.newPlot('bar', pieChart);

    });

  });

};

function init() {

var selector = d3.select(#selDataset);

    
      var bar = [{
        x: x_axis,
        y: y_axis,
        text: texts,
        mode: `markers`,
        marker: {
        size: size, 
        color: color
    
    }];  
      
    var data = [{
      type: bar,
      x: x_axis,
      y: y_axis,
      orientation: 'h'
    }];

    var layout = {
      xaxis: {title: "OTU ID"},
      title: "Top Ten OTUs Found in Individual",

      };

    Plotly.newPlot('bar', data, layout);

    d3.json(plotData).then(function(data) {
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);
   
    });
 
    
  function init() {

  
  var selector = d3.select("#selDataset");
 
 
 
//   var plotData = "samples.json";
//   d3.json(plotData).then(function(sample){ 
//       var metaData= sample.metadata;
//       var array = metaData.filter(obj => obj.id == sample);
//       var firstItem = array[0]

  var plotData = "samples.json";

  d3.json(plotData).then((sampleNames) => {
    var names = sampleNames.names;
    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      });
  
  
    let firstSample = names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }
 
  function optionChanged(newSample) {
    
    buildCharts(newSample);
    buildMetadata(newSample);
  }

  init ()};
