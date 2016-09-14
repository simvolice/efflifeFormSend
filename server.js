/**
 * Created by Admin on 12.09.2016.
 */


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var api_key = 'key-6cfcae5a4e23da6b34ae6912e8ecfc54';
var domain = 'sandboxebafe0349e9445529e3cb3b8c256f4dc.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));




// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

/**
 * Отправляем форму на mailgun
 */
router.post('/sendform', function(req, res) {




    var data = {
        from: 'Support EffLife <support@efflife.kz>',
        to: 'simvolice@gmail.com, alkey87@mail.ru',
        subject: 'Заказ с сайта efflife.kz',
        text: JSON.stringify(req.body)
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });

});





app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(3000);
console.log('Работаем на ' + 3000);