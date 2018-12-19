let coords = []

document.addEventListener('DOMContentLoaded', e => {
    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options)
    console.log('DOMContentLoaded')

    const actionUrl = endpoint => {
        const name = document.getElementById('input-name').value
        const latLng = encodeURIComponent(JSON.stringify(coords))
        console.log(latLng)
        return `/${endpoint}?name=${name}&coords=${latLng}`
    }

    document.getElementById('btn-want').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('want')
        fetch(url).then(d => d.json()).then(d => {
            console.log(d)
            // history.pushState({ foo: 'bar' }, "Results", "/results");
            document.getElementById('resultsDebug').innerHTML = JSON.stringify(d, null, 2)

            document.getElementById('results').classList.add('visible')
            document.getElementById('home').classList.remove('visible')
        })
    })
    document.getElementById('btn-have').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('have')
        fetch(url).then(d => {
            console.log(d)
        })
    })

    fetch('/suggest')
        .then(res => res.text())
        .then(function (res) {
            const name = res.replace(/\s/g, '');
            document.getElementById('input-name').setAttribute('value', name)
        })
})

function geo_success(position) {
    coords = [position.coords.latitude, position.coords.longitude]
    console.log(coords)
    document.getElementById('actions').classList.remove('disabled')
}

function geo_error() {
    alert("Sorry, no position available.")
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
}
