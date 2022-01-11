import rest from '../util/rest' 

async function searchEntities( entity ) {
  return await rest.get( `api/version` )
}

async function getById( entity, id ) {
  return await rest.get( `test/${entity}/${id}` )
}

async function createEntity( entity, obj ) {
  return await rest.post( `test/${entity}`, obj )
}

export default {
  searchEntities,
  getById,
  createEntity
}