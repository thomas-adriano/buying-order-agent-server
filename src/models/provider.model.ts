export class Provider {
  public readonly id?: number;
  public readonly idConvenio?: number;
  public readonly codigo?: string;
  public readonly idExterno?: number;
  public readonly nome?: string;
  public readonly fantasia?: string;
  public readonly endereco?: string;
  public readonly bairro?: string;
  public readonly cep?: string;
  public readonly cidade?: string;
  public readonly uf?: string;
  public readonly fone?: string;
  public readonly fax?: string;
  public readonly celular?: string;
  public readonly email?: string;
  // tslint:disable-next-line: variable-name
  public readonly email_nfe?: string;
  public readonly site?: string;
  public readonly obs?: string;
  public readonly cnpj?: string;
  public readonly identificadorEstrangeiro?: string;
  public readonly ie?: string;
  public readonly rg?: string;
  public readonly tipo?: string;
  public readonly identificadorIE?: number;
  public readonly estadoCivil?: number;
  public readonly profissao?: string;
  public readonly localTrabalho?: string;
  public readonly dataNascimento?: string;
  public readonly naturalidade?: string;
  public readonly enderecoNro?: string;
  public readonly complemento?: string;
  public readonly idsAtividades?: string;
  public readonly siglaConvenio?: string;
  public readonly corConvenio?: string;
  public readonly sexo?: string;
  public readonly nomePai?: string;
  public readonly nomeMae?: string;
  public readonly situacao?: string;
  public readonly cpfPai?: string;
  public readonly cpfMae?: string;
  public readonly nomePais?: string;
  public readonly idvendedor?: number;
  public readonly codigoNoFornecedor?: string;
  public readonly tipoNegocio?: string;
  public readonly dataUltimaCompra?: string;
  public readonly idSegmentoCliente?: number;
  public readonly limiteCredito?: number;
  public readonly dadosBancariosPO?: string;
  public readonly descricaoDetalhada?: string;
  public readonly prazoPagamento?: string;
  public readonly classificacaoContato?: number;
  public readonly areaAtuacao?: number;
  public readonly emitirBoleto?: string;
  public readonly idFaixaFaturamento?: number;
  public readonly dtCriacao?: string;

  constructor(partial?: Partial<Provider>) {
    Object.assign(this, partial);
  }
}
