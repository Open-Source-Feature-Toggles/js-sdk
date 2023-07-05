import { StartFlaggingService } from "./helpers/requests.js"

class FeatureFlagging {
    constructor(apiKey) {
        if (FeatureFlagging.instance) {
            return FeatureFlagging.instance
        }
        this.apiKey = apiKey
        this.lastUpdated = null
        this.data = null

        this.doThis()

        FeatureFlagging.instance = this 
        return this 
    }

    async doThis () {
        console.log("nice")
        let request = await StartFlaggingService(this.apiKey)
    }


}


let hello = new FeatureFlagging(`A8aKIJ3sQP6Sq0fvwkiy4pS3tX3vpyRFPuLHS2Mx6sEzq83yx3MxVwtHlDRxK+idpcWMfTpUvBfcI3EAjP7L2Q==`)