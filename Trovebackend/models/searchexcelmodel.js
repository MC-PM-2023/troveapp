
// //it displayed all db columns
// import pool from '../config/database.js';
// import path from 'path';
// import XLSX from 'xlsx';
// import fs from 'fs';

// const exceluploadsDir = path.resolve('exceluploads'); // Ensure this directory exists

// const searchexcelmodel = {
//   async searchWithExcel({ table, file }) {
//     try {
//       // Basic table name validation (prevent SQL injection)
//       if (!/^[a-zA-Z0-9_]+$/.test(table)) {
//         throw new Error("Invalid table name.");
//       }

//       // Read Excel file
//       const filepath = path.join(exceluploadsDir, file.filename);
//       const workbook = XLSX.readFile(filepath);
//       const sheetname = workbook.SheetNames[0];
//       const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);

//       if (!worksheet || worksheet.length === 0) {
//         throw new Error("No data found in Excel");
//       }

//       // Dynamically use all non-empty keys from Excel
//       const keys = Object.keys(worksheet[0]).filter(key => key && typeof key === 'string');
//       if (keys.length === 0) {
//         throw new Error("No valid columns found in Excel.");
//       }

//       const whereConditions = keys.map(key => {
//         const values = worksheet.map(row => (row[key] || '').trim()).filter(v => v);
//         if (values.length === 0) return null;
//         const likeClauses = values.map(() => `${key} LIKE ?`).join(" OR ");
//         return `(${likeClauses})`;
//       }).filter(Boolean);

//       if (whereConditions.length === 0) {
//         throw new Error("No search values provided.");
//       }

//       const whereClause = whereConditions.join(" OR ");
//       const queryParams = [];
//       keys.forEach(key => {
//         worksheet.forEach(row => {
//           const val = (row[key] || '').trim();
//           if (val) {
//             queryParams.push(`%${val}%`);
//           }
//         });
//       });

//       // Build query (columns will be * to return all columns)
//       const query = `SELECT * FROM ?? WHERE ${whereClause}`;
//       const finalQuery = pool.format(query, [table, ...queryParams]);

//     //   console.log("Generated Query:", finalQuery);

//       const [results] = await pool.query(finalQuery);

//       fs.unlinkSync(filepath);
//       return results;
//     } catch (error) {
//     //   console.error("Error during Excel search:", error.message);
//       throw error;
//     }
//   },

//   async generateExcel(results) {
//     try {
//       const resultbook = XLSX.utils.book_new();
//       const resultsheet = XLSX.utils.json_to_sheet(results);
//       XLSX.utils.book_append_sheet(resultbook, resultsheet, 'Results');

//       const resultfilepath = path.join(exceluploadsDir, "Results.xlsx");
//       XLSX.writeFile(resultbook, resultfilepath);

//       return resultfilepath;
//     } catch (error) {
//     //   console.error("Error generating Excel file:", error.message);
//       throw error;
//     }
//   },
// };

// export default searchexcelmodel;


import pool from '../config/database.js';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity';

const exceluploadsDir = path.resolve('exceluploads');

