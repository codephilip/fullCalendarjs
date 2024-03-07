document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dapilogin').addEventListener('click', function () {
        fetch('/api/dapilogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('network okay!');
                return response.json(); // This line was missing
            })
            .then(data => console.log(data)) // Now `data` should contain the parsed JSON
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    });

    document.getElementById('dapicomplete').addEventListener('click', function () {
        fetch('/api/dapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('network okay!');
                return response.json(); // This line was missing
            })
            .then(data => console.log(data)) // Now `data` should contain the parsed JSON
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    })
});