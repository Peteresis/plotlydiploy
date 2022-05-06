// BONUS CHALLENGE
// Create a gauge chart to plot the weekly washing frequency of the selected subject

// Function to create gauge chart
function gaugeChart(value) {

    var transformedInputValue = parseInt(value);

    // Filter samples data by id selected in dropdown menu
    var selectedMetadata = dataDB.metadata.filter(subject => 
        (subject.id === transformedInputValue));

    // Get sample data 
    var washFreq = selectedMetadata[0].wfreq;
    
    // Trace data based on half pie chart 
    trace3 = {
        values: [1,1,1,1,1,1,1,1,1,9],
        type: "pie",
        showlegend: false,
        hole: 0.5,
        rotation: 90,
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: [
                    'rgb(249, 246, 235)',
                    'rgb(237, 229, 196)',
                    'rgb(225, 212, 157)',
                    'rgb(214, 194, 118)',
                    'rgb(176, 152, 53)',
                    'rgb(137, 118, 41)',
                    'rgb(98, 84, 30)',
                    'rgb(59, 51, 18)',
                    'rgb(20, 17, 6)',
                    "white"
                ],
            },      
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
        hoverinfo: "label",
    };

    // Plot needle
    var freqCalc = washFreq / 9 * 180
    var degrees = 180 - freqCalc, radius = 0.5;
    var radians = degrees * Math.PI / 180;
    var aX = (0.01 * Math.cos((degrees - 90) * Math.PI / 180)) + 0.51;
    var aY = (0.01 * Math.sin((degrees - 90) * Math.PI / 180)) + 0.47;
    var bX = (-0.01 * Math.cos((degrees - 90) * Math.PI / 180)) + 0.51;
    var bY = (-0.01 * Math.sin((degrees - 90) * Math.PI / 180)) + 0.47;
    var cX = ((radius * Math.cos(radians))*0.5) + 0.51;
    var cY = ((radius * Math.sin(radians))*0.5) + 0.47 + 0.05;

    var path = 'M ' + aX + ' ' + aY +
    ' L ' + bX + ' ' + bY +
    ' L ' + cX + ' ' + cY +
    ' Z';

    // Data as an array
    var data3 = [trace3]; 

    // Layout
    var layout3 = { 
        shapes: [{
            type: "path",
            path: path,
            fillcolor: "black",
            line: {
                color: "black",
            }
        }],
        title: "Belly Button Washing Frequency <br>Scrubs per Week",
        xaxis: { visible: false, range: [-1, 1]},
        yaxis: { visible: false, range: [-1, 1]},
        width: 450, 
        height: 400, 
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
                    fixedrange: true,
            range: [-1, 1]
        },
          yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
                    fixedrange: true,
            range: [-1, 1]
        }
    };

    // Render plot
    Plotly.newPlot("gauge", data3, layout3);
}