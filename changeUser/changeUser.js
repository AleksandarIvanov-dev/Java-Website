let query;

function search() {
    const searchBar = document.getElementById("searchBar").value
    let url = "http://localhost:8080/show/" + searchBar

    fetch(url).then(res=>{
        return res.json();
    }).then(data =>{
        console.log(data)
        query = data.id;
        document.getElementById('fName').value = data.firstName;
        document.getElementById('lName').value = data.lastName;
        document.getElementById('date').value = data.dateOfBirth;
        document.getElementById('number').value = data.phoneNumber;
        document.getElementById('e-mail').value = data.email;

    }).catch(err =>{
        console.error('There was a problem with the request:', err.message);
    })
}

function update() {
    const data = {
        id: query,
        firstName: document.getElementById('fName').value,
        lastName: document.getElementById('lName').value,
        dateOfBirth: document.getElementById('date').value,
        phoneNumber: document.getElementById('number').value,
        email: document.getElementById('e-mail').value,
    }
    console.log(data)

    let jsonData = JSON.stringify(data);

    const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
    };

    let url = "http://localhost:8080/update-user/" + query
    //console.log(url)

    fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert("User updated!")
    }).catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
}