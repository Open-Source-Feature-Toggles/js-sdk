function parseTimeString (timeString) {
    if (timeString === undefined) {
        return 1000 * 10
    }
    let stripLetter = timeString.replace('s', '')
    let number = Number(stripLetter)
    if (number === NaN){
        throw new Error('Refresh time-string formatted incorrectly')
    }
    let num_miliseconds = number * 1000 
    return num_miliseconds
}

function getFlagStatusFromPaylod (payload, flag) {
    let features = payload.features
    let [featureName, variableName] = flag.split('.')
    let featureVariables = features[featureName]
    if (featureVariables){
        for (let variable of featureVariables){
            if (variable.hasOwnProperty(variableName)){
                return variable[variableName]
            }
        }
    }
    return undefined
}

function getFeatureStatusFromPayload (payload, feature) {
    let featureExists = payload.features[feature]
    if (featureExists !== undefined){ return true }
    return false 
}

function cachePayloadLocally (payload) {
    localStorage.setItem('cached-payload', JSON.stringify(payload))
}

function getLocalPayload () {
    return localStorage.getItem('cached-payload')
}


export { 
    parseTimeString, 
    getFlagStatusFromPaylod,
    cachePayloadLocally, 
    getLocalPayload,
    getFeatureStatusFromPayload,  
}