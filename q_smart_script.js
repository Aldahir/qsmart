var body = document.querySelector("#body"),
    home = document.querySelector('#__smart_section_home'),
    user = document.querySelector('#__smart_section_profile'),
    atr = document.querySelector('.atr'),
    bubble = document.querySelector('.__smart__menu__bubble'),
    plus = document.getElementById('plus'),
    trof = document.querySelector('#__smart_section_trofeu'),
    defn = document.querySelector('#__smart_section_settings');

function login() {
    var xhr = new XMLHttpRequest();
    const formData = new FormData(),
        user = document.querySelector("#__smart__us"),
        senha = document.querySelector("#__smart__pw"),
        url = "data/controller/qsmart_controller.php?role=qslogin";

    if (senha.value == "" || senha.length == 0) {
        senha.style.borderColor = "red";
        toast(`<div class="alert alert-danger" role="alert" data-type="toast">Por favor escreva a sua senha</toast>`)
    }

    formData.append("username", user.value);
    formData.append("password", senha.value);

    xhr.open('POST', url, true);
    //console.log(document.querySelector("#__smart__us").value);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('On ready State Change ' + this.responseText);
        }
    }

    xhr.onload = function () {
        if (this.status == 200 && this.readyState == 4) {
            console.log('Onload ' + this.responseText);
        }
    }

    xhr.send(formData);
}

function initilize_components() {

    let body = document.querySelector('body'), bool = true;

    body.innerHTML += ('<div id="atr"></div><toast id="toast" class="toast"></toast>');

}

function toast(message) {
    var t = document.getElementById("toast"), time = 500;
    fadeIn(t, 5);
    t.innerHTML = message;
    clearTimeout();
    //fadeOut(t, time);   
    //$("toast").html(message).fadeIn("fast", function () { $(this).delay(5000).fadeOut() })
}

const fadeIn = (el, d) => {
    (function increment(c = 0){
        el.style.display = 'block';
        el.style.opacity = String(c);
        if ( el.style.opacity !== '1' ){
            setTimeout(() => {
                increment(c + 0.1);
            }, d / 10);
        }
    })();
}

const fadeOut = (el, d) => {
    (function decrement(){
        ( el.style.opacity -= 0.1 ) < 0 ? el.style.display = 'none' : setTimeout(() => {
                decrement();
            }, d / 10);
    })();
}

function svgTocanva(c, raw, callback){
    var svg = new Blob([raw], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        image = new Image();

    image.onload = () => {
        c.drawImage(this, 0, 0);
        domURL.revokeObjectURL(url);
        callback(this);
    }
    
    image.src = url;
}

function openUserProfile(){
    let x = document.querySelector('.userProfile');

    x.classList.add('slideRightToLeft');
    x.style.display = "grid";
}

function closeUserProfile() {
    let x = document.querySelector('.userProfile');
    x.classList.remove('slideRightToLeft');

    x.classList.add('fadeOut');
    setTimeout(function(){
        x.style.display = "none";
        x.classList.remove('fadeOut');
    },1000);
}

function openModal() {
    atr.style.display = "flex";
    bubble.style.display = "block";
    body.setAttribute("style", 'overflow: hidden');
    plus.classList.add("rotatePlusClock");
    plus.classList.remove('rotatePlusClockwise');
    plus.setAttribute("onclick","closeModal()")
}

function closeModal() {
    plus.classList.add('rotatePlusClockwise');
    plus.classList.remove('rotatePlusClock');
    bubble.style.display = "none";
    atr.style.display = "none";
    body.removeAttribute("style");
    plus.setAttribute("onclick","openModal()")
}

function show(p, i) {
    p.style.display = "inline-grid";
    i.classList.add('active');
}

function mostrar(e) {
    return document.querySelector(e).style.display = "block";
}

function hide(e) {
    const cl = document.querySelectorAll.bind(document),
        s = document.querySelectorAll('.__smart__section');

    s.forEach(el => el.classList.remove('active'));
    cl(e).forEach(el => el.style.display = "none");
}

function onSuccess() {
    let newEl = document.createElement('section');

    newEl.className = '__alert __smart__alert__success';

    newEl.innerHTML = `<div class="__smart__back"><div class="__anchor"><a style="color: black;" href="javascript:closeAlert('.__alert')">&larr;</a></div></div><div class="__smart__text"><div class="__smart__icon"><img src="assets/images/icon_success.svg" alt="Icone de alerta de Sucesso"></div><div class="__smart__text__caption"><h3 style="text-align: center;" class="__smart_caption">Resposta<br>submetida com sucesso</h3></div><div class="__smart__text"><p>Parabéns. Você Acumulou mais 250 milhas</p><p>Continue respondendo e acumulando pontos.</p></div></div><div class="__smart__logo"><img src="assets/images/logo_original.png" alt="Logotipo Q Smart App"></div>`;

    document.querySelector('main').after(newEl);
}

function onError(error = '45X000-12 SQL_CONNECTION_ERR') {
    let newEl = document.createElement('section');

    newEl.className = '__alert __smart__alert__error';

    newEl.innerHTML = `<div class="__smart__back"><div class="__anchor"><a style="color: black;" href="javascript:closeAlert('.__alert')">&larr;</a></div></div><div class="__smart__text"><div class="__smart__icon"><img src="assets/images/icon_error.svg" alt="Icone de alerta de Erro"></div><div class="__smart__text__caption"><h3 style="text-align: center;" class="__smart_caption">Oops!<br>Algo correu mal</h3></div><div class="__smart__text"><p>Infelizmente não foi possível responder ao inquérito.</p><p>Não foi possível responder as respostas.<br>Tente novamnete mais tarde!</p><p>Error: ${error}</p></div></div><div class="__smart__logo"><img src="assets/images/logo_original.png" alt="Logotipo Q Smart App"></div>`;

    document.querySelector('main').after(newEl);
}

function closeAlert(el) {
    let alert = document.querySelector(el);

    alert.style.display = "none";
}

function choosePlan() {
    let qr = document.querySelector('.__smart__plan');

    qr.style.cssText = "display: grid;grid-template-rows:95% 5%;align-items:center;align-self: center;";
}

document.querySelector('.atr').addEventListener('click', function() { closeModal(); });

document.querySelector('#user').addEventListener('click', function () {
    hide('#__smart_section_home, #__smart_section_trofeu, #__smart_section_settings');
    show(user, this.parentNode); closeModal();
});

document.querySelector('#trophy').addEventListener('click', function () {
    hide('#__smart_section_home, #__smart_section_profile, #__smart_section_settings');
    show(trof, this.parentNode); closeModal();
});

document.querySelector('#cog').addEventListener('click', function () {
    hide('#__smart_section_home,#__smart_section_profile,#__smart_section_trofeu');
    show(defn, this.parentNode); closeModal();
});

document.querySelector('#home').addEventListener('click', function () {
    hide('#__smart_section_profile, #__smart_section_trofeu, #__smart_section_settings');
    show(home, this.parentNode); closeModal();
})