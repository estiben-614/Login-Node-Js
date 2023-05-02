//Referencias HTML 
const nombreUserConectado=document.querySelector('span')

console.log('Inicio de sesión')


// const infoUsuario=async()=>{
//     //Obtenemos la info del usuario que se conectó
//     const resp= await fetch('http://localhost:8080/chat/usuario')

//     const {email,nombre}=await resp.json()
//     console.log(email,nombre)

//     //console.log(await resp.json())
// } 

// infoUsuario()




fetch('http://localhost:8080/chat/usuario')
  .then(response => response.json())
  .then(data => {
    const {email,nombre}=data
    console.log(email,nombre);

    nombreUserConectado.innerHTML=nombre+' '
    
  })
  .catch(error => {
    console.error(error);
  });

