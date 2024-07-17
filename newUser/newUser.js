const form = document.getElementById("userForm");

form.addEventListener('submit', stop);

function stop(event) {
    event.preventDefault();
    
    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());
    let jsonData = JSON.stringify(data);

    fetch('http://localhost:8080/new-user', {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: jsonData
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        alert("User created")
    }).catch(error => {
        console.error('Error:', error);
    });
}