async function fetchPayload (last_updated, apiKey) { 
    try {
        let response 
        if (last_updated) {
            response = await fetch('https://feature-flagging-server-envproduction.up.railway.app/api/payload?' + new URLSearchParams({ last_updated }), {
                headers : {
                    'Authorization' : apiKey
                }
            }) 
        }
        else {
            response = await fetch('https://feature-flagging-server-envproduction.up.railway.app/api/payload', {
                headers : {
                    'Authorization' : apiKey
                }
            })
        }
        if (response.status === 304){
            return [response, null]
        }
        let body = await response.json()
        return [ response, body ]     
    } catch (error) {
        throw new Error(error)
    }
}

export default fetchPayload