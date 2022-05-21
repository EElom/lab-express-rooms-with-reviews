window.onload = async () => {
    // const response = await axios.get('http://localhost:3000/rooms/json-list');
    // console.log(response);
  
    const generateRooms = async () => {
      const deleteButtons = document.querySelectorAll('.delete-button');
      const container = document.querySelector('#rooms-container');
      deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          // Getting the id of the room
          const id = event.currentTarget.children[0].innerHTML;
  
          // Deleting the room
          await axios.post(`http://localhost:3000/rooms/${id}/delete`);
  
          // Getting the rooms from database
          const response = await axios.get('http://localhost:3000/rooms/json-list');
  
          // Deleting DOM content
          container.innerHTML = "";
  
          // Re-painting DOM content
          response.data.forEach((room) => {
            container.innerHTML += `
          <div class="room-row">
            <a href="/rooms/${room._id}">${room.name}</a>
            <div class="action-links">
              <button type="submit" class="btn btn-warning delete-button">Delete <span class="hide">${room._id}</span></button>
            </div>
          </div>
          `;
          })
  
          generateRooms();
        })
      })
    }
  
    // This will be executed when the page loads for the firs time
    generateRooms();
  
    const printChart = (labels, data) => {
      const ctx = document.querySelector('#myChart').getContext('2d');
      console.log(ctx);
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Rooms reviews",
              backgroundColor: "blue",
              data
            }
          ]
        }
      })
    }
  
    const res = await axios.get('http://localhost:3000/rooms/json-list');
    const labels = res.data.map(room => room.name);
    const data = res.data.map(room => room.reviews);
  
    printChart(labels, data);
  }