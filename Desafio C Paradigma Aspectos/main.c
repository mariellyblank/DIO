#include<unistd.h>
#include <stdio.h>
#include <stdbool.h>

//estrutura da conta bancária
struct ContaBancaria 
{
	int		numeroConta;
	char	tipoConta[20];
	double	saldo;
	char	titular[100];
};

// para criar uma nova conta
struct ContaBancaria	criarConta(int numeroConta, const char*tipoConta, double saldo, const char*titular)
{
	struct ContaBancaria conta;
	conta.numeroConta = numeroConta;
	snprintf(conta.tipoConta, sizeof(conta.tipoConta), "%s", tipoConta);
	conta.saldo = saldo;
	snprintf(conta.titular, sizeof(conta.titular), "%s", titular);
	return (conta);
}

// para realizar um saque
bool	sacar(struct ContaBancaria*conta, double valor)
{
	if (conta->saldo >= valor)
	{
		conta->saldo -= valor;
		return (true);
	}
	else
		return (false);
}

// para imprimir informações da conta
void	imprimirConta(struct ContaBancaria conta)
{
	printf("Conta: %d\n", conta.numeroConta);
	printf("Tipo de Conta: %s\n", conta.tipoConta);
	printf("Saldo: %.2f\n", conta.saldo);
	printf("Titular: %s\n", conta.titular);
	printf("\n");
}

int main() {
	struct ContaBancaria contaCorrente = criarConta(123, "Salário", 1000.0, "Sandra");
	struct ContaBancaria contaSalario = criarConta(456, "Corrente", 500.0, "Joana");

	imprimirConta(contaCorrente);
	imprimirConta(contaSalario);

	double valorSaque = 300.0;
	if (sacar(&contaCorrente, valorSaque))
	{
		printf("Saque de %.2f realizado com sucesso na conta %d.\n", valorSaque, contaCorrente.numeroConta);
	}
	else
	{
		printf("Saldo insuficiente na conta %d para o saque de %.2f.\n", contaCorrente.numeroConta, valorSaque);
	}
	valorSaque = 100.0;
	if (sacar(&contaCorrente, valorSaque))
	{
		printf("Saque de %.2f realizado com sucesso na conta %d.\n", valorSaque, contaCorrente.numeroConta);
	}
	else
	{
		printf("Saldo insuficiente na conta %d para o saque de %.2f.\n", contaCorrente.numeroConta, valorSaque);
	}
	return (0);
}

