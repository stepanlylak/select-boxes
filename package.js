Package.describe({
    name: 'lylak:select-boxes',
    version: '1.0.2',
    summary: 'These are the reactive select boxes for meteor',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.1');
    api.use(['ecmascript', 'blaze', 'templating', 'fourseven:scss', 'francocatena:compass'], 'client');
    api.addFiles( ['select-boxes.html',   'select-boxes.scss'], 'client');
    api.mainModule('select-boxes.js', 'client');
});