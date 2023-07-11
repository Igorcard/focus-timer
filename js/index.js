import {Controls} from "./controls.js"
import {Timer} from "/js/timer.js"
import Sound from "/js/sounds.js"
import {
    buttonPause,
    buttonPlay,
    buttonSet,
    buttonStop,
    buttonSoundOff,
    buttonSoundOn,
    minuteDisplay,
    secondDisplay
} from "/js/elements.js"

const controls = Controls({
    buttonPlay,
    buttonPause,
    buttonStop,
    buttonSet
})

const timer = Timer({
    minuteDisplay,
    secondDisplay,
    resetControls: controls.reset,
})

const sound = Sound()

buttonPlay.addEventListener('click', ()=>{
    controls.play()
    timer.countDown()
    sound.pressButton()
})

buttonPause.addEventListener('click', ()=>{
    controls.pause()
    timer.pause()
    sound.pressButton()
})

buttonStop.addEventListener('click', ()=>{
    controls.reset()
    timer.reset()
    sound.pressButton()
})

buttonSoundOff.addEventListener('click', ()=>{
    buttonSoundOn.classList.remove('hide')
    buttonSoundOff.classList.add('hide')
    sound.bgAudio.play()
})

buttonSoundOn.addEventListener('click', ()=>{
    buttonSoundOn.classList.add('hide')
    buttonSoundOff.classList.remove('hide')
    sound.bgAudio.pause()
})

buttonSet.addEventListener('click', ()=>{
    let newMinutes = controls.getMinutes()
    if (!newMinutes){
        timer.reset()
        return
    }
    
    timer.updateDisplay(newMinutes,0)
    timer.updateMinutes(newMinutes)
})
