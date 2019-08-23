/* exported stackBar */

function stackBar(selector, data) {
    /* render stack bar */

    var traces = []
    _.each(data, function(d) {
        traces.push(
            {
            'x': _.keys(d).slice(1,6),
            'y': _.values(d).slice(1, 6),
            'name': d['Role'],
            'type': 'bar'
            }
        )	
    })

    var data = traces;

    var layout = {
        title: 'Average Hours spent on different activities every week',
        barmode: 'stack',
        yaxis: {
            fixedrange: true
            },
        xaxis : {
            fixedrange: true
        }};

    Plotly.newPlot('time_spent', data, layout, {displayModeBar: false});
    
}