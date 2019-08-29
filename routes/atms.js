import { Router } from "express";
import csv from "csvtojson";

const router = Router();
const csvFilePath = "cajeros-automaticos.csv";

/* GET atms listing. */
router.get("/", (req, res) => {
  const { bank, network } = req.query;
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      const filteredAtms = jsonObj.filter(atm => {
        const bankFilter =
          !bank || (bank && atm.banco.localeCompare(bank) === 0);
        const networkFilter =
          !network || (network && atm.red.localeCompare(network) === 0);
        return bankFilter && networkFilter;
      });
      res.send(filteredAtms[0]);
    });
});

export default router;
