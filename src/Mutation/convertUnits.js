
import fs from 'fs'
import jsonImport from '../../measurementsApi.json' assert { type: 'json' }


export const convertUnits = async (args) => {
    try {
        let jsonImport
        fs.readFile('../../measurementsApi.json', 'utf8',(error, data)=>{
          if(error){
            return;
          }
          jsonImport= JSON.parse(data);
        })
        // console.log(jsonImport)
        const { group, convertFrom, convertTo, quantity } = args
        if (!group || !convertFrom || !convertTo || !quantity){
            throw new Error('Missing parameters')
        }
        const toConvert = jsonImport[group].equivalencias[convertFrom][convertTo]
        
        const unitConverted = toConvert*quantity
    
        return unitConverted

    }
    catch (error) {
        console.log('Error in conversion', error)
        throw new Error('500 - Internal Error: ' + error)
    }

}

export const getUnitsByGroups = async (group) => {
    const measurementGroup = jsonImport[group];
    console.log("el Json", measurementGroup)
    if(measurementGroup){
      return measurementGroup.unidades
    }
    else{
      throw new Error(`Mesureament group '${group}' not found.`);
    }
}

