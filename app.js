document.getElementById('start-config').addEventListener('click', async () => {
    await loadComponents('cpu', 'cpu-select');
    await loadComponents('gpu', 'gpu-select');
    await loadComponents('motherboard', 'motherboard-select');
    await loadComponents('ram', 'ram-select');
    await loadComponents('storage', 'storage-select');
    await loadComponents('psu', 'psu-select');
    await loadComponents('case', 'case-select');
});

async function loadComponents(componentType, selectId) {
    const response = await fetch(`/api/${componentType}`);
    const components = await response.json();

    const select = document.getElementById(selectId);
    components.forEach(component => {
        const option = document.createElement('option');
        option.textContent = component;
        select.appendChild(option);
    });
}

// Obsługa podsumowania konfiguracji
const summaryList = document.getElementById('summary-list');
const totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', updateSummary);
});

function updateSummary() {
    const selectedComponents = {
        cpu: document.getElementById('cpu-select').value,
        gpu: document.getElementById('gpu-select').value,
        motherboard: document.getElementById('motherboard-select').value,
        ram: document.getElementById('ram-select').value,
        storage: document.getElementById('storage-select').value,
        psu: document.getElementById('psu-select').value,
        case: document.getElementById('case-select').value,
    };

    summaryList.innerHTML = '';
    let totalPrice = 0;

    for (let key in selectedComponents) {
        const li = document.createElement('li');
        li.textContent = `${key.toUpperCase()}: ${selectedComponents[key]}`;
        summaryList.appendChild(li);
        totalPrice += getPrice(selectedComponents[key]);
    }

    totalPriceElement.textContent = `${totalPrice} PLN`;
}

function getPrice(component) {
    return Math.floor(Math.random() * 1000);
}
