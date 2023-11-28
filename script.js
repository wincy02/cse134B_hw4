document.getElementById('contact_form').addEventListener('submit', function (event){
    event.preventDefault();

    FileSystemDirectoryHandle('https://httpbin.org',{
        method:"POST",
        body: new FormData(event.target),
    })
    .then(response => response.json())
    .then(data=>{
        document.getElementById('info_output').textContent=`Submitted successfully! Response:${JSON.stringify(data)}`;

    })
    .catch(error=>{
        document.getElementById('error').textContent=`Error:${error.message}`;
    });

})