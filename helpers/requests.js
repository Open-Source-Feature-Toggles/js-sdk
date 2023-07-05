let productionKey = `9dIVKh5GLzw9pF02DE9NKd8XmaSUFoIlYaRhuq5QNiODvLpF0zkK8ZRCuNrdfkJYOB9NZmoHovkOz2fLpIJARg`

async function getEverything () {
    let request = await fetch(`http://localhost:3000/api/everything`, {
        request : 'GET', 
        headers : { 
            'Content-Type' : 'application/json', 
            'Authorization' : `${productionKey}`
        }, 
    })
    if (!request.ok){
        console.log("failed") ; return 
    }
    let data = await request.json()
    return data
}



async function main () {
    let data = await getEverything("henrytesting", "Test-Proj2")
    for ( let thing in data) {
        console.log(data[thing])
    }
}


function StartFlaggingService (apiKey) {
    return fetch(`http://localhost:3000/api/everything`, {
        request : 'GET', 
        headers : {
            'Authorization' : `${apiKey}`
        }
    })
}



main()

export {
    StartFlaggingService
}