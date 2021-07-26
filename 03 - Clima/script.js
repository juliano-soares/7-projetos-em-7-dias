document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        showWarnings('Carregando...');
        
        let url = `https://api.openweathemap.org/data/2.5/weather?q={${encodeURI(input)}}&appid=494775003ac23428a570bb9c9ccd4509&units=metric&lang=pt_br`;
        
        let result = await fetch(url);
        let json = await result.json();

        if(json.code === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            clearInfo();
            showWarnings('Não encontramos esta localização;')
        }
    } else {
        clearInfo();
    }
})

function showInfo(json) {
    showWarnings('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarnings('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarnings(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}