import { Forca } from "./Forca.js";
class TelaForca {
    constructor() {
        this.forca = new Forca();
        this.configurarPropriedades();
        this.registrarEventos();
    }
    configurarPropriedades() {
        this.txtChute = document.getElementById('txtChute');
        this.btnTentativa = document.getElementById('btnTentativa');
        this.btnTentarNovamente = document.getElementById('btnTentarNovamente');
        this.palavraParcial = document.getElementById('palavraParcial');
        this.tentativas = document.getElementById('tentativas');
        this.atualizarImagem();
        this.atualizarPalavraParcial();
    }
    registrarEventos() {
        this.btnTentativa.addEventListener('click', (e) => this.avaliarChute(e));
        this.btnTentarNovamente.addEventListener('click', (e) => this.reiniciarJogo(e));
        this.txtChute.addEventListener('input', () => this.limitarChute());
        this.btnTentativa.addEventListener('click', (e) => this.avaliarChute(e));
    }
    avaliarChute(e) {
        e.preventDefault();
        const palpite = this.txtChute.value.toUpperCase();
        this.txtChute.value = '';
        if (palpite.length !== 1 || !/[A-Z]/.test(palpite)) {
            console.error('Valor inválido!');
            return;
        }
        const jogadorAcertou = this.JogadorAcertou(palpite);
        if (!jogadorAcertou) {
            this.atualizarImagem();
            this.atualizarTentativas();
        }
        this.txtChute.focus();
    }
    JogadorAcertou(palpite) {
        let letraFoiEncontrada = false;
        for (let i = 0; i < this.forca.palavraSecreta.length; i++) {
            if (palpite.toUpperCase() === this.forca.palavraSecreta[i]) {
                this.forca.letrasEncontradas[i] = palpite.toUpperCase();
                letraFoiEncontrada = true;
            }
        }
        if (letraFoiEncontrada) {
            const jogadorAcertou = this.forca.letrasEncontradas.join('') === this.forca.palavraSecreta;
            if (jogadorAcertou) {
                this.forca.mensagemFinal = `Você acertou a palavra ${this.forca.palavraSecreta}, parabéns!`;
                this.btnTentativa.disabled = true;
                this.exibirNotificacao(this.forca.mensagemFinal, jogadorAcertou);
            }
            else {
                this.forca.mensagemFinal = `Você acertou a letra ${palpite}!`;
                this.exibirNotificacao(this.forca.mensagemFinal, true);
            }
            this.atualizarPalavraParcial();
            return jogadorAcertou;
        }
        else {
            this.atualizarTentativas();
            this.forca.erros++;
            this.tentativas.textContent = `Erros: ${this.forca.erros}/7`;
            if (this.forca.jogadorPerdeu()) {
                this.btnTentativa.disabled = true;
                this.forca.mensagemFinal = "Você perdeu! Tente novamente...";
                this.exibirNotificacao(this.forca.mensagemFinal, false);
            }
            else {
                this.exibirNotificacao(`A letra ${palpite} não está na palavra.`, false);
            }
        }
    }
    atualizarImagem() {
        const imgForca = document.querySelector('.cabecalho > img');
        imgForca.src = `../img/${this.forca.erros + 1}.png`;
    }
    atualizarTentativas() {
        this.tentativas.textContent = `Erros: ${this.forca.erros}/7`;
    }
    atualizarPalavraParcial() {
        this.palavraParcial.textContent = `Palavra: ${this.forca.letrasEncontradas.join(' ')}`;
    }
    exibirNotificacao(mensagem, jogadorAcertou) {
        var _a;
        const pnlConteudo = document.getElementById('pnlConteudo');
        const txtNotificacao = document.createElement('p');
        txtNotificacao.textContent = mensagem;
        this.classificarNotificacao(jogadorAcertou, txtNotificacao);
        (_a = pnlConteudo.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
        pnlConteudo.appendChild(txtNotificacao);
    }
    classificarNotificacao(jogadorAcertou, txtNotificacao) {
        if (jogadorAcertou) {
            txtNotificacao.classList.remove('notificacao-erro');
            txtNotificacao.classList.add('notificacao-acerto');
            return;
        }
        txtNotificacao.classList.remove('notificacao-acerto');
        txtNotificacao.classList.add('notificacao-erro');
    }
    limitarChute() {
        let inputValue = this.txtChute.value;
        inputValue = inputValue.replace(/[^a-zA-Z]/g, '');
        if (inputValue.length > 0) {
            inputValue = inputValue.charAt(0);
        }
        this.txtChute.value = inputValue;
    }
    reiniciarJogo(e) {
        var _a;
        e.preventDefault();
        this.forca = new Forca();
        const pnlConteudo = document.getElementById('pnlConteudo');
        this.atualizarImagem();
        this.atualizarPalavraParcial();
        this.atualizarTentativas();
        this.txtChute.value = '';
        (_a = pnlConteudo.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
        this.btnTentativa.disabled = false;
    }
}
window.addEventListener('load', () => new TelaForca());
