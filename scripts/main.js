const sl = document.querySelectorAll('.slide-image');
let index = 0;
let slideLength = sl.length;

const imageRemover = () => {
    sl.forEach((img)=>{
        img.removeAttribute('id');
    })
}

const slideShow = () => {
    if (index < slideLength) {
        imageRemover()
        sl[index].setAttribute('id', 'show');
        index++
    } else {
        imageRemover()
        index = 0;
        sl[index].setAttribute('id', 'show');
        index++;
    }
    setTimeout(slideShow, 4000)
}

slideShow();
