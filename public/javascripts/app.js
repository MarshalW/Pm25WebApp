require.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        can: '/bower_components/canjs/amd/can',
        'can.fixture': '/bower_components/canjs/amd/can/util/fixture',
        'can.ejs': '/bower_components/canjs/amd/can/view/ejs',
        bootstrap:'/bower_components/bootstrap/dist/js/bootstrap.min'
    }
});

require(['can', 'can.fixture', 'can.ejs'], function (can) {
//TODO 这里写CanJS代码
});