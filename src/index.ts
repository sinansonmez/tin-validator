import { Country } from "utils/constants";
import { validateAT } from "./algorithm/AT";
import { validateBE } from "./algorithm/BE";
import { validateBG } from "./algorithm/BG";
import { validateCY } from "./algorithm/CY";
import { validateCZ } from "./algorithm/CZ";
import { validateDE } from "./algorithm/DE";
import { validateDK } from "./algorithm/DK";
import { validateEE } from "./algorithm/EE";
import { validateEL } from "./algorithm/EL";
import { validateES } from "./algorithm/ES";
import { validateFI } from "./algorithm/FI";
import { validateFR } from "./algorithm/FR";
import { validateHR } from "./algorithm/HR";
import { validateHU } from "./algorithm/HU";
import { validateIE } from "./algorithm/IE";
import { validateIT } from "./algorithm/IT";
import { validateLT } from "./algorithm/LT";
import { validateLU } from "./algorithm/LU";
import { validateLV } from "./algorithm/LV";
import { validateMT } from "./algorithm/MT";

const validate = (tin: string, country: Country) => {
    const validators = {
        [Country.AT]: validateAT,
        [Country.BE]: validateBE,
        [Country.BG]: validateBG,
        [Country.CY]: validateCY,
        [Country.CZ]: validateCZ,
        [Country.DE]: validateDE,
        [Country.DK]: validateDK,
        [Country.EE]: validateEE,
        [Country.EL]: validateEL,
        [Country.ES]: validateES,
        [Country.FI]: validateFI,
        [Country.FR]: validateFR,
        [Country.HR]: validateHR,
        [Country.HU]: validateHU,
        [Country.IE]: validateIE,
        [Country.IT]: validateIT,
        [Country.LT]: validateLT,
        [Country.LU]: validateLU,
        [Country.LV]: validateLV,
        [Country.MT]: validateMT,
      };
    
      const validator = validators[country];
      if (validator) {
        validator(tin);
      }
}

export {
    validate,
    Country
};