const searchexcelmodel = {

//last code
async preview({ table, file }) {
  if (!/^[a-zA-Z0-9_]+$/.test(table)) throw new Error("Invalid table name");
  const filepath = path.join(exceluploadsDir, file.filename);
  try {
    const workbook = XLSX.readFile(filepath);
    const sheetname = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);
    if (!worksheet.length) throw new Error("No data found in Excel");
    const getExact = (v) => (v !== null && v !== undefined ? String(v).trim() : "");
    const excelData = worksheet.map(r => ({
      Activity_Type: getExact(r.Activity_Type),
      Activity_Title: getExact(r.Activity_Title),
      Reference_Link: getExact(r.Reference_Link),
      Project_Code: getExact(r.Project_Code),
      Activity_Country: getExact(r.Activity_Country),
      Last_Update_Date: getExact(r.Last_Update_Date),
      Geographic_Coverage: getExact(r.Geographic_Coverage)
    }));
    const SIM_THRESHOLD = 0.6;
    const [dbRows] = await pool.query(`SELECT * FROM ??`, [table]);
    // Group DB rows by Type
    const dbByType = new Map();
    for (const r of dbRows) {
      const t = getExact(r.Activity_Type);
      if (!t) continue;
      if (!dbByType.has(t)) dbByType.set(t, []);
      dbByType.get(t).push(r);
    }
    const getTypeFilteredRows = (excelTypeRaw) => {
      if (!excelTypeRaw) return [];
      const out = [];
      for (const [dbTypeRaw, rows] of dbByType.entries()) {
        if (dbTypeRaw.includes(excelTypeRaw) || excelTypeRaw.includes(dbTypeRaw)) {
          out.push(...rows);
        }
      }
      return out;
    };
    // --- REUSABLE MATCHING FUNCTION (UPDATED FOR MULTIPLE MATCHES) ---
    const findAllMatches = (rows, title, link) => {
      // 1. Exact Title Matches (Find ALL occurrences)
      if (title) {
        // filter use panrom instead of find
        const exactTitles = rows.filter(r => getExact(r.Activity_Title) === title);
        if (exactTitles.length > 0) {
          // Map all matches to result format
          return exactTitles.map(r => ({
            row: r,
            by: "Activity Title Exact",
            score: 1,
            stage: "Activity_Title"
          }));
        }
      }
      // 2. Exact Link Matches (If no title match found)
      if (link) {
        const exactLinks = rows.filter(r => getExact(r.Activity_Link) === link);
        if (exactLinks.length > 0) {
          return exactLinks.map(r => ({
            row: r,
            by: "Activity Link Exact",
            score: 1,
            stage: "Activity_Link"
          }));
        }
      }
      // 3. Partial Matches (Only logic for best match here, unless you want multiple fuzzy too)
      // Usually for partial, we still stick to the single best score to avoid garbage data.
      let bestScore = 0;
      let bestRow = null;
      let matchStage = null;
      let matchBy = null;
      if (title) {
        for (const r of rows) {
          const dbT = getExact(r.Activity_Title);
          if (!dbT) continue;
          const sim = stringSimilarity.compareTwoStrings(title, dbT);
          if (sim > bestScore) {
            bestScore = sim;
            bestRow = r;
            matchStage = "Activity_Title";
            matchBy = `Activity Title ${Math.round(bestScore * 100)}%`;
          }
        }
      }
      if ((!bestRow || bestScore < SIM_THRESHOLD) && link) {
        for (const r of rows) {
          const dbL = getExact(r.Activity_Link);
          if (!dbL) continue;
          const sim = stringSimilarity.compareTwoStrings(link, dbL);
          if (sim > bestScore) { // check if link match is better than title match
            bestScore = sim;
            bestRow = r;
            matchStage = "Activity_Link";
            matchBy = `Activity Link ${Math.round(bestScore * 100)}%`;
          }
        }
      }
      if (bestRow && bestScore >= SIM_THRESHOLD) {
        return [{ row: bestRow, by: matchBy, score: bestScore, stage: matchStage }];
      }
      return []; // Return empty array if no match
    };
    const finalResults = [];
    const uniqueKeys = new Set();
    for (const excelRow of excelData) {
      const typeFilteredRows = getTypeFilteredRows(getExact(excelRow.Activity_Type));
      let matches = [];
      let noMatchReason = "No Match";
      if (typeFilteredRows.length === 0) {
        noMatchReason = "No Match - Activity_Type";
      } else {
        // Get Array of matches
        matches = findAllMatches(typeFilteredRows, excelRow.Activity_Title, excelRow.Reference_Link);
      }
      if (matches.length > 0) {
        // Loop through ALL matches found (Example: Title matched 2 rows in DB)
        for (const m of matches) {
          const key=`${m.row.Activity_Title}||${m.row.Project_Code}`;
          uniqueKeys.add(key);
          finalResults.push({
            Activity_Type: m.row.Activity_Type,
            Activity_Title: m.row.Activity_Title,
            Activity_Link: m.row.Activity_Link,
            // Inga ippo distinct Project Codes varum
            Project_Code: m.row.Project_Code,
            Activity_Country: m.row.Activity_Country,
            Last_Update_Date: m.row.Last_Update_Date,
            Geographic_Coverage: m.row.Geographic_Coverage,
            matched_by: m.by,
            match_stage: m.stage,
            match_score: m.score
          });
        }
      } else {
        // Match aagalana, Excel data va apdiye push panniduvom
        finalResults.push({
          Activity_Type: excelRow.Activity_Type,
          Activity_Title: excelRow.Activity_Title,
          Activity_Link: excelRow.Reference_Link,
          Project_Code: excelRow.Project_Code,
          Activity_Country: excelRow.Activity_Country,
          Last_Update_Date: excelRow.Last_Update_Date,
          Geographic_Coverage: excelRow.Geographic_Coverage,
          matched_by: noMatchReason,
          match_stage: null,
          match_score: 0
        });
      }
    }
    return {
      data: finalResults,
      counts: {
        total_excel_rows: excelData.length,
        total_output_rows: finalResults.length, // Puthiya count (expands if multiple matches)
        unique_matched_rows: uniqueKeys.size, // Distinct matched rows based on Title + Project Code
        title_exact: finalResults.filter(r => r.matched_by === "Activity Title Exact").length,
        link_exact: finalResults.filter(r => r.matched_by === "Activity Link Exact").length,
        // ... mattha counts ...
      }
    };
  } finally {
    try { fs.unlinkSync(filepath); } catch (_) {}
  }
},






































  async fetchFull({ table, activities = [] }) {
  if (!/^[a-zA-Z0-9_]+$/.test(table)) {
    throw new Error("Invalid table name");
  }

  if (!activities.length) {
    return { data: [], count: { total: 0 } };
  }

  const where = [];
  const params = [];

  activities.forEach(act => {
    if (act.Activity_Title && act.Project_Code) {
      where.push(`(Activity_Title = ? AND Project_Code = ?)`);
      params.push(act.Activity_Title, act.Project_Code);
    }
  });

  if (!where.length) {
    return { data: [], count: { total_output_rows: 0 } };
  }

  const sql = pool.format(
    `SELECT * FROM ?? WHERE ${where.join(' OR ')}`,
    [table, ...params]
  );

  console.log("fetchFull SQL:", sql);

  const [rows] = await pool.query(sql);

  return {
    data: rows,
    count: {
      total_output_rows: rows.length
    }
  };
}

}

export default searchexcelmodel;
