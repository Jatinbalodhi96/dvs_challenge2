$(window).ready(app)

var data;

function app() {
    $.ajax({
        'method': 'GET',
        'url': 'assets/dashboard.json',
        'async': false,
        'success': function(resp) {
            data = resp
            barChart('#bar_chart', resp['methods_best_teach_viz'])
        }
    });
    render_table()
    render_word_cloud()
    render_word_cloud_role()
    $('.word_cloud_drop_down').on('click', function() {
        var key = $(this).data('key')
        render_word_cloud(key)
        $('#word_cloud_dropdown').text(key.slice(0, 25) + '...')
    })
    $('.role_drop_down').on('click', function() {
        var key = $(this).data('key')
        render_word_cloud_role(key)
        $('#word_cloud_dropdown_role').text(_.upperFirst(key.slice(0, 30) + '...'))
    })
}

function render_table() {
    $.ajax({
        'method': 'GET',
        'url': 'assets/yearly_pay.json',
        'async': false,
        'success': function(resp) {
            $('#table-container').on('template', function() {
                $('[data-toggle="tooltip"]').tooltip();
            }).template({'data': resp.slice(0, 9)})
        }
    });
}

function render_word_cloud(key) {
    key = (key == undefined) ? 'Equal Parts School and Self-Taught' : key
    wordCloud('#word_cloud', data['education_vs_tools'][key])
}

function render_word_cloud_role(key) {
    key = (key == undefined) ? 'academic' : key
    console.log(data['role_vs_tools'])
    wordCloud('#word_cloud_role', data['role_vs_tools'][key])
}

var table_color = d3.scaleQuantile()
                    .domain([0, 124])
                    .range(_.reverse(d3.schemeBlues[6]));
