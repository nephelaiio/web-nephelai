module.exports = {
    'Test frontend page': function (client) {
        client.url(`${client.launch_url}/frontend.html`)
            .waitForElementVisible('body', 1000);
    }
};