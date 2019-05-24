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

//GeoJson for 2015 Data
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




//GeoJson for 2016 Data
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

//GeoJson for 2017 Data
happiness_for_2017 = L.geoJson(world_borders, {
  
  style: function (feature) {
    //console.log(feature.properties.ADMIN);
    //Associate world_borders dataset with the countries in happinessdata_2017
    var happiness_color = "#808080"
    for(i=0;i<happiness_data_2017.length;i++){
      if(feature.properties.ADMIN === happiness_data_2017[i].Country){
      //console.log(happiness_data_2017[i]['Happiness.Score'])
      happiness_color = getColor(happiness_data_2017[i]['Happiness.Score'])
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
        happiness_score = happiness_data[i]['Happiness.Score'].toPrecision(3)
        happiness_rank = happiness_data[i]['Happiness.Rank']
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

  // Allow for selection by year
  // configuration to fix map
  var baseMaps = {
    "Overlay of 2015 Data" : happiness_for_2015,
    "Overlay of 2016 Data" : happiness_for_2016,
    "Overlay of 2017 Data" : happiness_for_2017
    
  };

  var overlayMap = {
  };

  L.control.layers(baseMaps, overlayMap).addTo(map);


  //Second map to show factors influencing happiness (2015 data).

  function getColorGDP(d) {
    return d > 1.35 ? '#0DC81D' :
           d > 1.25  ? '#51D20B' :
           d > 1  ? '#7ED70A' :
           d > .75  ? '#E0E107' :
           d > .5  ? '#E5B606' :
           d > .25   ? '#EB8804' :
           d > .125   ? '#EF5803' :
                        '#F90012';
  }

  function getColorLE(d){
    return d > .875 ? '#0DC81D' :
      d > .75 ? '#51D20B' :
      d > .675  ? '#7ED70A' :
      d > .5  ? '#E0E107' :
      d > .375  ? '#E5B606' :
      d > .25   ? '#EB8804' :
      d > .125   ? '#EF5803' :
                  '#F90012';

  }

  function getColorFamily(d){
    return d > 1.3 ? '#0DC81D' :
      d > 1.2 ? '#51D20B' :
      d > 1.1  ? '#7ED70A' :
      d > 1 ? '#E0E107' :
      d > .75  ? '#E5B606' :
      d > .5   ? '#EB8804' :
      d > .4   ? '#EF5803' :
                  '#F90012';

  }

  function getColorFreedom(d){
    return d > .6 ? '#0DC81D' :
      d > .5 ? '#51D20B' :
      d > .4  ? '#7ED70A' :
      d > .3 ? '#E0E107' :
      d > .2  ? '#E5B606' :
      d > .15   ? '#EB8804' :
      d > .1   ? '#EF5803' :
                  '#F90012';

  }

  function getColorGenerosity(d){
    return d > .5 ? '#0DC81D' :
      d > .4 ? '#51D20B' :
      d > .3  ? '#7ED70A' :
      d > .2 ? '#E0E107' :
      d > .15  ? '#E5B606' :
      d > .1   ? '#EB8804' :
      d > .05   ? '#EF5803' :
                  '#F90012';

  }

  var map2 = L.map('map2',{minZoom: 2, maxZoom: 8}).setView([30,0], 2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + API_KEY, {
      id: 'mapbox.light',
      noWrap: true
  }).addTo(map2);

  //Generosity

  generosity_for_2015 = L.geoJson(world_borders, {
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2015
      var Generosity_color = "#808080"
      

      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
          Generosity_color = getColorFreedom(happiness_data_2015[i]['Generosity'])
        
        }
      }
      //Fill in all the variables
      return {
        fillColor: Generosity_color,
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
      var Generosity_score = 0
      var Generosity
      var flag
      var ranking_array_Generosity = []
      for(i=0;i<happiness_data.length;i++){
      ranking_array_Generosity.push(happiness_data[i]['Generosity'])
      }
      ranking_array_Generosity.sort().reverse()
      //console.log(ranking_array_Generosity)
      for(i=0;i<happiness_data.length;i++){
        if(feature.properties.ADMIN === happiness_data[i].Country){
        Generosity_score = happiness_data[i]['Generosity'].toPrecision(3)
        Generosity = happiness_data[i]['Generosity']
        }
      }
        //console.log(ranking_array_LE)
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+(ranking_array_Generosity.indexOf(Generosity)+1)+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColorGenerosity(Generosity) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Generosity Score: "
        +Generosity_score);
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

  //Freedom

  freedom_for_2015 = L.geoJson(world_borders, {
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2015
      var Freedom_color = "#808080"
      

      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
          Freedom_color = getColorFreedom(happiness_data_2015[i]['Freedom'])
        
        }
      }
      //Fill in all the variables
      return {
        fillColor: Freedom_color,
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
      var Freedom_score = 0
      var Freedom
      var flag
      var ranking_array_Freedom = []
      for(i=0;i<happiness_data.length;i++){
      ranking_array_Freedom.push(happiness_data[i]['Freedom'])
      }
      ranking_array_Freedom.sort().reverse()
      //console.log(ranking_array_Freedom[0])
      for(i=0;i<happiness_data.length;i++){
        if(feature.properties.ADMIN === happiness_data[i].Country){
        Freedom_score = happiness_data[i]['Freedom'].toPrecision(3)
        Freedom = happiness_data[i]['Freedom']
        }
      }
        //console.log(ranking_array_LE)
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+(ranking_array_Freedom.indexOf(Freedom)+1)+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColorFreedom(Freedom) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Freedom Score: "
        +Freedom_score);
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


  //LE 2015

  life_expectancy_for_2015 = L.geoJson(world_borders, {
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2015
      var LE_color = "#808080"
      

      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
        //console.log(happiness_data_2015[i]['Health (Life Expectancy)'])
        LE_color = getColorLE(happiness_data_2015[i]['Health (Life Expectancy)'])
        
        }
      }
      //Fill in all the variables
      return {
        fillColor: LE_color,
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
      var LE_score = 0
      var LE
      var flag
      var ranking_array_LE = []
      for(i=0;i<happiness_data.length;i++){
      ranking_array_LE.push(happiness_data[i]['Health (Life Expectancy)'])
      }
      ranking_array_LE.sort().reverse()
      //console.log(ranking_array_LE[0])
      for(i=0;i<happiness_data.length;i++){
        if(feature.properties.ADMIN === happiness_data[i].Country){
        LE_score = happiness_data[i]['Health (Life Expectancy)'].toPrecision(3)
        LE = happiness_data[i]['Health (Life Expectancy)']
        }
      }
        //console.log(ranking_array_LE)
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+(ranking_array_LE.indexOf(LE)+1)+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColorLE(LE) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Health (LE) Score: "
        +LE_score);
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

  //Family

  family_for_2015 = L.geoJson(world_borders, {
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2015
      var Family_color = "#808080"
      

      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
        //console.log(happiness_data_2015[i]['Health (Life Expectancy)'])
        Family_color = getColorFamily(happiness_data_2015[i]['Family'])
        
        }
      }
      //Fill in all the variables
      return {
        fillColor: Family_color,
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
      var Family_score = 0
      var Family
      var flag
      var ranking_array_Family = []
      for(i=0;i<happiness_data.length;i++){
      ranking_array_Family.push(happiness_data[i]['Family'])
      }
      ranking_array_Family.sort().reverse()
      
      for(i=0;i<happiness_data.length;i++){
        if(feature.properties.ADMIN === happiness_data[i].Country){
        Family_score = happiness_data[i]['Family'].toPrecision(3)
        Family = happiness_data[i]['Family']
        }
      }
        //console.log(ranking_array_LE)
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+(ranking_array_Family.indexOf(Family)+1)+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColorFamily(Family) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"Family Score: "
        +Family_score);
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
  
  //GDP

  GDP_for_2015 = L.geoJson(world_borders, {
  
    style: function (feature) {
      //console.log(feature.properties.ADMIN);
      //Associate world_borders dataset with the countries in happinessdata_2015
      var GDP_color = "#808080"
      for(i=0;i<happiness_data_2015.length;i++){
        if(feature.properties.ADMIN === happiness_data_2015[i].Country){
        console.log(happiness_data_2015[i]['Economy (GDP per Capita)'])
        GDP_color = getColorGDP(happiness_data_2015[i]['Economy (GDP per Capita)'])
        }
      }
      //Fill in all the variables
      return {
        fillColor: GDP_color,
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
      var GDP_score = 0
      var happiness_rank
      var GDP
      var flag
      var ranking_array_GDP = []
      for(i=0;i<happiness_data.length;i++){
      ranking_array_GDP.push(happiness_data[i]['Economy (GDP per Capita)'])
      }
      ranking_array_GDP.sort().reverse()
      //console.log(ranking_array_GDP)
        for(i=0;i<happiness_data.length;i++){
          if(feature.properties.ADMIN === happiness_data[i].Country){
          GDP_score = happiness_data[i]['Economy (GDP per Capita)'].toPrecision(3)
          happiness_rank = happiness_data[i]['Happiness Rank']
          GDP = happiness_data[i]['Economy (GDP per Capita)']
          }
        }
        for(i=0;i<flag_data.length;i++){
          if(feature.properties.ADMIN===flag_data[i].name){
            //console.log(feature.properties.ADMIN, flag_data[i].name, flag_data[i].emoji)
            flag=flag_data[i].emoji
          }
        }
        
        layer.bindPopup("<b><font size =\"+1\">"+feature.properties.ADMIN+" </b>"+flag+"</br> Rank: "+(ranking_array_GDP.indexOf(GDP)+1)+"</font></br>"+
        "<button class='btn_responsive' style=\"background-color:" + getColorGDP(GDP) + "\" onclick='scrapeFunction(this)' id='"+feature.properties.ADMIN+"'>Scrape</button></br>" +"GDP Score: "
        +GDP_score);
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
  }).addTo(map2);

  var baseMaps = {
    "Overlay of GDP" : GDP_for_2015,
    "Overlay of Health" : life_expectancy_for_2015,
    "Overlay of Family" : family_for_2015,
    "Overlay of Freedom": freedom_for_2015,
    "Overlay of Generosity": generosity_for_2015
    
  };

  var overlayMap = {
  };

  L.control.layers(baseMaps, overlayMap).addTo(map2);