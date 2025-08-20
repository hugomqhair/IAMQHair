const dailySalesQuery = `SELECT 
                          ven2.apelido
                          ,ROUND(SUM(VALORVENDA),0) AS VENDALIQ
                          ,ROUND(SUM(VLRBONIFICADO),0) AS VLRBONIF
                          ,ROUND(SUM(VALORDEVOLUCAO),0) AS VLRDEVOL
                      FROM VMQ_BASECOM BASE
                      LEFT JOIN tgfven ven ON (base.codvend = ven.codvend)
                      LEFT JOIN tgfven ven2 ON (ven.codger = ven2.codvend)
                      WHERE BASE.DTENTSAI = trunc(sysdate-1) 
                      AND ven2.codvend NOT IN (0,1,2807,7216,9307,16271,22362)
                      GROUP BY ven2.apelido`;

module.exports = dailySalesQuery;
