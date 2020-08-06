let activate = document.getElementById('activate');
// let deactivate = document.getElementById('deactivate');

activate.onclick = function () {
    var timeStamp = Math.floor(Date.now());
    $.ajax({
        type: "POST",
        url: '/activateBuzzer',
        data: {
            'time': timeStamp
        }
    });
}

setInterval(function () {
    $("#responsesArea").load(" #responsesArea > *");
    $("#topClick").load(" #topClick > *");
}, 1000);