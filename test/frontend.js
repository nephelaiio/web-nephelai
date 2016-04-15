module.exports = {
    'Test frontend page': function (client) {
        client.url(`${client.launch_url}/frontend.html`)
            .source(function (result) {
                console.log(result.value);
            })
            .waitForElementVisible('body', 1000);
        client.expect.element('body').to.be.present.before(1000);
        client.expect.element('nav').to.be.present.before(1000);
    }
};