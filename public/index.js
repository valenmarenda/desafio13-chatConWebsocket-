const socket = io();

document.addEventListener("DOMContentLoaded", function () {
    


   // let hoy = new Date()
   // let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
   // let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
   // const fechaYHora = fecha + ' ' + hora;
    //console.log(fechaYHora)
    const addMessage = () => {
     
      let message = {
        author: document.querySelector("#username").value,
        text: document.querySelector("#text").value,
        
      };
      

      console.log(message)
     console.log('Mensaje enviado...');
      socket.emit("new-message", message);
      return false;
    };
    document.querySelector('form').addEventListener("submit",function(e){
    e.preventDefault();
     addMessage();
    })
  
    const render = (data) => {
      let html = data
        .map( //como hago para que la hora quede guardada
          (e) => `
           <div class="chatText">
           <strong>${e.text}</strong>:
           <em>${e.author}</em>
           </div>
          `
        )
        .join(" ");
      document.querySelector("#messages").innerHTML = html;
    };
  
    socket.on("messages", (data) => {
      render(data);
    });


  });

  let texto = document.getElementById('text')
  let username = document.getElementById('username')
  let actions = document.getElementById('actions')
  let users = document.getElementById('users')
 texto.addEventListener('keypress', function(){  
    socket.emit('typingProducts', username.value);
    
})
socket.on('typingProducts', function (data){
  actions.innerHTML = `<p> ${data} está escribiendo...</p>` 
  users.innerHTML = `<p><i class="fas fa-user"></i> ${data} </p>`
})
