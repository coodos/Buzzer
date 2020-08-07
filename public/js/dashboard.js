let button = document.getElementById('buzzer');
var time = document.getElementById('epoch').innerText;
var inv = document.getElementById('invisible')
var timeEnd = document.getElementById('endTime').innerText;

buzzer.onclick = function () {
    var timeStamp = Math.floor(Date.now());
    console.log((timeStamp - time)/1000);
    deltaTime = (Number(timeStamp) - Number(time))/1000
    document.getElementById('responseTime').innerText = `+${deltaTime}s`;
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
    $("#stuff").load(" #stuff > *");
    time = document.getElementById('epoch').innerText;
    timeEnd = document.getElementById('endTime').innerText;
    timeNow = Math.floor(Date.now());

    if (document.querySelector('.response h2')) {
        var fastest = document.querySelector('.response h2').innerText;
        var userTime = document.getElementById('responseTime').innerText;

        if (userTime == fastest) {
            document.getElementById('responseTime').style.color = "green";
        } else {
            document.getElementById('responseTime').style.color = "maroon";
        }
    }
    // if (timeEnd < timeNow) {
    //     inv.style.display = 'block';
    //     button.classList.remove('buzzerActive');
    //     button.classList.add('buzzerInactive');
    // } else 
    if (time < timeNow && timeNow < timeEnd) {
        inv.style.display = 'none';
        button.classList.add('buzzerActive');
        button.classList.remove('buzzerInactive');
    } else {
        inv.style.display = 'block';
        button.classList.remove('buzzerActive');
        button.classList.add('buzzerInactive');
    }
}, 1000);