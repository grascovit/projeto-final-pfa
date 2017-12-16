class TransactionType {
  static options() {
    return ([
      {value: 'debit', text: 'Débito'},
      {value: 'credit', text: 'Crédito'}
    ])
  }
}

export default TransactionType