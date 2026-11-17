/**
 * Armazenamento compartilhado do site UCs CAATINGA na planilha do Google.
 * Guarda links, mapas, datas de campo e avisos na aba "dados".
 */
var SHEET_ID = '1EcB7YJ6Nme2OXP0sY9t0sRQ3IIN58IzHBzV-kTBU4R8';
var ABA = 'dados';
var COLECOES = ['links', 'mapas', 'avisos'];

function aba_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var s = ss.getSheetByName(ABA);
  if (!s) {
    s = ss.insertSheet(ABA);
    s.appendRow(['colecao', 'id', 'json', 'atualizado_em']);
    s.setFrozenRows(1);
  }
  return s;
}

function resp_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  var v = aba_().getDataRange().getValues(), rows = [];
  for (var i = 1; i < v.length; i++) {
    if (!v[i][0]) continue;
    try { rows.push({ col: v[i][0], id: String(v[i][1]), data: JSON.parse(v[i][2]) }); } catch (e) {}
  }
  return resp_({ ok: true, rows: rows });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var b = JSON.parse(e.postData.contents);
    if (COLECOES.indexOf(b.col) < 0 || !b.id) return resp_({ ok: false });
    var s = aba_(), v = s.getDataRange().getValues(), linha = 0;
    for (var i = 1; i < v.length; i++) {
      if (v[i][0] === b.col && String(v[i][1]) === String(b.id)) { linha = i + 1; break; }
    }
    if (b.op === 'set') {
      var reg = [b.col, String(b.id), JSON.stringify(b.data), new Date()];
      if (linha) s.getRange(linha, 1, 1, 4).setValues([reg]); else s.appendRow(reg);
    } else if (b.op === 'del') {
      if (linha) s.deleteRow(linha);
    } else {
      return resp_({ ok: false });
    }
    return resp_({ ok: true });
  } catch (err) {
    return resp_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
