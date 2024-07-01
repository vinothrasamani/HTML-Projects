
        // -----------------------------firebase------------------
        const firebaseConfig = {
            apiKey: "AIzaSyCbx3CDPqxoMHSaspixSrkJSjcU_Zcdmdg",
            authDomain: "tic-tac-toe49.firebaseapp.com",
            databaseURL: "https://tic-tac-toe49-default-rtdb.firebaseio.com",
            projectId: "tic-tac-toe49",
            storageBucket: "tic-tac-toe49.appspot.com",
            messagingSenderId: "979941760767",
            appId: "1:979941760767:web:00fef58d974d7f1c2c76ca"
        };
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const database = firebase.database();
        const storage = firebase.storage();
        const msgRef = database.ref("Messages");
        var audioRef, fileRef;
        var username, recorder;
        const shift = 8;
        
        auth.onAuthStateChanged((user) => {
            if (user) {
                username = user.email.split("@")[0];
                console.log(user.email.split("@")[0]);
            } else {
                window.location.href = 'Register.html';
            } 
        });

        setTimeout(() => {window.scrollTo(0,1)}, 0);
        // -------------------encrypt and Decrypt-----------------
        function caesarEncrypt(message, shift) {
            return message.split('').map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt();
                    const base = (code >= 65 && code <= 90) ? 65 : 97; // ASCII codes for 'A' and 'a'
                    return String.fromCharCode(((code - base + shift) % 26) + base);
                }
                return char;
            }).join('');
        }

        function caesarDecrypt(encryptedMessage, shift) {
            return encryptedMessage.split('').map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt();
                    const base = (code >= 65 && code <= 90) ? 65 : 97; // ASCII codes for 'A' and 'a'
                    return String.fromCharCode(((code - base - shift + 26) % 26) + base);
                }
                return char;
            }).join('');
        }

        // ------------------------------functions----------------
        var msg = document.getElementById('msg');
        var pop = document.querySelector('body .pop');
        var popmsg = document.querySelector('body .pop p');

            var send = document.querySelector('.inputbody .send');
            var voices = document.querySelector('.inputbody .voice');
            var voices_close = document.querySelector('.inputbody .voice-close');
            var func = setInterval(interval, 500);
            
            msgRef.on('child_added', (snapshot) => {
                const message = snapshot.val();
                const chatkey = snapshot.key;
                loadmsgs(message.message, message.sender, chatkey);
            });

        function interval(){
                if(msg.value != ''){
                    voices.style.display = "none";
                    send.style.display = "block";
                }else{
                    voices.style.display = "block";
                    voices_close.style.display = "none";
                    send.style.display = "none";
                }
            }
            
        function loadmsgs(text, sender, chatid){
            const messagesDiv = document.querySelector('.messagebody .inner .list');
            const messageDiv = document.createElement('div');
            const messagehead = document.createElement('h3');
            const i = document.createElement('i');
            i.classList.add('fa-solid');
            i.classList.add('fa-eraser');
            if(sender === username){
                messagehead.textContent = 'you';
            }else{
                messagehead.textContent = sender;
            }
            const decryptedMessage = caesarDecrypt(text, shift);
            if(decryptedMessage.includes(".mp3") || decryptedMessage.includes(".m4a") || decryptedMessage.includes(".wav") || decryptedMessage.includes(".aac") || decryptedMessage.includes(".ogg")){
                var messagecontent = document.createElement('div');
                messagecontent.id = "audio";
                var audiosrc = document.createElement('audio');
                audiosrc.setAttribute('controls', 'controls');
                audiosrc.src = decryptedMessage;
                messagecontent.appendChild(audiosrc);
            }else if(decryptedMessage.includes(".jpg") || decryptedMessage.includes(".jpeg") || decryptedMessage.includes(".png") || decryptedMessage.includes(".gif") || decryptedMessage.includes(".svg") 
            || decryptedMessage.includes(".webp") || decryptedMessage.includes(".heic") || decryptedMessage.includes(".bmp")){
                var messagecontent= document.createElement('a');
                var imgdata = document.createElement('img');
                imgdata.src = decryptedMessage;
                messagecontent.href = decryptedMessage;
                messagecontent.appendChild(imgdata);
            }else if(decryptedMessage.includes(".mp4") || decryptedMessage.includes(".mkv") || decryptedMessage.includes(".mov") || decryptedMessage.includes(".avi") || decryptedMessage.includes(".webm") 
            || decryptedMessage.includes(".mpeg") || decryptedMessage.includes(".flv")){
                var messagecontent= document.createElement('a');
                var videodata = document.createElement('video');
                videodata.src = decryptedMessage;
                messagecontent.href = decryptedMessage;
                messagecontent.appendChild(videodata);
                videodata.setAttribute("controls", "controls");
            }else if(decryptedMessage.includes(".pdf") || decryptedMessage.includes(".docx") || decryptedMessage.includes(".doc") || decryptedMessage.includes(".txt") || decryptedMessage.includes(".odt")){
                var messagecontent= document.createElement('a');
                var pdffile = document.createElement('div');
                pdffile.classList.add("pdf");
                var pdfimage = document.createElement('img');
                pdfimage.src = "https://cdn.pixabay.com/photo/2022/06/09/12/17/files-7252442_960_720.jpg";
                var pdflogo = document.createElement('i');
                pdflogo.classList.add("fa-solid");
                pdflogo.classList.add("fa-file");
                var pname = document.createElement('span');
                pname.textContent = getFileNameFromUrl(decryptedMessage);
                var pdfname = document.createElement('p');
                pdfname.append(pdflogo);
                pdfname.appendChild(pname);
                pdffile.appendChild(pdfimage);
                pdffile.appendChild(pdfname);
                messagecontent.href = decryptedMessage;
                messagecontent.appendChild(pdffile);
            }
            else{
                var messagecontent = document.createElement('p');
                messagecontent.textContent = decryptedMessage;
            }
            messageDiv.classList.add(sender === username ? 'send' : 'receive');
            messagehead.appendChild(i);
            messageDiv.appendChild(messagehead);
            messageDiv.appendChild(messagecontent);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            i.onclick = function(){
                if(username === sender || username === "vinoth"){
                    database.ref('Messages/' + chatid).remove().then(() =>{
                        popmsg.textContent = "Message deleted Successfully..";
                        pop.style.display = "block";
                        pop.style.background = "#02990a";
                        setTimeout(() => {pop.style.display = "none";}, 4000);
                        window.location.reload();
                    }).catch(error => {
                        console.log("Error :" + error);
                    });
                }else{
                    popmsg.textContent = "You don't have an access to delete this chat..";
                    pop.style.display = "block";
                    pop.style.background = "#8c0000";
                    setTimeout(() => {pop.style.display = "none";}, 4000);
                }
            }
        }

        function getFileNameFromUrl(url) {
            const path = decodeURIComponent(url.split('?')[0]); 
            return path.substring(path.lastIndexOf('/') + 1);
        }

        document.querySelector('.inputbody .fa-microphone').addEventListener("click", (e) => {
            e.preventDefault();
            voices.style.display = "none";
            voices_close.style.display = "block";
            clearInterval(func);
            var items = [];
            navigator.mediaDevices.getUserMedia({audio : true}).then(stream => {
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = e =>{
                    items.push(e.data);
                }
                    recorder.onstop = async () => {
                        var blob = new Blob(items, {audio : 'audio/wav'});
                        var r = Math.random();
                        audioRef = storage.ref(`audios/`+ r + `.mp3`);
                        await audioRef.put(blob);
                        let downloadurl = await audioRef.getDownloadURL();
                        const encryptedaudio = caesarEncrypt(downloadurl, shift);
                        console.log(downloadurl);
                        msgRef.push({
                            sender : username,
                            message : encryptedaudio,
                        }).then(() => {
                            console.log("Send Successfully..");
                        }).catch(error => {
                            console.error("internet error :", error);
                        }); 
                    }                
                recorder.start();
            });            
        });
        
        document.querySelector('.inputbody .fa-microphone-slash').addEventListener("click", (e) => {
            e.preventDefault();
            recorder.stop();
            func = setInterval(interval, 500);
            voices.style.display = "block";
            voices_close.style.display = "none";
        });

        document.querySelector('.inputbody .fa-paper-plane').addEventListener("click", (e) => {
            e.preventDefault();
            if(msg.value != ''){
                const encryptedMessage = caesarEncrypt(msg.value, shift);
                msgRef.push({
                    sender : username,
                    message : encryptedMessage
                }).then(() => {
                    console.log("Send Successfully..");
                }).catch(error => {
                    console.error("internet error :", error);
                }); 
            }else{
                popmsg.textContent = "Please enter your message..";
                pop.style.display = "block";
                pop.style.background = "#8c0000";
                setTimeout(() => {pop.style.display = "none";}, 4000);
            }
            msg.value = '';
        });

        document.querySelector('.top .fa-trash').addEventListener("click", () => {
            if (username == "vinoth") {
                msgRef.remove().then(() => {
                    popmsg.textContent = "Messages are permanently deleted Successfully..";
                    pop.style.display = "block";
                    pop.style.background = "#02990a";
                    setTimeout(() => {pop.style.display = "none";}, 4000);
                    window.location.reload();
                }).catch(error => {
                    console.log('Error :' + error);
                });
            }
        });

        document.getElementById('attach').addEventListener("change", async (e) => {
            e.preventDefault();
            const filelist = e.target.files;
            popmsg.textContent = "Uploading..";
            pop.style.display = "block";
            pop.style.background = "#02990a";
            for(let j = 0; j < filelist.length; j++){
                const item = filelist[j];
                const filename = item.name;
                fileRef = storage.ref("uploadedFiles/" + filename);
                await fileRef.put(item);
                const fileurl = await fileRef.getDownloadURL();
                const encryptedfile = caesarEncrypt(fileurl, shift);
                console.log(fileurl);
                msgRef.push({
                    sender : username,
                    message : encryptedfile,
                }).then(() => {
                    console.log("Send Successfully..");
                }).catch(error => {
                    console.error("internet error :", error);
                }); 
            }
            popmsg.textContent = "Uploaded Successfully..";
            pop.style.display = "block";
            pop.style.background = "#02990a";
            setTimeout(() => {pop.style.display = "none";}, 4000);
        });
