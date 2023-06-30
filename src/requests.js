const temp_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaGVucnl0ZXN0aW5nIiwiaWF0IjoxNjg4MTUxMTgyLCJleHAiOjE2ODgxNTIwODJ9.tG2fTaV2PxW4PfCe25jWoxy-7bMDkViFNQERDtUECkQ`

async function getEverything (username, project_name) {
    let request = await fetch(`http://localhost:3000/api/everything/${username}/${project_name}`, {
        request : 'GET', 
        headers : { 
            'Content-Type' : 'application/json', 
            'Authorization' : `Bearer ${temp_token}`
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
        console.log(thing)
    }
}

main()