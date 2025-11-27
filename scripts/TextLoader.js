class TextLoader {
    static loadText(textPath, textElement) {
        fetch(`/resources/text/${textPath}`)
            .then(res => res.text())
            .then((data) => { 
                textElement.innerHTML = data;
            });
    }
}