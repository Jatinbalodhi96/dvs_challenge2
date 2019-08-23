/* exported barChart */

function barChart(selector, data) {
    /* render bar Chart */
    $(selector).empty()
    data = _.orderBy(data, 'value', 'desc')
    data = data.slice(0, 9)
    var margin = { top: 0, right: 0, bottom: 5, left: 20 },
        width = $(selector).width() - margin.left - margin.right,
        height = $(selector).height() - margin.top - margin.bottom;

    var svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x_values = _.map(data, 'value')
    var x = d3.scaleLinear().range([10, width - 42])
    var y = d3.scaleBand()
        .range([0, height])
        .padding(0.1);

    x.domain([0, _.max(x_values)])
    y.domain(_.map(data, 'key'))

    var bar = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('g')
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d) { return d.key + " - " + d.value})

    bar.append('rect')
        .attr('class', 'bar')
        .attr("y", function (d) {
            return y(d.key);
        })
        .attr('fill', 'steelblue')
        .attr("height", y.bandwidth())
        .attr("width", 0)
        .transition().duration(1500)
        .attr("width", function (d) { return x(d.value) })

    bar.append('text')
        .attr('fill', 'white')
        .attr('x', function (d) { return x(d.value) - 2 })
        .attr("y", function (d) { return y(d.key) + 18 })
        .attr("text-anchor", "end")
        .attr('font-size', '14px')
        .text(function (d) { return ((d.key.length > 60) ? d.key.slice(0, 60) + '...' : d.key) + " - " + d.value })
}
