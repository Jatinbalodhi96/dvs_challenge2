$(window).ready(app)

var data;

function app() {
    render_table()
    render_word_cloud()
    $('.word_cloud_drop_down').on('click', function() {
        var key = $(this).data('key')
        render_word_cloud(key)
        $('#word_cloud_dropdown').text(key.slice(0, 25) + '...')
    })
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

function render_word_cloud(key) {
    key = (key == undefined) ? 'Equal Parts School and Self-Taught' : key
    $.ajax({
        'method': 'GET',
        'url': 'assets/dashboard.json',
        'async': false,
        'success': function(resp) {
            data = resp['education_vs_tools'][key]
            wordCloud('#word_cloud', data)
        }
    });
}

var table_color = d3.scaleQuantile()
                    .domain([0, 124])
                    .range(_.reverse(d3.schemeBlues[6]));
