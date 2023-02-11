
function getShareLink() {
    const dataURL = player0.src
    const filename = fileName0.innerHTML
    const url = makeURL(dataURL, filename)
    copyToClipboard(url)

    copymsg.style.display = 'inline'
}


function makeURL(dataURL, filename) {
    return location.href.replace(location.search, '') +
        `?data=${encodeURIComponent(dataURL)}` +
        `&filename=${encodeURIComponent(filename)}`
}

function loadURL() {
    // load MIDI from URL
    const data = getUrlParameter('data', location.href)
    if (typeof data !== 'string') return
    visualizer0.src = data
    player0.src = data


    // load filename from URL
    const filename = getUrlParameter('filename', location.href)
    if (typeof filename !== 'string') return
    const fileName0 = document.getElementsByClassName('js-upload-filename')[0]
    fileName0.innerHTML = filename


    downloadFile0.href = data
    // downloadFile0.innerHTML = `Download ${filename}`
    downloadFile0.download = filename
    downloadFile0.style.display = 'inline'

    dragdropMessage.style.display = 'none'
}

window.addEventListener('DOMContentLoaded', () => {
    loadURL()
})

function getUrlParameter(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }

    const dummyEl = document.createElement("input");
    dummyEl.value = text;
    dummyEl.readOnly = true;
    dummyEl.style.position = "absolute";
    dummyEl.style.opacity = "0";
    document.body.appendChild(dummyEl);

    dummyEl.setSelectionRange(0, 5000_0000_0000);

    const result = document.execCommand("copy");
    dummyEl.parentNode?.removeChild(dummyEl);

    return result
        ? Promise.resolve()
        : Promise.reject(
            new Error("Copy is not supported or enable on this device.")
        );
};

