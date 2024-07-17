document.addEventListener("DOMContentLoaded", ()=>{
    url = 'http://localhost:8080/show'
    fetch(url).then(res =>{
        return res.json()
    }).then(data =>{
        console.log(data)

        const table = document.getElementById('table').getElementsByTagName('tbody')[0]
        console.log(table)

        data.forEach(user => {
            let row = table.insertRow();
            row.insertCell(0).innerHTML = user.id;
            row.insertCell(1).innerHTML = user.firstName;
            row.insertCell(2).innerHTML = user.lastName;
            row.insertCell(3).innerHTML = user.dateOfBirth;
            row.insertCell(4).innerHTML = user.phoneNumber;
            row.insertCell(5).innerHTML = user.email;
        });
    })

})

function refresh() {
    window.location.reload();
}

function deleteUser() {
    const query = document.getElementById('searchBar').value

    let url = ""
    if (!isNaN(query)) {
        url = "http://localhost:8080/delete-user/" + query
        
    }else{
        alert("You can DELETE Users only by ID!")
    }

    const options = {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
    }

    fetch(url,options).then(res =>{
        if (!res.ok){
            throw new Error('Network response was not ok');
        }
        console.log('Resource deleted successfully');
        refresh()
    }).catch(err =>{
        console.error('There was a problem with the DELETE request:', err.message);
    })



}

function search() {
    const query = document.getElementById('searchBar').value
    url = 'http://localhost:8080';

    if (query === "") {
        url = "http://localhost:8080/show"

        fetch(url).then(res =>{
            return res.json()
        }).then(data =>{
            console.log(data)
    
            const table = document.getElementById('table').getElementsByTagName('tbody')[0]
            table.innerHTML = ''
    
            data.forEach(user => {
                let row = table.insertRow();
                row.insertCell(0).innerHTML = user.id;
                row.insertCell(1).innerHTML = user.firstName;
                row.insertCell(2).innerHTML = user.lastName;
                row.insertCell(3).innerHTML = user.dateOfBirth;
                row.insertCell(4).innerHTML = user.phoneNumber;
                row.insertCell(5).innerHTML = user.email;
            });
        }).catch(err =>{
            console.error('There was a problem with the request:', err.message);
        })
    }

    if (!isNaN(query)) {
        url += "/show/" + query
        console.log(url)
    }else{
        url += '/users/search' + '?query=' + query
        console.log(url) 
    }

    fetch(url).then(res =>{
        return res.json();
    }).then(data =>{
        console.log(data)

        const table = document.getElementById('table').getElementsByTagName('tbody')[0]
        table.innerHTML = ''

        if (Array.isArray(data)) {
            data.forEach(user => {
                let row = table.insertRow();
                row.insertCell(0).innerHTML = user.id;
                row.insertCell(1).innerHTML = user.firstName;
                row.insertCell(2).innerHTML = user.lastName;
                row.insertCell(3).innerHTML = user.dateOfBirth;
                row.insertCell(4).innerHTML = user.phoneNumber;
                row.insertCell(5).innerHTML = user.email;
            });
        } else {
            let row = table.insertRow();
            row.insertCell(0).innerHTML = data.id;
            row.insertCell(1).innerHTML = data.firstName;
            row.insertCell(2).innerHTML = data.lastName;
            row.insertCell(3).innerHTML = data.dateOfBirth;
            row.insertCell(4).innerHTML = data.phoneNumber;
            row.insertCell(5).innerHTML = data.email;
        }
    }).catch(err =>{
        console.error('There was a problem with the request:', err.message);
    })
}