//form loading animation
/*const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})
*/

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

//form validation
const name = document.querySelector('.name') || null;
const email = document.querySelector('.email') || null;
const password = document.querySelector('.password') || null;
const submitBtn = document.querySelector('.submit-button') || null;

if(name == null){  //login page
    submitBtn.addEventListener('click', () => {
        fetch('/login-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
            //Test
            // if(data.name){
            //     alert('login successful');
            // }
            // else{
            //     alert(data);
            // }
        })
    }) 
}
else{ //register page
    submitBtn.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })
}

const validateData = (data) => {
    if(!data.name){
        alertBox(data);
    }
    else{
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;
    alertContainer.style.top = '5%';
    setTimeout(() =>{
        alertContainer.style.top = null;
    }, 5000);
}