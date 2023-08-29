# OSFT Client API
### Javascript SDK for [opensourcefeaturetoggles.com](https://opensourcefeaturetoggles.com)

## Other Repositories that are a part of this project

### [React SDK](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Toggles-React-SDK)
### [Admin Website](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Flagging-Admin-UI)
### [Node Backend](https://github.com/DONTSTOPLOVINGMEBABY/Feature-Flagging-Server)

## How to Use 
### 1. Installations

```bash
npm install osff-js-sdk
# or 
yarn add osff-js-sdk 
```

### 2. Initialize the SDK

Somewhere in your application, instantiate the FeaureToggleClient with your apiKey and preferred refreshRate (in seconds). Then call start to send the inital request for flags and start pinging the server for subsequent updates.

```javascript 
import FeatureToggleClient from "osff-js-sdk"

const client = new FeatureToggleClient({
    apiKey : 'YOUR-API-KEY',
    refreshRate : '5s',
})

// Send initial request and continue pinging server for updates
client.start()
```

### 3. Let the client synchronize

You should wait for the client's ```ready``` event to be fired before attempting to check for active features on the client. Attempting to check for flags before the client is initialized could lead to the consumer reading invalid flag data.

```javascript
client.addEventListener('ready', () => {
    if (client.getFlag('feature.variable')) {
        console.log('feature.variable is enabled!')
    }
    else {
        console.log('feature.variable is disabled!')
    }
})
```

### Listening for events

The client emits 4 events. 
 - ```ready```  - The client has loaded the initial flags from the server and is ready to serve up to date flags
 - ```update``` - The server has notified the client that there has been an update to one or more of the flags
 - ```error``` - The client has encountered an error while attmepting to retrieve data from the server
 - ```end``` - The client has been turned off and will no longer attempt to fetch data from the server. Whatever data was received in its final request before the end event is emitted is the data that the client will use until it is reconnected to the server. 

The FeatureToggleClient extends the EventTarget class, which means that you can listen to events by using client.addEventListener('event-name', callBack). 
