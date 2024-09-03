let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculta menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("java");
        habilidades[3].classList.add("sql");
        habilidades[4].classList.add("spring");
        habilidades[5].classList.add("php");
        habilidades[6].classList.add("autodidacta");
        habilidades[7].classList.add("comunicacion");
        habilidades[8].classList.add("trabajo");
        habilidades[9].classList.add("creatividad");
        habilidades[10].classList.add("dedicacion");
        habilidades[11].classList.add("tolerar");
    }
}


//detector scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
}


//ventana error

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        // Evitar el comportamiento predeterminado de envío del formulario
        event.preventDefault();

        // Obtener el formulario
        var formData = new FormData(form);

        // Hacer una solicitud AJAX
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar el contenedor de mensajes
            var mensajeContainer = document.getElementById('mensaje-container');
            mensajeContainer.innerHTML = data.messageHtml; // Asegúrate de que el servidor envíe HTML de respuesta

            // Verifica si el mensaje de éxito está presente
            var exitoModal = document.querySelector('.modal_wrap .mensaje_modal h3');
            if (exitoModal && exitoModal.textContent.trim() === "Mensaje enviado") {
                // Limpiar el formulario si se muestra el mensaje de éxito
                form.reset();
            }

            // Añadir los manejadores de eventos para los botones de cierre
            document.querySelectorAll('#btnClose, #btnClose2').forEach(function(btn) {
                        btn.addEventListener('click', function() {
                            document.querySelector('.modal_wrap').style.display = 'none';
                        });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
