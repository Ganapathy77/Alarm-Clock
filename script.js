const currentTime = document.querySelector('h1'),
    selectMenu = document.querySelectorAll('select'),
    content = document.querySelector(".content"),
    setAlarmBtn = document.querySelector("button")

let alarmTime, isAlarmSet = false;
let ringtone = new Audio("./files/ringtone.mp3");
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        amPm = "AM";
    if (hours >= 12) {
        hours = hours - 12;
        amPm = "PM"
    }

    hours = hours == 0 ? 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds; seconds


    currentTime.innerText = `${hours}:${minutes}:${seconds} ${amPm}`

    if (alarmTime == `${hours}:${minutes} ${amPm}` && (seconds == "00")) {
        ringtone.play();
        ringtone.loop = true;
    }

})

function setAlarm() {
    if (isAlarmSet) {
        ringtone.pause();
        content.classList.remove("disable")
        alarmTime = ""
        setAlarmBtn.innerText = "Set Alarm"
        return isAlarmSet = false
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    if (time.includes("Hours") || (time.includes("Minutes")) || (time.includes("AM/PM"))) {
        return alert("Please, Select a valid time to set Alaarm!");
    }
    isAlarmSet = true
    alarmTime = time
    content.classList.add("disable")
    setAlarmBtn.innerText = "Clear Alarm"
}

setAlarmBtn.addEventListener('click', setAlarm)