# tp0-middleend

## Endpoints

#### `GET` /atms?bank=banco&distance=0.5&network=LINK&originLat=-54.3&originLon=-40.2

Description: Returns a list of banks which match the passed filters

Mandatory params: originLat and originLon

Response:

```json
[
    {
        "id": "11059",
        "long": "-58.3709757833981",
        "lat": "-34.6050839250446",
        "banco": "BANCO DE LA NACION ARGENTINA",
        "red": "LINK",
        "ubicacion": "25 De Mayo 230",
        "localidad": "CABA",
        "terminales": "1",
        "no_vidente": "False",
        "dolares": "False",
        "calle": "25 De Mayo",
        "altura": "230",
        "calle2": "",
        "barrio": "San Nicolas",
        "comuna": "Comuna 1",
        "codigo_postal": "1002",
        "codigo_postal_argentino": "C1002ABF"
    }
]
```

#### `GET` /atms/banks

Description: Returns a list of all the banks names

Response:

```json
["NUEVO BANCO DE SANTA FE S.A.","BANCO DE LA NACION ARGENTINA","BANCO DEL CHUBUT S.A.","BANCO DE SANTA CRUZ S.A.","BANCO DE LA CIUDAD DE BUENOS AIRES","BANCO DE FORMOSA S.A.","CABAL COOP. LTDA.","BANCO DE LA PROVINCIA DE BUENOS AIRES","BANCO PIANO S.A.","BANCO HIPOTECARIO S.A.","CAJERO EXPRESS","BANCO DE COMERCIO","NUEVO BCO. INDUSTRIAL DE AZUL S.A.","BANCO SAENZ S.A.","BANCO DE LA PROVINCIA DE CORDOBA S.A.","BANCO DE SAN JUAN S.A.","NUEVO BANCO DE ENTRE RIOS S.A.","BANCO DE LA PROVINCIA DEL NEUQUEN","BANCO DE LA PAMPA","BANCO DE SANTIAGO DEL ESTERO S.A.","BANCO DE CORRIENTES S.A.","BANCO FINANSUR S.A.","BANCO PCIA. DE TIERRA DEL FUEGO","NUEVO BANCO DEL CHACO S.A.","BANCO MERIDIAN S.A.","HSBC Bank Argentina","BBVA Banco Francés","Banco Galicia","Banco Supervielle","Banco Santander Río","CitiBank","Banco Macro","Banco Comafi","ICBC","Banco Itaú","Banco Patagonia","Compania Financiera","Banco Columbia","Banco del Sol"]
```

#### `GET` /atms/networks

Description: Returns a list of all the networks available

Response:

```json
["LINK","BANELCO"]
```
