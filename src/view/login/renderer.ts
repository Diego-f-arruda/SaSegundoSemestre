
import { hash } from "bcrypt";
import "./login.css";

document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    const nome = document.getElementById("name") as HTMLInputElement;
    const dataNascimento = document.getElementById("data_nascimento") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordConfirmation = document.getElementById("password_confirmation") as HTMLInputElement;

    
    if(password.value !== passwordConfirmation.value){
        return;
    }

    const usuarioExiste = await (window as any).bancoAPI.findByEmail(email.value);
    if(usuarioExiste?.id){
      return;
    }

    const usuario = {
      name: nome.value,
      email: email.value,
      password: password.value,
      data_nascimento: new Date (dataNascimento.value)
    };
    
    await (window as any).bancoAPI.createUsuario(usuario);

    
})

document.getElementById("acessar").addEventListener("click", async (event: MouseEvent) =>{
  event.preventDefault();
  
  
  const email = document.getElementById("email_login") as HTMLInputElement;
  const password = document.getElementById("password_login") as HTMLInputElement;
  
  const usuario = await (window as any).bancoAPI.findByEmail(email.value)
  if(!usuario){
    console.log("usuario nao existe");
    return;
  }

  const passwordConfirmation = {
    password: password.value,
    password_hash: usuario.password_hash
  }

  const validPassword = await (window as any).authAPI.hash(passwordConfirmation);
  if(!validPassword){
    console.log("credenciais incorretas!!!");
    return;

  }

  (window as any).navegacaoAPI.paginaHome();

})