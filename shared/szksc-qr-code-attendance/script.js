function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code
    console.log(`scanned = ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning
    console.warn(`code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// -----------

const html5QrCode = new Html5Qrcode(/* element id */ "reader");
// file based scanning
const fileinput = document.getElementById('qr-input-file');
fileinput.addEventListener('change', e => {
    if (e.target.files.length = 0) {
        // no file selected, ignore
        return;
    }

    const imageFile = e.target.files[0];
    // scan QR code
    html5QrCode.scanFile(imageFile, true)
    .then(decodedText => {
        // success, use decodedText
        console.log(decodedText);
        document.getElementById("scanned-result").innerHTML = decodedText;
        console.log("asd: " + document.getElementById("scanned-result").innerHTML);
    })
    .catch(err => {
        // failure, handle it
        console.log(`error scanning file. Reason: ${err}`)
    });
});