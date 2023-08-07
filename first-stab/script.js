class Payload {
    constructor (apiKey) {
        this.apiKey = apiKey
        this.toggles 
        this.last_updated
        this.interval = '15s'
    }




    async grabPayload () {
        try {
            let response = await fetch('http://localhost:3000/api/payload', {
                headers : {
                    'Authorization' : this.apiKey
                }
            })
            if (response.ok){
                let payload = await response.json()
                this.toggles = payload.features
                this.last_updated = payload.last_updated
            }
            return true 
        } catch (error) {
            console.error(error)
            this.toggles = null
            this.last_updated = null
            return false 
        }
    }

    getFeatureFromPayload (featureVariable) {
        let [featureName, variableName] = featureVariable.split('.')
        let variable_array = this.toggles[featureName]
        if (variable_array) {
            for (let variable of variable_array) {
                if (variable.hasOwnProperty(variableName)){
                    return variable[variableName]
                } 
            }
        }
        return undefined
    }
}


class FeatureToggleClient extends EventTarget {
    constructor (args) {
        super()
        this.apiKey = args.apiKey
        this.refreshRate = args.refreshRate
        this.refreshIntervalID
        this.toggles 
        this.last_updated
        this.keepPayloadUpToDate = this.keepPayloadUpToDate.bind(this) 
    }
    
    async start () {
        try {
            let successfulStart = await this.fetchPayload()
            this.dispatchEvent(new CustomEvent('ready'))
            this.refreshIntervalID = setInterval(this.keepPayloadUpToDate, this.parseTimeString())
        } catch (error) {
            console.error(error)
            this.dispatchEvent(new CustomEvent('failed'))
        }
    }

    async keepPayloadUpToDate () { 
        try {
            let refreshPayload = await this.fetchPayload(this.last_updated)
            if (refreshPayload === 304){
                return 
            }
            else if (refreshPayload === 200){
                this.dispatchEvent(new CustomEvent('update'))
            }
            else {
                // If the request fails for some reason
                // Keep using current data and keep trying 
                return 
            }
        } catch (error) {
            console.error(error)
        }
    }

    async fetchPayload (last_updated) {
        let status 
        try {
            let response 
            if (last_updated) {
                response = await fetch('https://feature-flagging-server-envproduction.up.railway.app/api/payload?' + new URLSearchParams({ last_updated }), {
                    headers : {
                        'Authorization' : this.apiKey
                    }
                }) 
            }
            else {
                response = await fetch('https://feature-flagging-server-envproduction.up.railway.app/api/payload', {
                    headers : {
                        'Authorization' : this.apiKey
                    }
                })
            }
            status = response.status
            if (status === 200){
                let payload = await response.json()
                this.toggles = payload.features
                this.last_updated = payload.last_updated
            }
        } catch (error) {
            console.error(error)
            this.toggles = null
            this.last_updated = null
        }
        return status
    }

    getFeatureFromPayload (featureVariable) {
        let [featureName, variableName] = featureVariable.split('.')
        let variable_array = this.toggles[featureName]
        if (variable_array) {
            for (let variable of variable_array) {
                if (variable.hasOwnProperty(variableName)){
                    return variable[variableName]
                } 
            }
        }
        return undefined
    }

    getFlag (flag) {
        return this.getFeatureFromPayload(flag)
    }

    parseTimeString () {
        let stripLetter = this.refreshRate.replace('s', '')
        let num_miliseconds = Number(stripLetter) * 1000 
        return num_miliseconds
    }

}

export default FeatureToggleClient

// let ffts = new FeatureToggleClient({
//     apiKey : 'DEVELOPMENT.WTj0WkD2GUShngVWcCzHJFUoAMRmPp7us11FCbUyPDs239LKABSQLOnlHMnWbaWdFL+CzW488UbOtGDPsgn11Q==', 
//     refreshRate : '5s'
// })

// ffts.start()
// ffts.addEventListener('ready', () => {
//     console.log(ffts.getFlag('dup-proj-feature.Dup-proj-variable'))
// })
