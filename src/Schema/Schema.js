import { gql } from 'apollo-server-core';

export const typeDefs = gql`
type ConversionResult {
  status: String
  updated_date: String
  base_currency_code: String
  base_currency_name: String
  amount: String
  rates: CurrencyRates
}
type CurrencyRates {
  currency_name: String
  rate: String
  rate_for_amount: String
}
type ConversionResult {
  amount: String
  rates: CurrencyRates
}
type Currency {
  currencyCode: String
  currencyName: String
}

type Query {
  convertCurrency(
    from: String!
    to: String!
    amount: String!
  ): ConversionResult

   getAllCurrencies: [Currency]

  getUnitsByGroups (
    group: String!,
  )
  : [String]
  getConfirmationMessage: String

  getAllGroups: [String]
}

type Mutation{
  measurementUnits(
    group: String!
    convertFrom: String!
    convertTo: String!
    quantity: Float!): Float

    recieveContactEmail(
    name: String!
    sender: String!
    subject: String!
    message: String!
  ): String

  sendConfirmationEmail(
    sender: String!
    name: String!): String
}`;
