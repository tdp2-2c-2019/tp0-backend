import { Router } from 'express';
import csv from 'csvtojson';


const router = Router();
const csvFilePath = 'cajeros-automaticos.csv';


/* GET atms listing. */
router.get('/', (req, res, next) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.send(jsonObj[0]);
    });
});

export default router;
