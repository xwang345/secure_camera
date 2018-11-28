// Basic - Selenium Example Script
// see https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs for details
// runs test against http://crossbrowsertesting.github.io/selenium_example_page.html

var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var request = require('request');
var assert = require('selenium-webdriver/testing/assert');
var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';

var username = 'ryan.wang23@hotmail.com'; //replace with your email address 
var authkey = 'u1c6cdcc87e077f8'; //replace with your authkey 

var caps = {
    'name': 'Xiaochen_Wang-test',
    'build': '1.0',
    'browserName': 'Chrome',
    'version': '70x64',
    'platform': 'Windows 10',
    'screenResolution': '1366x768',
    'record_video': 'true'
};

caps.username = username;
caps.password = authkey;

var sessionId = null;

//register general error handler
webdriver.promise.controlFlow().on('uncaughtException', webdriverErrorHandler);
 
var driver = new webdriver.Builder()
    .usingServer(remoteHub)
    .withCapabilities(caps)
    .build();

driver.getSession().then(function(session){
    sessionId = session.id_; //need for API calls
});
driver.get('https://app.hurrahome.com/account/login');
driver.getTitle().then(function(title){
    console.log('page title is ', title);
    assert(title).equals('Log into HurraHome | HurraHome.com | Trusted Home Cleaning');
    driver.findElement(By.name("email")).sendKeys("senecastudentproject+ryan@gmail.com");
    driver.findElement(By.name("password")).sendKeys("HurraHomeTest");
    driver.findElement(By.tagName("button")).click();
    driver.manage().timeouts().pageLoadTimeout(10);
    driver.findElement(By.className("dropdown relative")).click();
    driver.findElement(By.linkText("/secured/public-profile")).click();
    // driver.findElement(By.)
});

driver.quit();

//set the score as passing
driver.call(setScore, null, 'pass');

//Call API to set the score
function setScore(score) {

    //webdriver has built-in promise to use
    var deferred = webdriver.promise.defer();
    var result = { error: false, message: null }

    if (sessionId){
        
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: {'action': 'set_score', 'score': score },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
            }

            deferred.fulfill(result);
        })
        .auth(username, authkey);
    }
    else{
        result.error = true;
        result.message = 'Session Id was not defined';
        deferred.fulfill(result);
    }

    return deferred.promise;
}

//general error catching function
function webdriverErrorHandler(err){

    console.error('There was an unhandled exception! ' + err);

    //if we had a session, end it and mark failed
    if (driver && sessionId){
        driver.quit();
        setScore('fail').then(function(result){
            console.log('set score to fail')
        })
    }
}