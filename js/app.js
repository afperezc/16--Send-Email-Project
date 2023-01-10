document.addEventListener("DOMContentLoaded", function () {
  //Cuando se carga el documento

  const email = {
    email: "",
    subject: "",
    message: "",
  };

  //Seleccionar los elementos de la interfaz

  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("input", validar); //funcion asociada
  inputSubject.addEventListener("input", validar);
  inputMessage.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    //Reiniciar el objeto

    resetForm();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      //Reiniciar el objeto
        resetForm();

        //Crear una alerta

        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500' , 'text-white', 'p-2', 'text-center', 'rounder-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

        alertaExito.textContent = 'Message Sent Correctly';
        formulario.appendChild(alertaExito);

        setTimeout(()=>{
            alertaExito.remove();
        },3000)
    }, 3000);
  }
  //Funcion reutilizable para los campos
  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `The field ${e.target.id} is obligatory`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("The Email is not valid", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    // //Comprobar si ya existe una alerta
    // const alerta = referencia.querySelector('.bg-red-600'); //Usamos referenica para seleccionar unicamente de donde estamos escribiendo
    // if (alerta){
    //     alerta.remove();
    // }

    limpiarAlerta(referencia);

    //Generar una Alerta en HTML

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario

    referencia.appendChild(error);

    //Inner HTML

    // formulario.innerHTML = error.innerHTML;
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600"); //Usamos referenica para seleccionar unicamente de donde estamos escribiendo
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; //Expresion regular Busca que se cumpla la expresion como emails, tarjeta de credito, etc
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetForm(){
          //Reiniciar el objeto

          email.email = "";
          email.subject = "";
          email.message = "";
    
          formulario.reset();
          comprobarEmail();
  }
});
