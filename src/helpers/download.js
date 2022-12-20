/*
    Creates a from the url, puts this in hidden <a> element,
    as a createObjectUrl
    then clicks <a> and removes blob and <a>

    Blobs allow large (>50Mb) file size, so should be fine
    The old <a download> works on same origin,
    so will not work for aws S3 signed urls
*/

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