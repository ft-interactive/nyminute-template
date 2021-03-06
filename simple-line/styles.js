
var styleprint = {classes:
[{class:"background{fill: none}"},
{class:"chartholder{fill: #fff1e0}"},
{class:"title{font-size:12px; fill: #000000; font-weight: 600;}"},
{class:"subtitle{fill:#000000; font-size: 9.6px;}"},
{class:"source{fill: #000000; font-size: 7.2px;}"},
{class:"logo{fill: #dacfc5;}"},
{class:"hat{fill:none; stroke-width:0.3px; stroke:#22190f;}"},
{class:"xAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"xAxis line{fill:none; stroke-width:.3px; stroke:#000000;}"},
{class:"xAxis text{fill:#000000; font-size: 9.6px; font-feature-settings:'tnum' 1;}"},
{class:"yAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"yAxis line{fill:none; stroke-width:0.3px; stroke:#22190f;}"},
{class:"yAxis text{fill:#000000; font-size: 9.6px; font-feature-settings: 'tnum' 1;}"},
{class:"origin line{fill:none; stroke-width:0.6px;}"},
{class:"lines{fill:none; stroke-width:2.0px;stroke-linecap: round;}"}
],
titleOffset:10,
subOffset:0,
legendyOffset:0,
linecolours:["#006a93","#ddb831","#c6d6cc","#55a2c7","#ad1c21","#486ba0"]
}

var styleweb = {classes:
[{class:"background{fill: none}"},
{class:"chartholder{fill: none;}"},
{class:"title{font-size:21px; fill: #3b3d3b;}"},
{class:"subtitle{font-size:14px; fill: #6b6e68;}"},
{class:"source{fill: #6b6e68; font-size: 11.5px;}"},
{class:"logo{fill: #dacfc5;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 1.0px; stroke:#c3bcb0;}"},
{class:"xAxis text{fill:#6b6e68; font-size: 14.0px;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 1.0px; stroke:#c3bcb0; stroke-dasharray:1,2}"},
{class:"yAxis text{fill:#6b6e68; font-size: 14.0px; font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#9ba497; stroke-width: 1px;stroke-dasharray:1,0}"},
{class:"lines{fill:none; stroke-width: 2.5px; stroke-linecap: round;}"}
],
titleOffset:21,
subOffset:0,
legendyOffset:0,
linecolours:["#A5526A","#F19F9E","#D36969","#69A1AA","#66bfd4","#486ba0"]
}

var stylesoc = {classes:
[{class:"background{fill: #212121;}"},
{class:"chartholder{fill: #6b6e68;}"},
{class:"title{font-size: 38px; fill: #ffffff; opacity: 0.9; font-weight: 500;}"},
{class:"subtitle{font-size: 28px; fill: #ffffff; opacity: 0.70; font-weight: 100; line-height: 30px;}"},
{class:"source{font-size: 25px; fill: #ffffff; opacity: 0.50; font-weight: 100; line-height: 30px;}"},
{class:"logo{fill: #ffffff; opacity: 0.38;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke:#ffffff; stroke-width: 2.0px; opacity: 0.5;}"},
{class:"xAxis text{font-size: 28px; fill: #ffffff; opacity: 0.50; font-weight: 100; line-height: 18px;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 2.0px; stroke-dasharray:2,8; opacity: 0.38; stroke:#ffffff;}"},
{class:"yAxis text{font-size: 28px; fill: #ffffff; opacity: 0.50; font-weight: 100; line-height: 28px; font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#ffffff; stroke-width: 2.0px; opacity: 0.5; stroke-dasharray:1,0}"},
{class:"lines{fill:none; stroke-width: 5px;  stroke-linecap: round;}"}
],
titleOffset:36,
subOffset:0,
legendyOffset:0,
linecolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"]
//linecolours:["#CC4759","#00B5B5","#E6B522","#437099","#FF8C8B","#CBFF7E","#8A8A8A"]
}
var stylevid = {classes:
[{class:"background{fill: #dfd0bd;}"},
{class:"titleframe{fill: #757575;}"},
{class:"chartholder{fill: none;}"},
{class:"title{font-size: 68px; fill: #ffffff; font-weight: 600;}"},
{class:"subtitle{font-size: 48; fill: #000000; font-weight: 600;}"},
{class:"source{font-size: 44; fill: #000000; font-weight: 600;}"},
{class:"logo{fill: #ffffff;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 5.0px; stroke:#ffffff;}"},
{class:"xAxis text{font-size: 48; fill: #000000; font-weight: 600;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 5.0px; stroke:#ffffff;}"},
{class:"yAxis text{font-size: 48; fill: #000000; font-weight: 600;font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#ffffff; stroke-width: 5.0px;stroke-dasharray:1,0}"},
{class:"lines{fill:none; stroke-width: 8.0px; stroke-linecap: round;}"}
],
titleOffset:68,
subOffset:0,
legendyOffset:15,
linecolours:["#b34b41","#5a8caf","#9baa6e","#eda45e","#9c5f87","#486ba0"]
}
var stylenyminutevid = {classes:
[{class:"chart text {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}"},
{class:"background{fill: #333; opacity: 1.0}"},
{class:"titleframe{fill: #757575;}"},
{class:"chartholder{fill: none;}"},
{class:"title{font-size: 80px; fill: #DEDEDE; font-weight: 600;}"},
{class:"subtitle{font-size: 42; fill: #ffffff; font-weight: 600;}"},
{class:"source{font-size: 36; fill: #ABABAB; font-weight: 300;text-anchor:end;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 2.0px; stroke:#C3BCB0;}"},
{class:"xAxis text{font-size: 42; fill: #FFF2E1; font-weight: 600;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 2.0px; stroke:#C3BCB0;}"},
{class:"yAxis text{font-size: 42; fill: #FFF2E1; font-weight: 600;font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#9BA497; stroke-width: 3.0px;stroke-dasharray:1,0}"},
{class:"lines{fill:none; stroke-width: 5.0px; stroke-linecap: round;}"}, // stroke-linejoin: round;
{class:"separatinglines{fill:none; stroke-width: 0px; stroke-linecap: round;}"},
{class:"yLines{fill: none; stroke-width: 0.5px;stroke-dasharray:3}"},
{class:"yHighlight{fill: none; stroke-width: 1.66px;}"},
{class:"xAxisLabels{font-size: 36; fill: #ABABAB; font-weight: 400;}"},
{class:"valLabels{font-size: 60; fill: white; font-weight: 500;letter-spacing:-1pt;}"},
{class:"yHighlightLabels{font-size: 36; fill: #ABABAB; font-weight: 400;}"},
{class:"hiddenLabel{display: none;}"}
],
titleOffset:68,
subOffset:0,
legendyOffset:15,
linecolours:["#55D8D2", "#FF767C"]
}



    //Tabular with
    //-webkit-font-feature-settings: 'tnum' 1;
       //font-feature-settings: 'tnum' 1;
