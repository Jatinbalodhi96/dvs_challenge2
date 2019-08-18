$(window).ready(app)

var data;

function app() {
    render_table()
    render_word_cloud()
}

function render_table() {
    $.ajax({
        'method': 'GET',
        'url': 'assets/yearly_pay.json',
        // 'async': false,
        'success': function(resp) {
            $('#table-container').on('template', function() {
                $('[data-toggle="tooltip"]').tooltip();
            }).template({'data': resp})
        }
    });

}

function render_word_cloud() {
    $.ajax({
        'method': 'GET',
        'url': 'assets/dashboard.json',
        'async': false,
        'success': function(resp) {
            data = resp['education_vs_tools']['Equal Parts School and Self-Taught']
            wordCloud('', data)
        }
    });
    // d3.json('assets/dashboard.json').then(function(data) {
    //     console.log(data)
    // })
}

var table_color = d3.scaleQuantile()
                    .domain([0, 124])
                    .range(_.reverse(d3.schemeBlues[6]));
