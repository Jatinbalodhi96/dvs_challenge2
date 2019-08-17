$(document).ready(app)

function app() {
    $.ajax({
        'method': 'GET',
        'url': 'assets/yearly_pay.json',
        'async': false,
        'success': function(resp) {
            render_table(resp)
        }
    })
}

function render_table(data) {
    $('#table-container').on('template', function() {
        $('[data-toggle="tooltip"]').tooltip();
    }).template({'data': data})
}

var table_color = d3.scaleQuantile()
                    .domain([0, 124])
                    .range(_.reverse(d3.schemeBlues[6]));
