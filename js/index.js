"use strict";
class TelaForca {
    constructor() {
        this.configurarPropriedades();
        this.registrarEventos();
    }
    configurarPropriedades() {
        this.txtChute = document.getElementById('txtChute');
        this.btnTentativa = document.getElementById('btnTentativa');
        this.btnTentarNovamente = document.getElementById('btnTentarNovamente');
        this.palavraParcial = document.getElementById('palavraParcial');
        this.tentativas = document.getElementById('tentativas');
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
        for (let i = 0; i < this.palavraSecreta.length; i++) {
            if (palpite.toUpperCase() === this.palavraSecreta[i]) {
                this.letrasEncontradas[i] = palpite.toUpperCase();
                letraFoiEncontrada = true;
            }
        }
        if (letraFoiEncontrada) {
            const jogadorAcertou = this.letrasEncontradas.join('') === this.palavraSecreta;
            if (jogadorAcertou) {
                this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
                this.btnTentativa.disabled = true;
                this.exibirNotificacao(this.mensagemFinal, jogadorAcertou);
            }
            else {
                this.mensagemFinal = `Você acertou a letra ${palpite}!`;
                this.exibirNotificacao(this.mensagemFinal, true);
            }
            this.atualizarPalavraParcial();
            return jogadorAcertou;
        }
        else {
            this.atualizarTentativas();
            this.erros++;
            this.tentativas.textContent = `Erros: ${this.erros}/7`;
            if (this.jogadorPerdeu()) {
                this.btnTentativa.disabled = true;
                this.mensagemFinal = "Você perdeu! Tente novamente...";
                this.exibirNotificacao(this.mensagemFinal, false);
            }
            else {
                this.exibirNotificacao(`A letra ${palpite} não está na palavra.`, false);
            }
        }
    }
    atualizarImagem() {
        const imgForca = document.querySelector('.cabecalho > img');
        imgForca.src = `img/${this.erros + 1}.png`;
    }
    atualizarTentativas() {
        this.tentativas.textContent = `Erros: ${this.erros}/7`;
    }
    atualizarPalavraParcial() {
        this.palavraParcial.textContent = `Palavra: ${this.letrasEncontradas.join(' ')}`;
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
        const pnlConteudo = document.getElementById('pnlConteudo');
        this.obterPalavraSecreta();
        this.letrasEncontradas = this.PopularLetrasEncontradas(this.palavraSecreta.length);
        this.erros = 0;
        this.atualizarImagem();
        this.atualizarPalavraParcial();
        this.atualizarTentativas();
        this.txtChute.value = '';
        (_a = pnlConteudo.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
        this.btnTentativa.disabled = false;
    }
}
class Forca {
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
