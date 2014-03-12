require.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        can: '/bower_components/canjs/amd/can',
        'can.fixture': '/bower_components/canjs/amd/can/util/fixture',
        'can.ejs': '/bower_components/canjs/amd/can/view/ejs',
        bootstrap: '/bower_components/bootstrap/dist/js/bootstrap.min'
    }
});

require(['can', 'can.fixture', 'can.ejs'], function (can) {

    var Place = can.Model({
        findAll: 'GET /places',
        findOne: 'GET /place/{id}'
    }, {});

    var context = new can.Map({selectIndex: 0});

    can.fixture({
        'GET /places': function () {
            return {
                data: [
                    {place: "奥体中心"},
                    {place: "天坛"},
                    {place: "农展馆"},
                    {place: "南三环"}
                ]
            };
        },
        'GET /place/{id}': function (req, res) {
            var places = [
                {
                    place: "奥体中心",
                    aqi: '46',
                    desc: '优'
                },
                {
                    place: "天坛",
                    aqi: '33',
                    desc: '优'
                },
                {
                    place: "农展馆",
                    aqi: '55',
                    desc: '良'
                },
                {
                    place: "南三环",
                    aqi: '57',
                    desc: '良'
                }
            ];

            return places[req.data.id];
        }
    });

    var PlaceListWidget = can.Control({
        init: function () {
            this.render();
        },
        render: function () {
            this.element.html(
                can.view('../views/placeList.ejs', this.options.places)
            );
        },
        'select change': function (el) {
            context.attr('selectIndex', el.val());
        }
    });

    var PlaceInfoWidget = can.Control({
        init: function () {
            this.render();
        },
        render: function () {
            this.element.html(
                can.view('../views/placeInfo.ejs', this.options.place)
            );
        },
        reload: function () {
            this.element.empty();
            this.render();
        }
    });

    Place.findAll({}, function (places) {
        new PlaceListWidget('#placeList', {places: places});
        Place.findOne({id: 0}, function (place) {//TODO 改进，演示嵌套式回调的解决
            var widget = new PlaceInfoWidget('#placeInfo', {place: place});
            context.bind('change', function (event, attr, how, newVal, oldVal) {
                if (attr == 'selectIndex') {
                    Place.findOne({id: newVal}, function (place) {
                        widget.options.place = place;
                        widget.reload();
                    });
                }
            });
        });
    });
})
;