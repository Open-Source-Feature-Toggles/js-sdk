import FeatureToggleClient from "./script.js"

const bluecircle = document.getElementById('blue-circle')
const redcircle = document.getElementById('red-circle')
const greencircle = document.getElementById('green-circle')



let client = new FeatureToggleClient({
    apiKey : 'DEVELOPMENT.WTj0WkD2GUShngVWcCzHJFUoAMRmPp7us11FCbUyPDs239LKABSQLOnlHMnWbaWdFL+CzW488UbOtGDPsgn11Q==', 
    refreshRate : '5s'
})

function updateCircles () {
    console.log(client.toggles)
    let blue = client.getFlag('circles.blue-circle')
    let green = client.getFlag('circles.green-circle')
    let red = client.getFlag('circles.red-circle')

    if (!blue) {
        bluecircle.style.display = 'none'
    }
    else {
        bluecircle.style.display = 'block'
    }
    if (!green) {
        greencircle.style.display = 'none'
    }
    else {
        greencircle.style.display = 'block'
    }
    if (!red) {
        redcircle.style.display = 'none'
    }
    else {
        redcircle.style.display = 'block'
    }
}



client.addEventListener( 'ready', updateCircles)

client.addEventListener( 'update', updateCircles)

client.start()