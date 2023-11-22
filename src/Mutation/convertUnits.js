
// import measurementUnits from '../../measurementsApi.json' assert { type: 'json' }
import {measurementUnits} from '../measurementUnits.js'
// const measurements = JSON.parse(JSON.stringify(measurementUnits)) as Measurement[]


export const convertUnits = async (args) => {
    try {
        // console.log(measurementUnits)}
        const { group, convertFrom, convertTo, quantity } = args
        if (!group || !convertFrom || !convertTo || !quantity){
            throw new Error('Missing parameters')
        }
        const toConvert = measurementUnits[group].equalTo[convertFrom][convertTo]

        const unitConverted = toConvert*quantity

        return unitConverted

    }
    catch (error) {
        console.log('Error in conversion', error)
        throw new Error('500 - Internal Error: ' + error)
    }

}

export const getUnitsByGroups = async (group) => {
    const measurementGroup = measurementUnits[group];
    console.log("el ex Json", measurementGroup)
    if(measurementGroup){
      return measurementGroup.units
    }
    else{
      throw new Error(`Mesureament group '${group}' not found.`);
    }
}
