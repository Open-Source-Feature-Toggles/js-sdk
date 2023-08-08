import EVENTS from './constants.js'
import fetchPayload from './requests.js'
import { 
    parseTimeString, 
    getFlagStatusFromPaylod,  
}  from './helpers.js'


class FeatureToggleClient extends EventTarget {
    constructor (args) {
        super()
        this.apiKey = args.apiKey
        this.refreshRate = parseTimeString(args.refreshRate)
        this.refreshIntervalID 
        this.payload
        this.updatePayload = this.updatePayload.bind(this) 
    }

    async start () {
        try {
            let [ response, body ] = await fetchPayload(null, this.apiKey)
            console.log(typeof response.status)
            if (response.status !== 200 && response.status !== 304){
                throw new Error(body)
            }
            this.payload = body
            this.dispatchEvent(new CustomEvent(EVENTS.ready))
            this.refreshIntervalID = setInterval(this.updatePayload, this.refreshRate)
        } catch (error) {
            console.error(error)
            throw new Error('Client failed to start')
        }
    }

    async updatePayload () {
        try {
            let [ refreshPayload, body ] = await fetchPayload(this.payload.last_updated, this.apiKey)
            if (refreshPayload.status === 304) { return }
            else if (refreshPayload.status === 200) {
                this.payload = body
                this.dispatchEvent(new CustomEvent(EVENTS.update))
            }
            else {
                this.dispatchEvent(new CustomEvent(EVENTS.error))
                throw new Error(`Request to refresh payload returned with a status of ${refreshPayload.status}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async stop () {
        clearInterval(this.refreshIntervalID)
        this.dispatchEvent(new CustomEvent(EVENTS.end))
    }

    getFlag (flag) {
        return getFlagStatusFromPaylod(this.payload, flag)
    }    
}


export default FeatureToggleClient