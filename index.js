try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var _ = require('underscore');

var url = "http://en.wikipedia.org/wiki/List_of_Tour_de_France_general_classification_winners";

var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true,
            options: {
            	clientScripts: 'https://code.jquery.com/jquery-1.11.2.min.js'
            }
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start();
        spooky.open(url);
        spooky.then(function(){
            this.emit('dump', this.evaluate(function(){
                return document.title;
            }));
        });
        spooky.run();
    });


spooky.on('dump', function (message) {
    console.log(message);
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});