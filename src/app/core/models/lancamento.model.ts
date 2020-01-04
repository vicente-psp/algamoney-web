import { Pessoa } from './pessoa.model';
import { Categoria } from './categoria.model';

export class Lancamento {
  id: number;
  descricao: string;
  tipo = 'RECEITA';
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
