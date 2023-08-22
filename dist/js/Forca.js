export class Forca {
    constructor() {
        this.configurarPropriedades();
    }
    configurarPropriedades() {
        this.palavraSecreta = this.obterPalavraSecreta();
        this.letrasEncontradas = this.PopularLetrasEncontradas(this.palavraSecreta.length);
        this.erros = 0;
        this.mensagemFinal = "";
    }
    jogadorPerdeu() {
        return this.erros === 7;
    }
    obterPalavraSecreta() {
        const palavras = [
            "INCONSTITUCIONALISSIMAMENTE",
            "WUKONG",
            "INTER",
            "COLORADO",
            "TENEBROSO",
            "CARAMBOLA",
            "JENIPAPO",
            "TESTE"
        ];
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        return palavras[indiceAleatorio].toUpperCase();
    }
    PopularLetrasEncontradas(tamanho) {
        const letrasEncontradas = new Array(tamanho).fill('_');
        return letrasEncontradas;
    }
}
window.addEventListener('load', () => new Forca());
