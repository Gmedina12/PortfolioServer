import axios from "axios";
import 'dotenv'
import jsonImport from '../../measurementsApi.json' assert { type: 'json' }
import { convertUnits, getUnitsByGroups } from "../Mutation/convertUnits.js";
import {sendConfirmationEmail} from '../Mutation/sendConfirmationEmail.js'
import {recieveContactEmail} from '../Mutation/recieveContactEmail.js'

const API_KEY = process.env.API_KEY

export const resolvers = {
  Query: {
    convertCurrency: async (_, { from, to, amount }) => {
      try {
        const response = await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`)
        const data = response.data

        if (!isNaN(data.amount)) {
          data.amount = parseFloat(data.amount.replace(/,/g, ''));
          return { ...data, rates: data.rates[to] }
        }
        else {
          throw new Error('400 - Error in the request' + Error.name)
        }
      }
      catch (error) {
        console.log(error, 'soy el error y no pude hacer la petición')
        throw new Error('500 -	Server error' + error)
      }
    },
    getAllCurrencies: async () =>{
        try {
          
          const allCurrencies = await axios.get(`https://api.getgeoapi.com/v2/currency/list?api_key=${API_KEY}&format=json`)
          const {data} = allCurrencies
          //[EUR, USD, COP] 
          //{currencyCode, currencyName}
          //currencyCode => Object.keys
          //currencyName => allCurrencies.currencies (prop from json) n [currency] return value in that position
          const currencies= Object.keys(data.currencies).map(currency => ({currencyCode: currency, currencyName: data.currencies[currency]}))
          return currencies

        } catch (error) {
          throw new Error ('500 - Internal Server Error: ', error)
        }
    },
    getUnitsByGroups: async(_, {group}) =>{
      try{
        const totalUnits = getUnitsByGroups(group)
        return totalUnits
      }
      catch(error){
        console.log('No se pudo acceder a los grupos'+ error)
        throw new Error ('500 - Internal server error: ' + error)
      }
    },
    getConfirmationMessage: () => confirmationMessage,
    getAllGroups: () => {
        try{
          const groups = Object.keys(jsonImport)
          return groups;
        }
        catch(error){
          console.log('Error al obtener todos los grupos', error);
          throw new Error ('500 - Internal server error: ' + error)
        }
    }
  },
  Mutation: {
    measurementUnits: async (_, args) => {
        try{
          const result = convertUnits(args); 
          return result
        }
        catch(error){
            console.log("Error when converting units", error);
            throw new Error ('500 - Internal server error: ' + error)
        }
      },
      sendConfirmationEmail: async ( sender ) => {
        try{
          const sendMail = sendConfirmationEmail( sender )
          return sendMail
        }
        catch(error){
          console.log("Error sending email", error);
          throw new Error ('500 - Internal server error: ' + error)
        }
        
      },
      recieveContactEmail: async ( _, {name, sender, subject, message}) => {
        try{
          const recieveEmail = recieveContactEmail(_, {name, sender, subject, message})
          return recieveEmail
        }
        catch(error){
          console.log("Could not receive email", error);
          throw new Error ('500 - Internal server error: ' + error)
        }
      },
  }
  }



