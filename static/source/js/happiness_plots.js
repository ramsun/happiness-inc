var url_data_2015 = "/data/2015";
var url_data_2016 = "/data/2016";
var url_data_2017 = "/data/2017";

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
var viz = d3.maptable('#plot3')
    .json(url_data_2015)
    .columns({
      position: {
        filterMethod: 'dropdown',
      },
      office: {
        filterMethod: 'dropdown',
      },
      start_date: {
        filterMethod: 'compare',
        filterInputType: 'date',
        dataParse: function(val) {
          return new Date(val).getTime();
        }
      },
      salary: {
        filterMethod: 'compare',
        filterInputType: 'number',
        dataParse: function(val) {
          return parseInt(val.replace(/[^0-9]+/g, ''), 10);
        }
      },
      links: {
        virtual: function(d) {
          return '<a href="#' + d.extn+ '">Link</a>';
        }
      }
    })
    .filters({
        show: ['Country','HappinessRank','Economy (GDP per Capita)','Family','Health (Life Expectancy)', 'Freedom', 'Trust (Government Corruption)', 'Generosity', 'Dystopia']
    })
    .table({
        show: ['Country','HappinessRank','Economy (GDP per Capita)','Family','Health (Life Expectancy)', 'Freedom', 'Trust (Government Corruption)', 'Generosity', 'Dystopia']
    })
    .render();

