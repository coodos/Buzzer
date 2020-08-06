let button = document.getElementById('buzzer');
var time = document.getElementById('epoch').innerText;

buzzer.onclick = function () {
    var timeStamp = Math.floor(Date.now());
    deltaTime = (Number(timeStamp) - Number(time))/1000
    document.getElementById('responseTime').innerText = deltaTime;
    $.ajax({
        type: "POST",
        url: '/buzz',
        data: {
            'time': timeStamp
        }
    });
}

setInterval(function () {
    time = document.getElementById('epoch').innerText; 
    $("#responsesArea").load(" #responsesArea > *");
}, 1000);

