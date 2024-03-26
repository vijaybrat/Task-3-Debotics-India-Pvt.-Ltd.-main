let textInput = document.getElementById('text-label'),
    urlInput = document.getElementById('url-label'),
    textInputSection = document.getElementById('text'),
    urlInputSection = document.getElementById('url'),
    input1 = document.getElementById('text-input'),
    input2 = document.getElementById('url-input'),
    qrCode = document.getElementById('qr-code'),
    actualQR = document.getElementById('qr-Image'),
    list = document.getElementById('format-list'),
    loader = document.querySelector('.loader'),
    link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hey, Adam here!';

textInput.addEventListener('click', () => {
    urlInputSection.style.display = 'none';
    textInputSection.style.display = 'block';
    textInput.style.borderBottomColor = '#fff';
    textInput.style.background = "#fff";
    urlInput.style.borderBottomColor = '#ccc';
    urlInput.style.background = "#eee";
})

urlInput.addEventListener('click', () => {
    textInputSection.style.display = 'none';
    urlInputSection.style.display = 'block';
    urlInput.style.borderBottomColor = '#fff';
    urlInput.style.background = "#fff";
    textInput.style.borderBottomColor = "#ccc";
    textInput.style.background = '#eee';
})

input1.addEventListener('focus', function(){
    input1.style.border = '1px solid black';
    input1.style.background = '#fff';
})

input1.addEventListener('blur', function(){
    input1.style.border = '1px solid grey';
    input1.style.background = '#fafafa';
})

input2.addEventListener('focus', function(){
    input2.style.border = '1px solid black';
    input2.style.background = '#fff';
})

input2.addEventListener('blur', function(){
    input2.style.border = '1px solid grey';
    input2.style.background = '#fafafa';
})

document.getElementById('text-btn').addEventListener('click', () => {
    if(input1.value==''){
        alert('Enter the input first!')
    }
    else{
        generateQR('forText');
    }
})

function validate(){
    const urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g
    if(!input2.value.match(urlRegex)){
        alert("Wrong input");
    }
    else{
        generateQR('forURL')
    }
}

function generateQR(text){
    qrCode.style.display = 'none';
    loader.style.display = 'block';
    setTimeout(() => {
        if(text=='forText'){
            link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+input1.value;
            actualQR.src = link;
        }
        else{
            link = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+input2.value;
            actualQR.src = link;
        }
        qrCode.style.display = 'block';
        loader.style.display = 'none';
    },4000);
}

document.getElementById('download-btn').addEventListener('click', async () => {
    const response = await fetch(link);
    const blob = await response.blob();
    downloadLink = document.createElement('a');
    if(list.selectedIndex==1){
        downloadLink.download = 'qrcode.jpg';
    }
    else{
        downloadLink.download = 'qrcode.png';
    }
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
})