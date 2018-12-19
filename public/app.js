let coords = []

document.addEventListener('DOMContentLoaded', e => {
    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options)
    var resultTemplate = document.getElementById('result-template')
    console.log('DOMContentLoaded')

    const actionUrl = endpoint => {
        const name = document.getElementById('input-name').value
        const latLng = encodeURIComponent(JSON.stringify(coords))
        console.log(latLng)
        return `/${endpoint}?name=${name}&coords=${latLng}`
    }

    if(window.location.pathname === '/results') {
        document.getElementById('results').classList.add('visible');
    } else {
        document.getElementById('home').classList.add('visible');
    }

    document.getElementById('home-link').addEventListener('click', e => {
        document.getElementById('home').classList.add('visible')
        document.getElementById('results').classList.remove('visible')
    })

    document.getElementById('btn-want').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('want')

        document.getElementById('wants-title').classList.remove('visible')

        fetch(url).then(d => d.json()).then(results => {
            console.log(results)

            document.getElementById('results-list').innerHTML = '';
            results.forEach((result, i) => {
                resultTemplate.content.getElementById('result-name').innerHTML = result.name;
                resultTemplate.content.getElementById('result-distance').innerHTML = result.distance.toFixed(2);

                var clone = document.importNode(resultTemplate.content, true);
                document.getElementById('results-list').appendChild(clone);
            })

            document.getElementById('results').classList.add('visible')
            document.getElementById('home').classList.remove('visible')
            document.getElementById('has-title').classList.add('visible')
            document.getElementById('total-haves').innerHTML = results.length;
        })
    })
    document.getElementById('btn-have').addEventListener('click', e => {
        e.preventDefault()
        const url = actionUrl('have')

        document.getElementById('has-title').classList.remove('visible')

        fetch(url).then(d => d.json()).then(results => {
            console.log(results)

            document.getElementById('results-list').innerHTML = '';

            results.forEach((result, i) => {
                resultTemplate.content.getElementById('result-name').innerHTML = result.name;
                resultTemplate.content.getElementById('result-distance').innerHTML = result.distance.toFixed(2);

                var clone = document.importNode(resultTemplate.content, true);
                document.getElementById('results-list').appendChild(clone);
            })

            document.getElementById('results').classList.add('visible')
            document.getElementById('home').classList.remove('visible')
            document.getElementById('wants-title').classList.add('visible')
            document.getElementById('total-wants').innerHTML = results.length;
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
