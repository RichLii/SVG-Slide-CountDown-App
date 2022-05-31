const prog = document.querySelector(".stroke")
const content = document.querySelector(".content")
const getTimer = document.querySelectorAll("input")
const d = document.getElementById("d")
const h = document.getElementById("h")
const m = document.getElementById("m")
const s = document.getElementById("s")
const submit = document.getElementById("submit")
const input = document.querySelector(".input")
let timeInterval

getTimer.forEach((item) => {
    item.value = ''
    item.addEventListener('input', () => {
        if(item.id === 'd' && item.value > 365) {item.value = 365}
        if(item.id === 'h' && item.value > 24) {item.value = 23}
        if(item.id === 'm' && item.value > 60) {item.value = 59}
        if(item.id === 's' && item.value > 60) {item.value = 59}
    })
})


input.addEventListener('submit', (event) => {
    event.preventDefault()
    clearInterval(timeInterval)
    prog.classList.remove('ani')
    setTimeout(() => {
        prog.classList.add('ani')
    }, 50)

    prog.style.strokeDashoffset = -1028
    let timeResult = getAllTime()
    const count = 1000

    // prog.classList.add('ani')
    prog.style.setProperty(`--time`, `${timeResult/1000}s`)
    
    content.innerHTML = `
    <span>${convertTime(timeResult).days}:${convertTime(timeResult).hours}:${convertTime(timeResult).minutes}:${convertTime(timeResult).seconds}</span>
    `

    timeInterval = setInterval(() => {
        timeResult = timeResult - count
        startCountDown(timeResult, count)
    }
    , count)
})


function startCountDown(realTime) {
    if(realTime > 0) {
        const days = convertTime(realTime).days
        const hours = convertTime(realTime).hours
        const minutes = convertTime(realTime).minutes
        const seconds = convertTime(realTime).seconds
    
        content.innerHTML = `<span>${days}:${hours}:${minutes}:${seconds}</span>`
    } else {
        content.innerHTML = `<span>0:0:0:0</span>`
        prog.style.strokeDashoffset = 0
        prog.classList.remove('ani')
        clearInterval(timeInterval)
        alert('時間到')
    }
}


function convertTime(time) {
    const totalSec = time / 1000
    let seconds = Math.floor(totalSec % 60)
    let minutes = Math.floor(totalSec / 60) % 60
    let hours = Math.floor(totalSec / ( 60 * 60))  % 24
    const days = Math.floor(totalSec / (60 * 60 * 24))

    if(`${seconds}`.length < 2) {seconds = `0${seconds}`}
    if(`${minutes}`.length < 2) {minutes = `0${minutes}`}
    if(`${hours}`.length < 2) {hours = `0${hours}`}

    return {seconds: seconds, minutes: minutes, hours: hours, days: days}
}


function getAllTime() {
    const timevalue = (eval(d.value * 24 * 3600) + eval(h.value * 3600) + eval(m.value * 60) + eval(s.value)) * 1000
    const dateObj = new Date(timevalue)
    const timeResult = dateObj.getTime()
    return timeResult
}