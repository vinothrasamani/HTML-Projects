
const firebaseConfig = {
    apiKey: "AIzaSyCbx3CDPqxoMHSaspixSrkJSjcU_Zcdmdg",
    authDomain: "tic-tac-toe49.firebaseapp.com",
    projectId: "tic-tac-toe49",
    storageBucket: "tic-tac-toe49.appspot.com",
    messagingSenderId: "979941760767",
    appId: "1:979941760767:web:00fef58d974d7f1c2c76ca"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var load1 = document.querySelector('.form .register span');
var err = document.querySelector('.err');
var errmsg = document.querySelector('.err h4');

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        window.location.href = 'index.html';
    }
});

document.getElementById('rgtr').addEventListener("click", async (e) => {
    e.preventDefault();
    let mail = document.getElementById('mail').value;
    let pass = document.getElementById('pass').value;
    let confirm = document.getElementById('confirm-pass').value;
    
    if (mail && pass && confirm) {
        if (pass === confirm) {
            load1.style.display = "block";
            try {
                const method = await auth.fetchSignInMethodsForEmail(mail);
                if (method.length > 0) {
                    errmsg.textContent = "User already exists so please login.";
                    err.style.display = "block";
                    load1.style.display = "none";
                    setTimeout(listen, 5000);
                } else {
                    await auth.createUserWithEmailAndPassword(mail, pass);
                    alert('User registered successfully!');
                    load1.style.display = "none";
                    window.location.href = "index.html";
                }
            } catch (error) {
                load1.style.display = "none";
                console.log(error);
            }
        } else {
            errmsg.textContent = "Password and Confirm Password must be the same!";
            err.style.display = "block";
            setTimeout(listen, 5000);
        }
    } else {
        errmsg.textContent = "Please provide all the Fields!";
        err.style.display = "block";
        setTimeout(listen, 5000);
    }
});

function listen(){
    err.style.display = "none";            
}
