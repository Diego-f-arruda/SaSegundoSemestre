
import { hash } from "bcrypt";
import "./login.css"

document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();

    var nome = document.getElementById("name") as HTMLInputElement;
    var dataNascimento = document.getElementById("data_nascimento") as HTMLInputElement;
    var email = document.getElementById("email") as HTMLInputElement;
    var password = document.getElementById("password") as HTMLInputElement;
    var passwordConfirmation = document.getElementById("password_confirmation") as HTMLInputElement;

    
    // VERIFICAR SE A SENHA CORRESPONDE
    if(password.value !== passwordConfirmation.value){
        return;
    }

    // VERIFICAR SE O USUÁRIO COM E-MAIL JÁ EXISTE
    const usuarioExiste = await (window as any).bancoAPI.findByEmail(email.value);
    if(usuarioExiste?.id){
      return;
    }

    var usuario = {
      name: nome.value,
      email: email.value,
      password: password.value,
      data_nascimento: new Date (dataNascimento.value)
    };
    
    await (window as any).bancoAPI.createUsuario(usuario);

    
})

document.getElementById("acessar").addEventListener("click", async (event: MouseEvent) =>{
  event.preventDefault();
  
  
  var email = document.getElementById("email_login") as HTMLInputElement;
  var password = document.getElementById("password_login") as HTMLInputElement;
  
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
  
  (window as any).navegacaoAPI.stockRegistration();

})