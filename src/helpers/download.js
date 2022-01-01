export async function downloadFile(url, filename) {
    // get data
    let blob = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    }).then(r => r.blob());

    // Create an invisible A element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(
        blob
    );

    // Use download attribute to set set desired file name
    a.setAttribute("download", filename);

    // Trigger the download by simulating click
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}