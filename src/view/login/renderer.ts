
import { hash } from "bcrypt";
import "./login.css"
import '../geral.css'

document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    let nome = document.getElementById("name") as HTMLInputElement;
    let dataNascimento = document.getElementById("data_nascimento") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let password = document.getElementById("password") as HTMLInputElement;
    let passwordConfirmation = document.getElementById("password_confirmation") as HTMLInputElement;

    
    // VERIFICAR SE A SENHA CORRESPONDE
    if(password.value !== passwordConfirmation.value){
        return;
    }

    // VERIFICAR SE O USUÁRIO COM E-MAIL JÁ EXISTE
    const usuarioExiste = await (window as any).bancoAPI.findByEmail(email.value);
    if(usuarioExiste?.id){
      return;
    }

    let usuario = {
      name: nome.value,
      email: email.value,
      password: password.value,
      data_nascimento: new Date (dataNascimento.value)
    };
    
    await (window as any).bancoAPI.createUsuario(usuario);

    
})

document.getElementById("acessar").addEventListener("click", async (event: MouseEvent) =>{
  event.preventDefault();
  
  
  let email = document.getElementById("email_login") as HTMLInputElement;
  let password = document.getElementById("password_login") as HTMLInputElement;
  
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