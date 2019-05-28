// Define url routes coming from flask
var url_data_2015 = "/data/2015";
var url_data_2016 = "/data/2016";
var url_data_2017 = "/data/2017";

//Create the basic happiness choropleth
var map = L.map('map',{minZoom: 2, maxZoom: 8}).setView([30,0], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + API_KEY, {
    id: 'mapbox.light',
    noWrap: true
}).addTo(map);


//Function to determine coloring based on happiness score
function getColor(d) {
  return d > 7.00 ? '#00ECFF' :
         d > 6.5  ? '#00FCC3' :
         d > 6  ? '#00FA77' :
         d > 5.5  ? '#1BF500' :
         d > 5  ? '#EDEC00' :
         d > 4   ? '#EBA400' :
         d > 3.00   ? '#E85E00' :
                    '#E61900';
}

//Test function
function scrapeFunction(button) {
  console.log(button.id);
  document.getElementById("textField").value = button.id;
  console.log("Search term updated.");
  document.getElementById("search").click();
};

///////////////////////////////////////////////////////
// Legend 
///////////////////////////////////////////////////////
// Create Legend display on the bottom right.
var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var happiness_ranks = [0.00,3,4,5,5.5,6,6.5,7.00];
    var colors = ["#E61900",'#E85E00','#EBA400','#EDEC00','#1BF500','#00FA77','#00FCC3','#00ECFF']
    var labels = [];

    // Add min & max
    var legendInfo = "<h2><center>Happiness Score</center></h2>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + happiness_ranks[0] + "</div>" +
        "<div class=\"max\">" + happiness_ranks[happiness_ranks.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    happiness_ranks.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
// Adding legend to the map
legend.addTo(map);


///////////////////////////////////////////////////////
// Create chloropleths from kaggle happiness data 
///////////////////////////////////////////////////////
// Synchronize all of the layers to be created one after another
// The nestes d3.json() calls are needed because d3.json() makes an
// asynchronous call, which means other code blocks won't know what is going on within the 
// d3.json() code block.
d3.json(url_data_2015, function(error1, happiness_data_2015) {
  // layer for 2015 data
  happiness_for_2015 = L.geoJson(world_borders, {
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2017
      var happiness_color = "#808080"
      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
        //console.log(happiness_data_2015[i]['Happiness Score'])
        happiness_color = getColor(happiness_data_2015[i]['Happiness Score'])
        }
      }
      //Fill in all the variables
      return {
        fillColor: happiness_color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
    },
    
    //onEachFeature
    onEachFeature: function (feature, layer) {
      var happiness_data = happiness_data_2015
      var happiness_score = 0
      var happiness_rank
      var flag
        for(i=0;i<happiness_data.length;i++){
          if(feature.properties.ADMIN === happiness_data[i].Country){
          happiness_score = happiness_data[i]['Happiness Score'].toPrecision(3)
          happiness_rank = happiness_data[i]['Happiness Rank']
          }
        }
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+happiness_rank+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColor(happiness_score) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Happiness Score: "
        +happiness_score);
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.6
            });
          },
          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
    
        });
    }
  });
  // Nested json for synchronizing the 
  d3.json(url_data_2016, function(error2, happiness_data_2016) {
    // Layer for 2016 data
    happiness_for_2016 = L.geoJson(world_borders, {
    
      style: function (feature) {
        //(feature.properties.ADMIN);
        //Associate world_borders dataset with the countries in happinessdata_2016
        var happiness_color = "#808080"
        for(i=0;i<happiness_data_2016.length;i++){
          if(feature.properties.ADMIN === happiness_data_2016[i].Country){
          //console.log(happiness_data_2016[i]['Happiness Score'])
          happiness_color = getColor(happiness_data_2016[i]['Happiness Score'])
          }
        }
        //Fill in all the variables
        return {
          fillColor: happiness_color,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.6
      };
      },
      
      //onEachFeature
      onEachFeature: function (feature, layer) {
        var happiness_data = happiness_data_2016
        var happiness_score = 0
        var happiness_rank
        var flag
          for(i=0;i<happiness_data.length;i++){
            if(feature.properties.ADMIN === happiness_data[i].Country){
            happiness_score = happiness_data[i]['Happiness Score'].toPrecision(3)
            happiness_rank = happiness_data[i]['Happiness Rank']
            }
          }
          for(i=0;i<flag_data.length;i++){
            if(feature.properties.ADMIN===flag_data[i].name){
              //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
              flag=flag_data[i].emoji
            }
          }
          layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+happiness_rank+"</font></br>"+
          "<button class='btn_responsive' style=\"background-color:" + getColor(happiness_score) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Happiness Score: "
          +happiness_score);
          layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function(event) {
              
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function(event) {
              
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.6
              });
            },
            // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
      
          });
      }
    });
    d3.json(url_data_2017, function(error3, happiness_data_2017) {
      // layer for 2017 data
      happiness_for_2017 = L.geoJson(world_borders, {
        style: function (feature) {
          //console.log(feature.properties.ADMIN);
          //Associate world_borders dataset with the countries in happinessdata_2017
          var happiness_color = "#808080"
          for(i=0;i<happiness_data_2017.length;i++){
            if(feature.properties.ADMIN === happiness_data_2017[i].Country){
            //console.log(happiness_data_2017[i]['Happiness.Score'])
            happiness_color = getColor(happiness_data_2017[i]['Happiness Score'])
            }
          }
          //Fill in all the variables
          return {
            fillColor: happiness_color,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.6
        };
        },
        
        //onEachFeature
        onEachFeature: function (feature, layer) {
          var happiness_data = happiness_data_2017
          var happiness_score = 0
          var happiness_rank
          var flag
            for(i=0;i<happiness_data.length;i++){
              if(feature.properties.ADMIN === happiness_data[i].Country){
              happiness_score = happiness_data[i]['Happiness Score'].toPrecision(3)
              happiness_rank = happiness_data[i]['Happiness yRank']
              }
            }
            for(i=0;i<flag_data.length;i++){
              if(feature.properties.ADMIN===flag_data[i].name){
                //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
                flag=flag_data[i].emoji
              }
            }
            layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+happiness_rank+"</font></br>"+
            "<button class='btn_responsive' style=\"background-color:" + getColor(happiness_score) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Happiness Score: "
            +happiness_score);
            layer.on({
              // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
              mouseover: function(event) {
                
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.9
                });
              },
              // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
              mouseout: function(event) {
                
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.6
                });
    
              
              },
              // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        
            });
        }
      }).addTo(map);

      // Allow for selection by year
      // configuration to fix map
      var baseMaps = {
        "Overlay of 2015 Data" : happiness_for_2015,
        "Overlay of 2016 Data" : happiness_for_2016,
        "Overlay of 2017 Data" : happiness_for_2017  
      };
      var overlayMap = {};
      L.control.layers(baseMaps, overlayMap).addTo(map);
    });
  });
});