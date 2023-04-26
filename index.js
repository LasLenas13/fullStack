document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('complete-order');
    const nameInput = document.getElementById('name');
    const mealInput = document.getElementById('meal');
    const sideInput = document.getElementById('side');
    const drinksSelect = document.getElementById('drinks');
    const diningOptions = document.getElementsByName('location');
    const pickUpTimeSelect = document.getElementById('pu-time').querySelector('select');
  
    orderForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = nameInput.value.trim();
      const meal = mealInput.value.trim();
      const side = sideInput.value.trim();
      const drinks = drinksSelect.value;
      const diningOption = Array.from(diningOptions).find(radio => radio.checked)?.value || '';
      const pickUpTime = pickUpTimeSelect.value;
  
      if (!name || !meal || !side || !diningOption) {
        alert('Please fill out all required fields');
        return;
      }
  
      const order = {
        name,
        meal,
        side,
        drinks,
        diningOption,
        pickUpTime,
      };
  
      try {
        const response = await fetch('/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Order details:', data);
        alert('Order submitted successfully');
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error submitting order. Please try again.');
      } finally {
        // Clear the form
        orderForm.reset();
      }
    });
  });
  
