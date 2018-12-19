let coords = []

document.addEventListener('DOMContentLoaded', e => {
    console.log('DOMContentLoaded')

    const actionUrl = endpoint => {
        const name = document.getElementById('input-name').value
        const latLng = encodeURIComponent(JSON.stringify(coords))
        console.log(latLng)
        return `/want?name=${name}&coords=${latLng}`
    }

    document.getElementById('btn-want').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('want')
        fetch(url).then(d => {
            console.log(d)
        })
    })
    document.getElementById('btn-have').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('have')
        fetch(url).then(d => {
            console.log(d)
        })
    })
})

function geo_success(position) {
    coords = [position.coords.latitude, position.coords.longitude]
    console.log(coords)
}

function geo_error() {
    alert("Sorry, no position available.")
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
}

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options)
