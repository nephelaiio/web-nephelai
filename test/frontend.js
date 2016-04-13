module.exports = {
    'Test frontend page': function (client) {
        client.url(client.launch_url)
            .waitForElementVisible('body', 1000);
        client.expect.element('body').to.have.attribute('class').which.contains('container-fluid')
    }
};