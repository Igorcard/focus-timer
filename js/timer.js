import sounds from "./js/sounds.js"

export function Timer({
    minuteDisplay,
    secondDisplay,
    resetControls,
}) {

    let timerTimeOut
    let minutes = Number(minuteDisplay.textContent)

    function updateDisplay(newMinutes, seconds){
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minuteDisplay.textContent = String(newMinutes).padStart(2, '0')
        secondDisplay.textContent = String(seconds).padStart(2, '0')
    }

    function reset() {
        updateDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
    }

    function countDown(){
        timerTimeOut = setTimeout(()=>{
            let seconds = Number(secondDisplay.textContent)
            let minutes = Number(minuteDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <= 0

            updateDisplay(minutes, 0)

            if(isFinished ){
                resetControls()
                updateDisplay()
                sounds().timeEnd()
                return 
            }
            
            
            if (seconds <= 0){
                seconds = 2
                --minutes
            }
            
            updateDisplay(minutes, String(seconds - 1))

            countDown()
        }, 1000)
    }

    function updateMinutes(newMinutes){
        minutes = newMinutes
    }

    function pause(){
        clearTimeout(timerTimeOut)
    }

    return {
        reset,
        countDown,
        updateDisplay,
        updateMinutes,
        pause
    }
}