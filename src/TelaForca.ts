import { Forca } from "./Forca.js";

class TelaForca {
  txtChute: HTMLInputElement;
  btnTentativa: HTMLButtonElement;
  btnTentarNovamente: HTMLButtonElement;
  palavraParcial: HTMLParagraphElement;
  tentativas: HTMLParagraphElement;
  forca: Forca;

  constructor() {
    this.forca = new Forca();

    this.configurarPropriedades();
    this.registrarEventos();
  }

  configurarPropriedades() {
    this.txtChute = document.getElementById('txtChute') as HTMLInputElement;
    this.btnTentativa = document.getElementById('btnTentativa') as HTMLButtonElement;
    this.btnTentarNovamente = document.getElementById('btnTentarNovamente') as HTMLButtonElement;
    this.palavraParcial = document.getElementById('palavraParcial') as HTMLParagraphElement;
    this.tentativas = document.getElementById('tentativas') as HTMLParagraphElement;
    this.atualizarImagem();
    this.atualizarPalavraParcial();
  }

  registrarEventos(): void {
    this.btnTentativa.addEventListener('click', (e) => this.avaliarChute(e));
    this.btnTentarNovamente.addEventListener('click', (e) => this.reiniciarJogo(e));
    this.txtChute.addEventListener('input', () => this.limitarChute());
    this.btnTentativa.addEventListener('click', (e) => this.avaliarChute(e));
  }

  avaliarChute(e: Event): void {
    e.preventDefault();
    const palpite: string = this.txtChute.value.toUpperCase();
    this.txtChute.value = '';

    if (palpite.length !== 1 || !/[A-Z]/.test(palpite)) {
      console.error('Valor inválido!');
      return;
    }

    const jogadorAcertou: boolean | undefined = this.JogadorAcertou(palpite);

    if (!jogadorAcertou) {
      this.atualizarImagem();
      this.atualizarTentativas();
    }

    this.txtChute.focus();
  }

  JogadorAcertou(palpite: string): boolean | undefined {
    let letraFoiEncontrada = false;

    for (let i = 0; i < this.forca.palavraSecreta.length; i++) {
      if (palpite.toUpperCase() === this.forca.palavraSecreta[i]) {
        this.forca.letrasEncontradas[i] = palpite.toUpperCase();
        letraFoiEncontrada = true;
      }
    }

    if (letraFoiEncontrada) {
      const jogadorAcertou: boolean = this.forca.letrasEncontradas.join('') === this.forca.palavraSecreta;

      if (jogadorAcertou) {
        this.forca.mensagemFinal = `Você acertou a palavra ${this.forca.palavraSecreta}, parabéns!`;
        this.btnTentativa.disabled = true;
        this.exibirNotificacao(this.forca.mensagemFinal, jogadorAcertou);
      } else {
        this.forca.mensagemFinal = `Você acertou a letra ${palpite}!`;
        this.exibirNotificacao(this.forca.mensagemFinal, true);
      }

      this.atualizarPalavraParcial();
      return jogadorAcertou;
    } else {
      this.atualizarTentativas();
      this.forca.erros++;
      this.tentativas.textContent = `Erros: ${this.forca.erros}/7`;
      if (this.forca.jogadorPerdeu()) {
        this.btnTentativa.disabled = true;
        this.forca.mensagemFinal = "Você perdeu! Tente novamente...";
        this.exibirNotificacao(this.forca.mensagemFinal, false);
      } else {
        this.exibirNotificacao(`A letra ${palpite} não está na palavra.`, false);
      }
    }
  }

  atualizarImagem(): void {
    const imgForca: HTMLImageElement = document.querySelector('.cabecalho > img') as HTMLImageElement;
    imgForca.src = `../img/${this.forca.erros + 1}.png`;
  }

  atualizarTentativas(): void {
    this.tentativas.textContent = `Erros: ${this.forca.erros}/7`;
  }

  atualizarPalavraParcial(): void {
    this.palavraParcial.textContent = `Palavra: ${this.forca.letrasEncontradas.join(' ')}`;
  }

  exibirNotificacao(mensagem: string, jogadorAcertou: boolean): void {
    const pnlConteudo: HTMLDivElement = document.getElementById('pnlConteudo') as HTMLDivElement;

    const txtNotificacao: HTMLParagraphElement = document.createElement('p');
    txtNotificacao.textContent = mensagem;

    this.classificarNotificacao(jogadorAcertou, txtNotificacao);

    pnlConteudo.querySelector('p')?.remove();

    pnlConteudo.appendChild(txtNotificacao);
  }

  classificarNotificacao(jogadorAcertou: boolean, txtNotificacao: HTMLParagraphElement): void {
    if (jogadorAcertou) {
      txtNotificacao.classList.remove('notificacao-erro');
      txtNotificacao.classList.add('notificacao-acerto');
      return;
    }

    txtNotificacao.classList.remove('notificacao-acerto');
    txtNotificacao.classList.add('notificacao-erro');
  }

  limitarChute(): void {
    let inputValue = this.txtChute.value;

    inputValue = inputValue.replace(/[^a-zA-Z]/g, '');

    if (inputValue.length > 0) {
      inputValue = inputValue.charAt(0);
    }

    this.txtChute.value = inputValue;
  }

  reiniciarJogo(e: Event): void {
    e.preventDefault();
    
    this.forca = new Forca();

    const pnlConteudo: HTMLDivElement = document.getElementById('pnlConteudo') as HTMLDivElement;
    this.atualizarImagem();
    this.atualizarPalavraParcial();
    this.atualizarTentativas();
    this.txtChute.value = '';

    pnlConteudo.querySelector('p')?.remove();

    this.btnTentativa.disabled = false;
  }
}

window.addEventListener('load', () => new TelaForca())