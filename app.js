function cerca() {
    const termineRicerca = document.getElementById("termineRicerca").value.trim();

    const url = `https://iTunes.apple.com/search?term=${encodeURI(termineRicerca)}&media=music&limit=10`;

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                gestioneErrore(res.statusText);
            }
        })
        .then(dati => {
            generaHTMLRisultati(dati.results, termineRicerca);
        })
        .catch(err => {
            console.log(err);
            gestioneErrore("Errore nella chiamata API");
        })
}

function gestioneErrore(errore) {
    document.getElementById("messaggio").innerHTML = errore;
}

function generaHTMLRisultati(canzoni, term) {
    document.getElementById("ricerca").innerHTML = term;

    const lista = document.getElementById("listaRisultati");
    lista.innerHTML = "";

    if (canzoni.length == 0) {
        gestioneErrore("Nessun risultato per questo artista.");
        return;
    }

    for (const c of canzoni) {
        let strHTML = `
        <tr>
            <td><img src="${c.artworkUrl60}"></td>
            <td>${c.trackName}</td>
            <td>${c.artistName}</td>
            <td>${c.trackPrice}</td>
            <td>
                <audio controls>
                    <source src="${c.previewUrl}">
                </audio>
            </td>
        </tr>
        `;

        lista.innerHTML += strHTML;
    }
}