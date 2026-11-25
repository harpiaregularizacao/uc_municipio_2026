/**
 * Armazenamento compartilhado do site UCs CAATINGA na planilha do Google.
 * Guarda links, mapas, datas de campo, avisos e equipe na aba "dados".
 * Também envia e-mail à equipe quando um aviso novo é publicado.
 */
var SHEET_ID = '1EcB7YJ6Nme2OXP0sY9t0sRQ3IIN58IzHBzV-kTBU4R8';
var ABA = 'dados';
var COLECOES = ['links', 'mapas', 'avisos', 'equipe'];
var ASSUNTO = 'Notificação Projeto UC Municipais 2026';
var REMETENTE = 'Projeto UC Municipais 2026';
var LIMITE_ENVIOS = 10;      // no máximo 10 avisos com e-mail a cada 10 minutos (evita abuso)
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

// O navegador nunca recebe os e-mails da equipe: só o nome.
function doGet() {
  var v = aba_().getDataRange().getValues(), rows = [];
  for (var i = 1; i < v.length; i++) {
    if (!v[i][0]) continue;
    try {
      var d = JSON.parse(v[i][2]);
      if (v[i][0] === 'equipe') d = { nome: d.nome };
      rows.push({ col: v[i][0], id: String(v[i][1]), data: d });
    } catch (e) {}
  }
  return resp_({ ok: true, rows: rows });
}

function emailsEquipe_(v) {
  var out = [];
  for (var i = 1; i < v.length; i++) {
    if (v[i][0] !== 'equipe') continue;
    try {
      var e = String(JSON.parse(v[i][2]).email || '').toLowerCase();
      if (EMAIL_RE.test(e) && out.indexOf(e) < 0) out.push(e);
    } catch (x) {}
  }
  return out;
}

function notificar_(v, texto) {
  var cache = CacheService.getScriptCache();
  var n = Number(cache.get('envios') || 0);
  if (n >= LIMITE_ENVIOS) return { sent: 0, limited: true };
  cache.put('envios', String(n + 1), 600);
  var lista = emailsEquipe_(v), enviados = 0;
  for (var i = 0; i < lista.length; i++) {
    try {
      MailApp.sendEmail({ to: lista[i], subject: ASSUNTO, body: texto, name: REMETENTE });
      enviados++;
    } catch (e) {}
  }
  return { sent: enviados };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var b = JSON.parse(e.postData.contents);
    if (COLECOES.indexOf(b.col) < 0 || !b.id) return resp_({ ok: false });
    var s = aba_(), v = s.getDataRange().getValues(), linha = 0, idReg = String(b.id);
    for (var i = 1; i < v.length; i++) {
      if (v[i][0] === b.col && String(v[i][1]) === idReg) { linha = i + 1; break; }
    }
    var resultado = { ok: true };
    if (b.op === 'set') {
      var dados = b.data || {};
      if (b.col === 'equipe') {
        var em = String(dados.email || '').toLowerCase().trim();
        var nome = String(dados.nome || '').trim().slice(0, 80);
        if (!EMAIL_RE.test(em) || !nome) return resp_({ ok: false });
        dados = { nome: nome, email: em };
        for (var k = 1; k < v.length; k++) {       // mesmo e-mail: atualiza em vez de duplicar
          if (v[k][0] !== 'equipe') continue;
          try {
            if (String(JSON.parse(v[k][2]).email).toLowerCase() === em) { linha = k + 1; idReg = String(v[k][1]); break; }
          } catch (x) {}
        }
      }
      var novo = !linha;
      var reg = [b.col, idReg, JSON.stringify(dados), new Date()];
      if (linha) s.getRange(linha, 1, 1, 4).setValues([reg]); else s.appendRow(reg);
      if (b.col === 'avisos' && novo) {
        var texto = String(dados.text || '').slice(0, 2000);
        if (texto) {
          var r = notificar_(s.getDataRange().getValues(), texto);
          resultado.sent = r.sent;
          if (r.limited) resultado.limited = true;
        }
      }
    } else if (b.op === 'del') {
      if (linha) s.deleteRow(linha);
    } else {
      return resp_({ ok: false });
    }
    return resp_(resultado);
  } catch (err) {
    return resp_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
