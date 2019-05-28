var url_data_2015 = "/data/2015.json";
var url_data_2016 = "/data/2016.json";
var url_data_2017 = "/data/2017.json";

// Scatter plot
var spec = "https://gist.githubusercontent.com/ksan1510/68b4fb83c69da9199fe21d3ca7d9bf9d/raw/206d24dcd5d3f8cc18c785a8bfe1df2ebdff3bef/happycorrvega.json";
vegaEmbed('#plot1', spec).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

// Bar Chart
var spec = "https://gist.githubusercontent.com/ksan1510/ab2332d381aa97d130450755924d215b/raw/1eb25e81cf3c8f1c01ba71378bfae6b5a92c4a0e/happyscoreavg.json";
vegaEmbed('#plot2', spec).then(function(result) {
// Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);


// Interactive table
// var table_plot = makeTable()
//   .json(url_data_2015)
//   .sortBy('Country', true)
//   .filterCols(['col', 'Whisker.high', 'Whisker.low']);

// d3.select('#plot3').call(table_plot);

// table_plot.on('highlight', function(data, on_off){
//   if(on_off){//if the data is highlighted
//     d3.select('#highlighted').text(
//       'Select a Country ' + data.Country
//     );
//   }
// });
// table_plot.on('select', function(data, on_off){
//   if(on_off){//if the data is highlighted
//     d3.select('#selected').text(
//       'Country chosen ' + data.Country
//     );
//   }
// });


