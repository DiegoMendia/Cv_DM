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
    //oculto el menu una vez que selecciono una opcion
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


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
}


//ventana
document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault();  // Prevenir el envío tradicional del formulario

    var form = document.getElementById("contactForm");
    var formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();  // Obtener la respuesta como texto
    })
    .then(html => {
    console.log(html);
        // Insertar el fragmento recibido en el contenedor de mensajes
        document.getElementById("mensaje-container").innerHTML = html;
        document.getElementById("mensaje-container").scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Agregar manejadores de eventos para los botones de cerrar
        document.querySelectorAll('#btnClose, #btnClose2').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelector('.modal_wrap').style.display = 'none';
            });
        });
    })
    .catch(error => console.error('Error:', error));
});