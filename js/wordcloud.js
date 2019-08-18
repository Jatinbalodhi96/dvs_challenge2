/* exported word_cloud */

function wordCloud(selector, data) {
    /* render word cloud */
    var n_data = []
    _.each(data, function(v, k) { 
        n_data.push({'text': k, 'size': v}) 
    })
    data = n_data;

    var font_scale = d3.scaleLinear()
                    .domain([0, _.max(_.map(n_data, 'size'))])
                    .range([10, 70]);

    var width = $('#word_cloud').width(), height = $('#word_cloud').height()
    d3.layout.cloud()
        .size([width, height])
        .words(data)
        // .map(function(d) {
        //     return {text: d[0], size: d[1] * 100};}))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 0) * 90; })
        .font("Impact")
        .fontSize(function(d) { return font_scale(d.size); })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#word_cloud").append("svg")
        .attr('width', width)
        .attr('height', height)
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return 'steelblue'; })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
}
