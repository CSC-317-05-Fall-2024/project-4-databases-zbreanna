/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/
function deleteRestaurant(button) {
    const restaurantItem = button.closest('.restaurant-item'); // Find the closest restaurant item
    const restaurantId =button.id.split('-')[1];

    if (restaurantId) {
        // Send DELETE request to your API
        fetch(`/api/restaurants/${restaurantId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log(`Restaurant with id ${restaurantId} deleted successfully`);
                restaurantItem.remove();

                // re-fetch the updated restaurant data
                return fetch('/api/restaurants');
            } else {
                throw new Error('Failed to delete the restaurant');
            }
        })
        .then(response => response.json())
        .then(updatedRestaurants => {
            renderRestaurantCards(updatedRestaurants);  // Assuming this function renders updated cards
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.restaurant-grid'); // Updated to use .restaurant-grid

    // Get all buttons with the delete-btn class and attach event listeners
    const buttons = container.querySelectorAll('.delete-btn');
    
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            deleteRestaurant(button); // Call deleteRestaurant on button click
        });
    });
});