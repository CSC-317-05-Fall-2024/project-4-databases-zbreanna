//const handleSubmit = async (event) => {
//  event.preventDefault(); 

// Extract fields from the form, and
// send a request to create a new restaurant

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('#new-restaurant-form');
    
        form.addEventListener('submit',function(event){
    
            event.preventDefault();
    
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const photo = document.getElementById('photo').value;
    
            console.log({ name, phone, address, photo });

            fetch('/api/restaurants',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
    
                 },
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    photo
                }),
            }) 
            .then(response => response.json()) 
            .then(data => {
                console.log(data);
                if(data.id){
                window.location.href = `/restaurants/${data.id}`;  
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    })