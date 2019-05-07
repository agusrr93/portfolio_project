function dataset (path) {
  d3.json("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", (json) => {
      let w = window.innerWidth
      let h = 799
      
      let svg = d3.select("#map")
                  .append("svg")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("width", w)
                  .attr("height", h)
                  .classed("chart-wrap", true)
                  .call(d3.behavior.zoom().on("zoom", function () {
                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
                  }))
                  .append("g")
                
      let projection = d3.geo.mercator().translate([w/2, h/2])
      let land = d3.geo.path()
                        .projection(projection)

      let world = svg.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", land)
                    .style("fill", "#cacaca")

    let happiness
    d3.csv(path, function(data) {
      data.forEach((element, index) => {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${element.Country}&key=AIzaSyCstiZ8PQculYTGWNmyiS2Rfz3-QGNX8ro`,
            async: false,
            success: function (resp) {
              element.flag = resp.results[0].address_components[0].short_name
              element.lat = resp.results[0].geometry.location.lat
              element.lng = resp.results[0].geometry.location.lng
            }
        })
      })
      
      happiness = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(datum) {
                  return projection([datum.lng, datum.lat])[0]
                })
                .attr("cy", function(datum) {
                  return projection([datum.lng, datum.lat])[1]
                })
                .attr("r", function(datum) {
                  return datum["Happiness Score"] * 2
                })
                .style("fill", function(datum) {
                  if (datum["Happiness Score"] > 7) {
                    return "#89cc02"
                  } else if (datum["Happiness Score"] > 6) {
                    return "#c8c903"
                  } else if (datum["Happiness Score"] > 5) {
                    return "#eed50a"
                  } else if (datum["Happiness Score"] > 4) {
                    return "#f09802"
                  } else {
                    return "#e20405"
                  }
                })
                .style("opacity", 0.75)

      happiness.on("mouseover", function(single) {
        let xPosition = parseFloat(d3.select(this).attr("cx")) + 20
        if (xPosition > window.innerWidth / 2 + 30) {
          xPosition = parseFloat(d3.select(this).attr("cx")) - 220
        }
        let yPosition = parseFloat(d3.select(this).attr("cy")) + 50

        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .attr("class", "ui button detail_btn")
          .attr("type", "button")
          .select("#name")
          .text(single.Country)         
        d3.select("#tooltip")
          .select("#region")
          .text(single.Region)
        d3.select("#tooltip")
          .select("#score")
          .text(Math.round(single["Happiness Score"] * 10000) / 10000) 
        d3.select("#tooltip")
          .select("#rank")
          .text(Math.round(single["Happiness Rank"] * 10000) / 10000)
        d3.select("#tooltip").classed("hidden", false)
        d3.select(this).style('stroke', 'black')
      })

      happiness.on("click", function(single) {
        d3.event.stopPropagation()
        d3.select("#opmodal")
          .select("#img")
          .attr("src", `https://www.countryflags.io/${single.flag}/flat/64.png`)
        d3.select("#opmodal")
          .select("#name")
          .text(single.Country)
        d3.select("#opmodal")
          .select("#region")
          .text(single.Region)
        d3.select("#opmodal")
          .select("#score")
          .text(Math.round(single["Happiness Score"] * 10000) / 10000) 
        d3.select("#opmodal")
          .select("#rank")
          .text(Math.round(single["Happiness Rank"] * 10000) / 10000)
        d3.select("#opmodal")
          .select("#economy")
          .text(Math.round(single["Economy (GDP per Capita)"] * 10000) / 10000)
        d3.select("#opmodal")
          .select("#life")
          .text(Math.round(single["Health (Life Expectancy)"] * 10000) / 10000)
        d3.select("#opmodal")
          .select("#freedom")
          .text(Math.round(single["Freedom"] * 10000) / 10000)
        d3.select("#opmodal")
          .select("#generosity")
          .text(Math.round(single["Generosity"] * 10000) / 10000)
      })

      happiness.on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true)
        d3.select(this).style('stroke', 'initial')
      })
    })
  })
}

dataset(`/world-happiness-report/2015.csv`)

function data(input) {
  d3.selectAll("svg").remove()
  dataset(`/world-happiness-report/${input}.csv`)
}