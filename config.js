var config = {}

config.endpoint = 'https://cosmosdbseminario.documents.azure.com:443/'
config.key = 'x55SwtJzSPMqN1x1ScJmeYOsAuJ4vp19ONiM1cO1jEd7mM82uYwgOYBwsT05V0DSzHb9WYJxNDkvACDbhbw1ug=='

config.database = {
  id: 'info_produccion'
}

config.container = {
  id: 'Items'
}

config.items = {
    
        'Buenos': 220,
        'Malos': 30,
        'ParadaE': "desactivada",
        'Usuario': "Simon Bolibar",
        'Empresa': "tubos moore",
        'Sede': "Bogota",
        'Lote': " "
    
}

module.exports = config