var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
getCustomers();

function getCustomers() {
  var uid = parseInt(localStorage.getItem("userId"));

  $.ajax({
    url: `${apiUrl}Customer/GetCustomer/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      // generateFields(result,p);
      convertData(result);
    },
    error: function (error) {
      console.log(error);
      alert("Error .", error);
    },
  });
}

function convertData(dataset) {
  const groupedByManager = Array.from(
    d3.group(dataset, (d) => d.ManagerName),
    ([key, value]) => ({ name: key, children: value })
  );

  groupedByManager.forEach((manager) => {
    manager.children = Array.from(
      d3.group(manager.children, (d) => d.CoordinatorName),
      ([key, value]) => ({ name: key, children: value })
    );

    manager.children.forEach((coordinator) => {
      coordinator.children = Array.from(
        d3.group(coordinator.children, (d) => d.ExecutiveName),
        ([key, value]) => ({ name: key, children: value })
      );

      coordinator.children.forEach((executive) => {
        executive.children = executive.children.map((customer) => ({
          name: customer.CustomerName,
          value: null,
        }));
      });
    });
  });

  const root = { name: "start", children: groupedByManager };


  parentFunction(root);
}
function parentFunction(jsondata) {
  let buttonTracker = [];
  let rootNode = d3.hierarchy(jsondata, (d) => d.children);
  var pathLinks = rootNode.links();
  var updatePathLinks;

  var circleLinks = rootNode.descendants();
  var updateCircleLinks;

  var textLinks = rootNode.descendants();
  var updateTextLinks;

  let dim = {
    width: window.screen.width,
    height: window.screen.height - 100,
    margin: 50,
  };

  let svg = d3
    .select("#chart")
    .append("svg")
    .style("background", "rgb(9 33 5)") // Changed background color
    .attrs(dim);

  document.querySelector("#chart").classList.add("center");

  let g = svg.append("g").attr("transform", "translate(50, 50)");

  let layout = d3.tree().size([dim.width - 100, dim.height - 100]);

  layout(rootNode);

  let lines = g.selectAll("path");

  function update(data) {
    let group = g
      .selectAll("path")
      .data(data, (d, i) => d.target.data.name)
      .join(
        function (enter) {
          return enter.append("path").attrs({
            d: d3
              .linkVertical()
              .x((d) => d.x)
              .y((d) => d.y),
            fill: "none",
            stroke: "white",
          });
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.call((path) =>
            path
              .transition()
              .duration(300)
              .remove()
              .attr(
                "d",
                d3
                  .linkVertical()
                  .x((d) => d.x)
                  .y((d) => d.y)
              )
          );
        }
      )
      .call((path) =>
        path
          .transition()
          .duration(1000)
          .attr(
            "d",
            d3
              .linkVertical()
              .x((d) => d.x)
              .y((d) => d.y)
          )
          .attr("id", function (d, i) {
            return "path" + i;
          })
      );
  }
  update(pathLinks);

  function updateCircles(data) {
    g.selectAll("circle")
      .data(data, (d) => d.data.name)
      .join(
        function (enter) {
          return enter.append("circle").attrs({
            cx: (d) => d.x,
            cy: (d) => d.y,
            r: 12,
            fill: (d) => getColorByLevel(d.depth), // Change fill color based on level
            id: (d, i) => d.data.name,
            class: "sel",
          });
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.call((path) =>
            path
              .transition()
              .duration(300)
              .remove()
              .attrs({
                cx: (d) => d.x,
                cy: (d) => d.y,
                r: 0,
              })
          );
        }
      )
      .call((circle) =>
        circle
          .transition()
          .duration(1000)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
      );

    g.selectAll("circle")
      .on("mouseover", function (d) {
        d3.select(this)
          .attrs({ fill: "orange" })
          .transition()
          .duration(100)
          .attr("r", 16);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .attr("fill", (d) => getColorByLevel(d.depth))
          .transition()
          .duration(100)
          .attr("r", 12);
      })
      .on("click", async function (d) {
        let buttonId = d3.select(this)["_groups"][0][0]["attributes"].id.value;
        let mouseX = d3.select(this)["_groups"][0][0]["attributes"].cx.value;
        let checkButtonExists = buttonTracker.filter(
          (button) => button.buttonId == buttonId
        );

        if (checkButtonExists[0] != undefined) {
          buttonTracker = buttonTracker.filter(
            (button) => button.buttonId != buttonId
          );

          pathLinks = checkButtonExists[0].buttonPathData.concat(pathLinks);
          update(pathLinks);

          circleLinks =
            checkButtonExists[0].buttonCircleData.concat(circleLinks);
          updateCircles(circleLinks);

          textLinks = checkButtonExists[0].buttonTextData.concat(textLinks);
          updateText(textLinks);

          return;
        }

        var valueArray = await processedlinks(d.links());

        updatePathLinks = pathLinks.filter(function (item) {
          return !valueArray.includes(item.target.data.name);
        });

        var clickedPathData = pathLinks.filter(function (item) {
          return valueArray.includes(item.target.data.name);
        });

        updateCircleLinks = circleLinks.filter(function (item) {
          return !valueArray.includes(item.data.name);
        });

        var clickedCircleData = circleLinks.filter(function (item) {
          return valueArray.includes(item.data.name);
        });

        updateTextLinks = textLinks.filter(function (item) {
          return !valueArray.includes(item.data.name);
        });

        var clickedTextData = textLinks.filter(function (item) {
          return valueArray.includes(item.data.name);
        });

        buttonTracker.push({
          buttonId: buttonId,
          buttonPathData: clickedPathData,
          buttonCircleData: clickedCircleData,
          buttonTextData: clickedTextData,
        });

        update(updatePathLinks);
        updateCircles(updateCircleLinks);
        updateText(updateTextLinks);

        async function processedlinks(dlinks) {
          var valueArray = [];
          return new Promise((resolve, reject) => {
            dlinks.forEach(async (element) => {
              valueArray.push(element.target.data.name);
            });
            resolve(valueArray);
          });
        }

        pathLinks = updatePathLinks;
        circleLinks = updateCircleLinks;
        textLinks = updateTextLinks;
      });
  }

  updateCircles(rootNode.descendants());

  function updateText(data) {
    g.selectAll("text")
      .data(data, (d) => d.data.name)
      .join(
        function (enter) {
          return enter
            .append("text")
            .attrs({
              x: (d) => d.x,
              y: (d) => d.y + 20,
              "font-size": 0,
            })
            .text((d) => d.data.name);
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.call((text) =>
            text
              .transition()
              .duration(300)
              .remove()
              .attrs({
                x: (d) => d.x,
                y: (d) => d.y,
                "font-size": 0,
              })
          );
        }
      )
      .call((text) =>
        text
          .transition()
          .duration(1000)
          .attrs({
            x: (d) => d.x,
            y: (d) => d.y + 20,
            "font-size": 15,
            fill: "white",
          })
      );
  }

  updateText(textLinks);

  function getColorByLevel(level) {
    switch (level) {
      case 0:
        return "#1ABC9C";
      case 1:
        return "#3498DB";
      case 2:
        return "#E67E22";
      case 3:
        return "#9B59B6";
      default:
        return "#ECF0F1";
    }
  }
}
