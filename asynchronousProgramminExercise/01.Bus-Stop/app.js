function getInfo() {
    const baseUrl = `http://localhost:3030/jsonstore/bus/businfo`;
    const stopId = document.getElementById('stopId');
    const submitBtn = document.getElementById('submit');
    const stopName = document.getElementById('stopName');
    const busesUl = document.getElementById('buses')

    fetch(`${baseUrl}/${stopId.value}`)
        .then(response => response.json())
        .then(data => {
            let name = data.name;
            let buses = data.buses;
            stopName.textContent = name;
            busesUl.innerHTML = '';
            Object.keys(buses).forEach(bus =>{
                let liEl = document.createElement('li');
                liEl.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`
                busesUl.appendChild(liEl);
            })

        })
        .catch(err => {
            stopName.textContent = `Error`
            busesUl.innerHTML = '';
        })
}