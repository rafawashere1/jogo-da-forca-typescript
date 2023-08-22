export class Forca {

  palavraSecreta: string;
  letrasEncontradas: string[];
  erros: number;
  mensagemFinal: string;

  constructor() {
    this.configurarPropriedades();
  }

  configurarPropriedades(): void {
    this.palavraSecreta = this.obterPalavraSecreta();
    this.letrasEncontradas = this.PopularLetrasEncontradas(this.palavraSecreta.length);
    this.erros = 0;
    this.mensagemFinal = "";
  }

  jogadorPerdeu(): boolean {
    return this.erros === 7;
  }

  obterPalavraSecreta(): string {
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

    const indiceAleatorio: number = Math.floor(Math.random() * palavras.length);

    return palavras[indiceAleatorio].toUpperCase();
  }

  PopularLetrasEncontradas(tamanho: number): string[] {
    const letrasEncontradas = new Array(tamanho).fill('_');
    return letrasEncontradas;
  }

}

window.addEventListener('load', () => new Forca());