var aglio = require('aglio');

var options = {
    filterInput: true, // Filter \r and \t from the input
    theme: 'default', // Theme name to load for rendering
    themeVariables: 'streak', // Built-in color scheme or path to LESS or CSS
    themeCondenseNav: true, // Condense single-action navigation links
    themeFullWidth: true, // Use the full page width
    themeTemplate: 'triple', // Layout name or path to custom layout file
    themeStyle: 'default' // Built-in style name or path to LESS or CSS
};

aglio.renderFile('./blueprints/index.md', './public/docs/index.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});

aglio.renderFile('./blueprints/pos.md', './public/docs/pos.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});

aglio.renderFile('./blueprints/me.md', './public/docs/me.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});

aglio.renderFile('./blueprints/v2/index.md', './public/docs/v2/index.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});

aglio.renderFile('./blueprints/v2/pos.md', './public/docs/v2/pos.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});

aglio.renderFile('./blueprints/pay/index.md', './public/docs/pay/index.html', options, function (err, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);
});