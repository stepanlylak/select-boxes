Package.describe({
    name: 'lylak:select-boxes',
    version: '1.1.0',
    summary: 'These are the reactive select boxes for meteor',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4.3.1');
    api.use(['ecmascript', 'blaze@2.3.0','templating@1.1.0', 'fourseven:scss@3.13.0', 'francocatena:compass@0.6.0'], 'client');
    api.addFiles( ['select-boxes.html',   'select-boxes.scss'], 'client');
    api.mainModule('select-boxes.js', 'client');
});
