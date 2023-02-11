
fileInput0.addEventListener('click', () => {
    fileInput.value = ''
})

let setted = false
let globalsvg = null

// midi-visualizerの横幅調節
function widthSetter() {

    const vis = visualizer0
    vis.config.noteHeight = 8

    const setWidth = () => {
        const per = main0.offsetWidth / 480
        vis.style.transformOrigin = 'left'
        const els = Array.from(document.getElementsByTagName('svg'))

        if (!els.length) return
        const el = els[0]
        const svgWidth = el.getBoundingClientRect().width

        if (svgWidth < main0.offsetWidth) {
            vis.style.transform = `scale(${per}, 1)`
        } else {
            vis.style.transform = `scale(1, 1)`
        }
    }

    setWidth()
    
    if (setted) return
    window.addEventListener('resize', () => {
        setWidth()
    })
    setted = true
}

window.addEventListener('mousemove', widthSetter)
window.addEventListener('click', widthSetter)
window.addEventListener('touchstart', widthSetter)


window.addEventListener('DOMContentLoaded', () => {
    widthSetter();

    [300, 500, 1000, 1500, 2000, 2500, 3000].map((time) => {
        window.setTimeout(() => {
            widthSetter()
        }, time);
    })
})


widthSetter()

let tmp_filename = ''

function midiFileLoader() {
    
    const vis = document.getElementById('visualizer0')
    const reader = new FileReader()


    reader.onload = (e) => {
        vis.src = e.target.result
        player.src = e.target.result
        const url = makeURL(e.target.result, tmp_filename)
        widthSetter()
        // downloadFile0.innerHTML = `Download ${filename}`
        downloadFile0.href = e.target.result
        downloadFile0.download = tmp_filename
        downloadFile0.style.display = 'inline'
    }    

    if (fileInput0) {
        
        fileInput0.addEventListener('change', (e) => {
            

            const file = e.target.files[0]

            tmp_filename = file.name

            reader.readAsDataURL(file)
        });
    }
}

midiFileLoader()




// file input

jsUploadFile0.addEventListener('change', (e) => {
    const file = e.target.files[0]
    fileName0.innerHTML = file.name
})