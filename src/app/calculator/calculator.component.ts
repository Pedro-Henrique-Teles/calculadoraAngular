import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  numeroAtual: string = '0';
  primeiroOperando: number | null = null;
  operador: string | null = null;
  esperarSegundoNumero: boolean = false;

  // Adiciona um número ao display
  adicionarNumero(valor: string) {
    if (this.esperarSegundoNumero) {
      this.numeroAtual = valor;
      this.esperarSegundoNumero = false;
    } else {
      this.numeroAtual === '0' ? (this.numeroAtual = valor) : (this.numeroAtual += valor);
    }
  }

  // Adiciona um decimal ao número atual
  adicionarDecimal() {
    if (!this.numeroAtual.includes('.')) {
      this.numeroAtual += '.';
    }
  }

  // Realiza a operação
  private realizarCalculo(op: string, segundoOperando: number) {
    switch (op) {
      case '+':
        return (this.primeiroOperando as number) + segundoOperando;
      case '-':
        return (this.primeiroOperando as number) - segundoOperando;
      case '*':
        return (this.primeiroOperando as number) * segundoOperando;
      case '/':
        return (this.primeiroOperando as number) / segundoOperando;
      default:
        return segundoOperando;
    }
  }

  // Escolhe a operação
  escolherOperacao(op: string) {
    if (this.primeiroOperando === null) {
      this.primeiroOperando = Number(this.numeroAtual);
    } else if (this.operador) {
      const resultado = this.realizarCalculo(this.operador, Number(this.numeroAtual));
      this.numeroAtual = String(resultado);
      this.primeiroOperando = resultado;
    }
    this.operador = op;
    this.esperarSegundoNumero = true;
  }

  // Limpa o display e  reinicia os valores
  limpar() {
    this.numeroAtual = '0';
    this.primeiroOperando = null;
    this.operador = null;
    this.esperarSegundoNumero = false;
  }

  // Calcula o resultado final
  calcular() {
    let resultado = this.realizarCalculo(this.operador!, Number(this.numeroAtual));
    this.numeroAtual = String(resultado);
    this.primeiroOperando = resultado;
    this.operador = null;
    this.esperarSegundoNumero = false;
  }
}
