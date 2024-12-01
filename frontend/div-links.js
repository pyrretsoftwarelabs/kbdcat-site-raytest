document.querySelectorAll('.div-link').forEach((element) => {
    element.onclick = (event) => {
        if (!event.target.classList.contains('ignore-click') && !event.target.parentNode.classList.contains('ignore-click')) {
            document.location.href = element.getAttribute('href')
        }
    }
})