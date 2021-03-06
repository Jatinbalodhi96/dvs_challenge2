$(window).ready(app)

var data, role, edu;

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
    render_time_spent()
    $('.word_cloud_drop_down').on('click', function() {
        edu = $(this).data('key')
        render_word_cloud(edu)
        $('#word_cloud_dropdown').text(edu.slice(0, 25) + '...')
    })
    $('.role_drop_down').on('click', function() {
        role = $(this).data('key')
        render_word_cloud_role(role)
        $('#word_cloud_dropdown_role').text(_.upperFirst(role.slice(0, 30) + '...'))
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
    wordCloud('#word_cloud_role', data['role_vs_tools'][key])
}

function render_time_spent() {
    stackBar('#time_spent', data['time_spent'])
}

var table_color = d3.scaleQuantile()
                    .domain([0, 124])
                    .range(_.reverse(d3.schemeBlues[6]));
