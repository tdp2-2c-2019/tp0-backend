import { Router } from "express";
import csv from "csvtojson";

const router = Router();
const csvFilePath = "cajeros-automaticos.csv";
let preloadedAtms = null;

const deg2rad = deg => deg * (Math.PI / 180);
const calculateDistance = (origin, destination) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(destination.lat - origin.lat);
  const dLon = deg2rad(destination.lon - origin.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.lat)) *
      Math.cos(deg2rad(destination.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

async function getAtms() {
  if (!preloadedAtms) {
    await csv()
      .fromFile(csvFilePath)
      .then(jsonObj => {
        preloadedAtms = jsonObj;
      });
  }
  return preloadedAtms;
}

/* GET atms listing. */
router.get("/", (req, res) => {
  const { bank, distance, network } = req.query;
  const origin = {
    lat: Number(req.query.originLat),
    lon: Number(req.query.originLon)
  };

  getAtms()
    .then(atms => {
      return atms.filter(atm => {
        const destination = {
          lat: Number(atm.lat),
          lon: Number(atm.long)
        };
        const bankFilter =
          !bank || (bank && atm.banco.localeCompare(bank) === 0);
        const networkFilter =
          !network || (network && atm.red.localeCompare(network) === 0);
        const distanceFilter =
          (!distance && calculateDistance(origin, destination) < 0.5) ||
          (distance && calculateDistance(origin, destination) < distance);
        return bankFilter && networkFilter && distanceFilter;
      });
    })
    .then(filteredAtms => {
      res.send(filteredAtms);
    });
});

/* GET banks listing */
router.get("/banks", (req, res) => {
  getAtms()
    .then(atms => {
      return atms.map(atm => {
        return atm.banco;
      });
    })
    .then(bankNames => {
      const bankSet = new Set(bankNames);
      res.send([...bankSet]);
    });
});

/* GET networks listing */
router.get("/networks", (req, res) => {
  getAtms()
    .then(atms => {
      return atms.map(atm => {
        return atm.red;
      });
    })
    .then(networks => {
      const networkSet = new Set(networks);
      res.send([...networkSet]);
    });
});

export default router;
