function solve() {
    const infoElement = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let busStop = {
        next:'depot'
    }
    function depart() {
        departBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                busStop = JSON.parse(JSON.stringify(data));
                infoElement.textContent = `Next stop ${busStop.name}`
            })
            .catch(err => console.log(err))
        arriveBtn.disabled = false;
    }   

    function arrive() {
        infoElement.textContent = `Arriving at ${busStop.name}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();