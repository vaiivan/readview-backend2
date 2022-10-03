import knex from "knex";
import xlsx from "xlsx";

//workbook
export async function workbookToJSON(filename: string, sheetname: string) {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.Sheets[sheetname];
    return xlsx.utils.sheet_to_json(worksheet);
    }