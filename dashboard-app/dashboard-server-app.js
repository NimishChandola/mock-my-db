var express = require('express'),
    router = express.Router();

const Vue = require('vue');
const template = require('fs').readFileSync(`${__dirname}/index.template.html`, 'utf-8');
const renderer = require('vue-server-renderer').createRenderer({template,});

router
  // Add a a main dashboard route
  .get('/', function(req, res) {
    
    var context = {
        'title': 'Mock DB'
    };

    const viewApp = new Vue({
        data: {
          url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`,
      });

    return renderer.renderToString(viewApp, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return;
        }
        res.end(html);
    });
});

 module.exports = router;