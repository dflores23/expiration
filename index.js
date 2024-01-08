
let items = JSON.parse(localStorage.getItem('trackedItems')) || [];

      function isExpired(expirationDate) {
        return new Date() > new Date(expirationDate);
      }

      function renderItems() {
        const itemList = document.getElementById('item-list');
        itemList.innerHTML = '';

        items.forEach((item, index) => {
          const li = document.createElement('li');
          li.textContent = `${item.name} - ${item.expirationDate} (${isExpired(item.expirationDate) ? 'Expired' : 'Not expired'})`;

          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => {
            const newName = prompt('Enter a new name:', item.name);
            const newExpirationDate = prompt('Enter a new expiration date (YYYY-MM-DD):', item.expirationDate);
            updateItem(index, newName, newExpirationDate);
          });
          li.appendChild(updateButton);

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
            deleteItem(index);
          });
          li.appendChild(deleteButton);

          itemList.appendChild(li);
        });
      }

      function addItem(name, expirationDate) {
        items.push({ name, expirationDate });
        saveItems();
        renderItems();
      }

      function updateItem(index, newName, newExpirationDate) {
        items[index].name = newName;
        items[index].expirationDate = newExpirationDate;
        saveItems();
        renderItems();
      }

      function deleteItem(index) {
        items.splice(index, 1);
        saveItems();
        renderItems();
      }

      function saveItems() {
        localStorage.setItem('trackedItems', JSON.stringify(items));
      }

      const addForm = document.getElementById('add-form');
      addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('name-input');
        const expirationDateInput = document.getElementById('expiration-date');
        addItem(nameInput.value, expirationDateInput.value);

        nameInput.value = '';
        expirationDateInput.value = '';
      });

      // Initial rendering when the page loads
      renderItems();