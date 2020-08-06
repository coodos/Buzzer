let button = document.getElementById('buzzer');

buzzer.onclick = function () {
    var timeStamp = Math.floor(Date.now());
    console.log(timeStamp)
    $.ajax({
        type: "POST",
        url: '/buzz',
        data: {
            'time': timeStamp
        }
    });
}

setInterval(function () {
    $("#responsesArea").load(" #responsesArea > *");
}, 1000);

