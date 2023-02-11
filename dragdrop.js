const dropZone = document.getElementById('drop-zone');
const curtain = document.getElementById('curtain');




dropZone.addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    curtain.style.display = 'block';
}, false);

curtain.addEventListener('dragleave', function (e) {
    e.stopPropagation();
    e.preventDefault();
    curtain.style.display = 'none';
}, false);

dropZone.addEventListener('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    curtain.style.display = 'none';
    var files = e.dataTransfer.files; //ドロップしたファイルを取得
    if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
    fileInput0.files = files; //inputのvalueをドラッグしたファイルに置き換える。

    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        fileInput0.dispatchEvent(evt);
    }
    else
        fileInput0.fireEvent("onchange");
}, false);

fileInput0.addEventListener('change', () => {
    curtain.style.display = 'none';
    dragdropMessage.style.display = 'none'
})
