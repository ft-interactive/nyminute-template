
function lineChart(data,stylename,media,plotpadding,legAlign,lineSmoothing, logScale, logScaleStart,yHighlight, yAxisHighlightLabelSide, markers, numTicksy, numTicksx, yAlign, ticks, yAxisMin, yAxisMax, xAxisDateFormat, secondLineXAxisDateFormat, valueFormat, overrideFirstDate, overrideLastDate, roundLines, gaps){


    var titleYoffset=0;
    var subtitleYoffset=0;

    // return the series names from the first row of the spreadsheet
    var seriesNames = Object.keys(data[0]).filter(function(d){ return d != 'date' && d != 'highlight' && d != 'annotate' ; });
    //Select the plot space in the frame from which to take measurements
    var frame=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")

    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));

    //Get the width,height and the marginins unique to this chart
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=plotpadding.filter(function(d){
        return (d.name === media);
      });
    margin=margin[0].margin[0]
    var colours=stylename.linecolours;
    var plotWidth = w-(margin.left+margin.right);
    var plotHeight = h-(margin.top+margin.bottom);

    //calculate range of time series
    var xDomain = d3.extent(data, function(d) {return d.date;});

    if (gaps) {
        xDomain = data.map(function(d) { return d.date; });
    }
    var yDomain;

    //calculate range of y axis series data
    var min=yAxisMin || 10000000000000000000;
    var max=yAxisMax || -10000000000000000000;

    data.forEach(function(d,i){
        seriesNames.forEach(function(e){
            if (d[e]){
                min=Math.min(min,d[e]);
                max=Math.max(max,d[e]);
            }
        });
    });
    yDomain=[min,max];

    //create a separate array for each series, filtering out records of each  series for which there are no data
    var plotArrays = [];
    seriesNames.forEach(function(series,i){
        plotArrays[i] = [];
    });
    data.forEach(function(d,i){
        seriesNames.forEach(function(series,e){
            var myRow = new Object();
            myRow.date=d.date;
            myRow.highlight=d.highlight;
            myRow.annotate=d.annotate;
            myRow.val=d[series];
            if (myRow.val){
                plotArrays[e].push(myRow);
            }   else    {
                //console.log('skipped a value:'+i);
            }
        });
    });

    //Scales

    var yScale;
        if (logScale) {
			yScale = d3.scale.log()
			.domain([logScaleStart,max])
			.range([plotHeight,0]);
		}
        else {
			yScale = d3.scale.linear()
			.domain(yDomain)
			.range([plotHeight,0])
			.nice();
		}

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(numTicksy)
        .orient(yAlign)

    if (logScale){
        yAxis.tickFormat(function (d) {
            return yScale.tickFormat(1,d3.format(",d"))(d)
        })
    }
    // var yLabel=plot.append("g")
    // .attr("class",media+"yAxis")
    // .call(yAxis);

    //work out number of ticks



    //calculate what the ticksize should be now that the text for the labels has been drawn
    // var hiddenLabelOffset=yLabel.node().getBBox().width
    // //console.log("offset= ",hiddenLabelOffset)
    // var yticksize=colculateTicksize(yAlign, hiddenLabelOffset, media);
    //console.log(yticksize);

    // yLabel.call(yAxis.tickSize(yticksize))
    // yLabel
    //     .attr("transform",function(){
    //         if (yAlign=="right"){
    //             return "translate("+(margin.left)+","+margin.top+")"
    //         } else {
    //             return "translate("+(w-margin.right)+","+margin.top+")"
    //         }
    //     })

    // yLabel.selectAll('text')
    //     .attr("transform", function() {
    //         return "translate(0,-20)"
    //     })
    //     .style("text-anchor", "end")

    //identify 0 line if there is one
    var originValue = 0;
    var origin = plot.selectAll(".tick").filter(function(d, i) {
            return d==originValue || d==yHighlight;
        }).classed(media+"origin",true);

    //use these hidden labels to calculate margins/widths
    var hiddenLeftLabel = plot.append("g")
      .attr("class",media+"hiddenLabel")
      .append('text')
      .attr('class', media+'valLabels')
      .text(function() {
        var unitLabel = unit || "";
        return d3.format(valueFormat)(plotArrays[0][0].val) + unitLabel
      });

    var hiddenRightLabel = plot.append("g")
      .attr("class",media+"hiddenLabel")
      .append('text')
      .attr('class', media+'valLabels')
      .text(function() {
        var unitLabel = unit || "";
        return d3.format(valueFormat)(plotArrays[0][plotArrays[0].length - 1].val) + unitLabel
      });

    var hiddenLabelOffset=hiddenLeftLabel.node().getBBox().width + hiddenRightLabel.node().getBBox().width + 40
    var hiddenLeftLabelOffset=hiddenLeftLabel.node().getBBox().width + 20

    var xScale = d3.time.scale()
        .domain(xDomain)
        .range([0,(plotWidth-hiddenLabelOffset)])

    if (gaps) {
        xScale = d3.scale.ordinal()
            .domain(xDomain)
            .rangeBands([0, (plotWidth-hiddenLabelOffset)])
    }

    //create a line function that can convert data[] into x and y points
    var lineData= d3.svg.line()
        .x(function(d,i) {
            return xScale(d.date);
        })
        .y(function(d) {
            return yScale(d.val);
        })
        .interpolate(lineSmoothing)

    var annotations = plot.append("g").attr("id","annotations").selectAll("g")
            .data(plotArrays)
            .enter()
            .append("g")
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
                else {
                   return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
            });

    var lines = plot.append("g").attr("id","series").selectAll("g")
            .data(plotArrays)
            .enter()
            .append("g")
            .attr("id",function(d,i){
                return seriesNames[i];
            })

        lines.append("path")
            .attr("class",media+"separatinglines")
            .attr("stroke",function(d,i){
                return '#333';
            })
            .attr('d', function(d){ return lineData(d); })
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+hiddenLabelOffset)+","+(margin.top)+")"}
            })

    var trace = lines.append("path")
            .attr("class",media+"lines")
            .attr("stroke",function(d,i){
                return colours[i];
            })
            .attr('d', function(d){ return lineData(d); })
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+hiddenLabelOffset)+","+(margin.top)+")"}
            })

        if (roundLines) {
            trace.attr('stroke-linejoin', 'round')
        }

        lines.append("g")
            .attr("fill",'white')
            .attr("stroke", function(d, i) { return colours[i] })
            .attr('stroke-width', '4px')
            .selectAll("circle")
            .data(function(d){
                return d;})
            .enter()
            .append("circle")
            .attr("r", function(d, i) {
                if (i == 0 || i == data.length - 1 ) {
                    return yOffset/5
                    }
                    else {return 0}
                })
            .attr("cx",function(d){return xScale(d.date)})
            .attr("cy",function(d){return yScale(d.val)})
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+hiddenLabelOffset)+","+(margin.top)+")"}
            });


        annotations.selectAll("line.nyminutevideoyLines")
            .data(function(d){
                return d.filter(function(a) {
                  return a.highlight === "yes" || (a.annotate !="" && a.annotate != undefined);
                });})
            .enter()
            .append("line")
            .attr('class', "nyminutevideoyLines")
            .attr("x1",function(d){return xScale(d.date);})
            .attr("x2",function(d){return xScale(d.date);})
            .attr("y1",function(d){return yScale(min)})
            .attr("y2",function(d){return yScale(max)})
            .style('stroke', function(d, i) {
                if (d.highlight == "yes" || (d.annotate !="" && d.annotate !=undefined)) {
                    return "#FAFAFA";
                }
            });

        // for yHighlight
        if (yHighlight) {
        annotations.append("line")
            .attr('class', "nyminutevideoyHighlight")
            .attr("x1",function(d){return -10;})
            .attr("x2",function(d){return plotWidth + 10;})
            .attr("y1",function(d){return yScale(yHighlight)})
            .attr("y2",function(d){return yScale(yHighlight)})
            .style('stroke', function(d, i) {
                return "#FFF2E1";
            });

        annotations.append('text')
            .attr('class', 'nyminutevideoyHighlightLabels')
            .attr('x', function() {
                if (yAxisHighlightLabelSide == "left") {
                    return xScale(data[0].date) - 20;
                }
                return xScale(data[data.length - 1].date) + 20;
            })
            .attr('y', yScale(yHighlight) + 12)
            .style('text-anchor', function() {
                if (yAxisHighlightLabelSide == "left") {
                    return 'end';
                }
                return 'start';
            })
            .text(function() {
                var unitLabel = unit || "";
                return yHighlight + unitLabel
            });
        }

        annotations.selectAll("text.nyminutevideovalLabels")
            .data(function(d){
                return d.filter(function(a, i) {
                  return i == 0 || i == data.length - 1 || a.highlight == "yes"
                });})
            .enter()
            .append("text")
            .attr('class', "nyminutevideovalLabels")
            .attr("id", function(d, i) {
                if(i == 0) {
                    return "valLabelStart"
                }
            })
            .text(function(d, i) {
                var unitLabel = unit || "";
                return d3.format(valueFormat)(d.val) + unitLabel;
            })
            .attr("x",function(d, i){
                if (i == 0) {
                    return xScale(d.date) - 20;
                }
                return xScale(d.date) + 24;
            })
            .attr("y",function(d){return yScale(d.val) + 8})
            .style('text-anchor', function(d, i) {
                if (i == 0) {
                    return 'end';
                }
            });

        annotations.selectAll("text.nyminutevideoxAxisLabels")
            .data(function(d){
                return d.filter(function(a, i) {
                  return i == 0 || i == data.length - 1 || a.highlight == "yes" || (a.annotate != "" && a.annotate != undefined);
                });})
            .enter()
            .append("text")
            .attr('class', "nyminutevideoxAxisLabels")
            .attr('text-anchor', function(d) {
              if (d.annotate != "" && d.annotate != undefined) {
                return 'middle';
              }
              return 'left'
            })
            .append('tspan')
            .text(function(d, i) {
                if (overrideFirstDate && i == 0) {
                    return overrideFirstDate.split("|")[0];
                }
                if (overrideLastDate && i == data.length - 1) {
                    return overrideLastDate.split("|")[0];
                }
                if (d.annotate != "" && d.annotate != undefined) {
                  return d.annotate;
                }

                var formatDate = d3.time.format(xAxisDateFormat);
                return formatDate(d.date);
            })
            .attr("x",function(d, i){
                if (i == 0) {
                    var widthOfValLabel = d3.select("#valLabelStart").node().getBBox().width;
                    return xScale(d.date) - 20 - widthOfValLabel;
                }
                if (d.annotate != "" && d.annotate != undefined) {
                  return xScale(d.date);
                }
                return xScale(d.date) + 24;
            })
            .attr("y",function(d){
              if (d.annotate != "" && d.annotate != undefined) {
                return 0;
              }
              return yScale(d.val) + 50
            })
            .append('tspan')
            .text(function(d, i) {
                if (overrideFirstDate && overrideFirstDate.indexOf("|") > -1 && i == 0) {
                    return overrideFirstDate.split("|")[1];
                }
                if (overrideLastDate && overrideLastDate.indexOf("|") > -1 && i == data.length - 1) {
                    return overrideLastDate.split("|")[1];
                }
                if (secondLineXAxisDateFormat && (d.annotate == "" || d.annotate == undefined)) {
                    var formatDate = d3.time.format(secondLineXAxisDateFormat);
                    return formatDate(d.date);
                }
            })
            .attr("x",function(d, i){
                if (i == 0) {
                    var widthOfValLabel = d3.select("#valLabelStart").node().getBBox().width;
                    return xScale(d.date) - 20 - widthOfValLabel;
                }
                return xScale(d.date) + 24;
            })
            .attr("y",function(d){return yScale(d.val) + 85})

    //if needed, create markers
    if (markers){
        lines.append("g").attr("fill",function(d,i){return colours[i]})
            .selectAll("circle")
            .data(function(d){return d;})
            .enter()
            .append("circle")
            .attr("r",yOffset/4)
            .attr("cx",function(d){return xScale(d.date)})
            .attr("cy",function(d){return yScale(d.val)})
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left+hiddenLeftLabelOffset)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+hiddenLabelOffset)+","+(margin.top)+")"}
            })
    }

    d3.selectAll(".domain").remove()

    if (seriesNames[0]!="x" && seriesNames.length > 1){
        // //create a legend first
        var legendyOffset=0
        var legend = plot.append("g")
            .attr("id",media+"legend")
            .on("mouseover",pointer)
            .selectAll("g")
            .data(seriesNames)
            .enter()
            .append("g")
            .attr('class', function(d, i) {
              return media+"l"
            })
            .attr ("id",function(d,i){
                return media+"l"+i
            })

        var drag = d3.behavior.drag().on("drag", moveLegend);
        d3.selectAll("."+media+"l").call(drag);

        legend.append("text")

            .attr("id",function(d,i){
                return media+"t"+i
            })
            .attr("x",yOffset+yOffset/2)
            .attr("y",yOffset/2)
            .attr("class",media+"subtitle")
            .text(function(d){
                return d;
            })
        // legend.append("line")
        //     .attr("stroke",function(d,i){
        //         return colours[i];
        //     })
        //     .attr("x1",0)
        //     .attr("x2",yOffset)
        //     .attr("y1",yOffset/4)
        //     .attr("y2",yOffset/4)
        //     .attr("class",media+"lines")

        legend.attr("transform",function(d,i){
            if (legAlign=='hori') {
                var gHeigt=d3.select("#"+media+"l0").node().getBBox().height;
                if (i>0) {
                    var gWidth=d3.select("#"+media+"l"+(i-1)).node().getBBox().width+yOffset;
                }
                else {gWidth=0};
                legendyOffset=legendyOffset+gWidth;
                return "translate("+(legendyOffset)+","+(gHeigt/2)+")";
            }
            else {
                return "translate(0,"+((i*yOffset))+")"};
    })

    }


    function colculateTicksize(align, offset, media) {
        if (media == "nyminutevideo") {
            offset = 0;
        }
        if (align=="right") {
            return w-margin.left-offset
        }
        else {return w-margin.right-offset}
    }

    function pointer() {
        this.style.cursor='pointer'
    }

    function moveLegend() {
        var dX = d3.event.x; // subtract cx
        var dY = d3.event.y; // subtract cy
        d3.select(this).attr("transform", "translate(" + dX + ", " + dY + ")");

    }





}
