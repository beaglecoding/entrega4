document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("isLoggedIn")) {
        const usuario = document.getElementById("usuario");
        usuario.remove();
    }
    let email = localStorage.getItem("email");
    let li_nav = document.getElementById("usuario");

    li_nav.classList.add("nav-item");
    li_nav.classList.add("dropdown");
    li_nav.innerHTML = `
        <span class ="nav-link" id="userdisplay" role="button" data-bs-toggle="dropdown" 
        aria-expanded="false" data-bs-auto-close="false">${email}
        <i class="bi bi-caret-up" id="hideuserm" style="display: none;"></i>
        <i class="bi bi-caret-down" id="showuserm"></i>
        </span>
    `;

    //Aquí comienza el código para crear el menu desplegable del usuario
    let MenuDesplegable = document.createElement("ul");
    MenuDesplegable.classList.add("dropdown-menu");
    MenuDesplegable.classList.add("back-lgmode");
    MenuDesplegable.setAttribute("id", "usermenubox");

    MenuDesplegable.innerHTML = ` 
    <li>
        <a class="dropdown-item" href="my-profile.html">
            <i class="bi bi-person"></i> 
            Mi perfil
        </a>
    </li>
    <li>
        <a class="dropdown-item" href="cart.html">
            <i class="bi bi-cart"></i> 
            Mi carrito
        </a>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li>
    <div class="dropdown-item">
        <span>Modo Claro / Modo Oscuro</span>
        <div class="contain text-center">
            <label class="toggleswitch">
                <input type="checkbox" name="switch" class="form-check-input" id="modeswitch">
                <span>
                    <i class="bi bi-brightness-high-fill off"></i>
                    <i class="bi bi-moon-stars-fill on"></i>
                </span>
            </label>
        </div>
    </div>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li>
        <a class="dropdown-item" href="login.html">
            <i class="bi bi-door-closed"></i> 
            Cerrar sesión
        </a>
    </li>
    `;

    li_nav.appendChild(MenuDesplegable);

    //Se manejan los eventos click para cuando se despliega el menú o se contrae
    //Fija el hover cuando esta despleago el menú y cambia el sentido de las flechas
    const userdisp = document.getElementById("userdisplay");
    const showarrow = document.getElementById("showuserm");
    const hidearrow = document.getElementById("hideuserm");
    const usermenubox = document.getElementById("usermenubox");

    userdisp.addEventListener("click", () => {
        if (showarrow.style.display === "none") {
            showarrow.style.display = "inline-block";
            hidearrow.style.display = "none";
            li_nav.classList.remove("userclicked");
        } else {
            showarrow.style.display = "none";
            hidearrow.style.display = "inline-block";
            li_nav.classList.add("userclicked");
        }
    })


    //Eventos para cambiar el tema de claro a osuro. Algunos elementos no se cambiaban con activar el switch
    //ya que son personalizados, por lo que se trataron de forma específica

    const ligthdarkswitch = document.getElementById("modeswitch");

    //Cambia en tiempo real el tema seleccionado Light/Dark 
    ligthdarkswitch.addEventListener("click", (event) => {
        event.stopPropagation();
        if (ligthdarkswitch.checked) {
            localStorage.setItem("darktheme", true);
            document.documentElement.setAttribute("data-bs-theme", "dark");
            usermenubox.classList.add("back-dkmode");
        } else {
            localStorage.setItem("darktheme", false);
            document.documentElement.setAttribute("data-bs-theme", "light");
            usermenubox.classList.remove("back-dkmode");
        }
    })

    //Hace que el switch quede para el lado del tema seleccionado siempre
    const switchstate = localStorage.getItem("darktheme") === "true";
    ligthdarkswitch.checked = switchstate;

    //Cambia el estado del menú de usuario según el tema seleccionado
    const settedmode = localStorage.getItem("darktheme");
    if (settedmode === "true") {
        usermenubox.classList.add("back-dkmode");
    }
});
