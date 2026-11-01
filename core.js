/* Copyright 2026 Daisosha. Public demonstration; see README.md. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PilotCore = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const VERSION = 1;
  const text = (v, n) => typeof v === 'string' && v.length <= n;
  const number = v => v === '' || (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100000);
  function blank() {
    return {version: VERSION, language: 'ja', title: '', goal: '', owner: '', boundary: '', weeks: Array.from({length: 4}, () => ({action: '', owner: '', evidence: ''})), trials: []};
  }
  function validate(input) {
    if (!input || input.version !== VERSION || !['ja', 'en'].includes(input.language)) throw new Error('format');
    const out = blank();
    for (const k of ['title', 'goal', 'owner', 'boundary']) {
      if (!text(input[k], k === 'title' || k === 'owner' ? 200 : 3000)) throw new Error('text');
      out[k] = input[k];
    }
    if (!Array.isArray(input.weeks) || input.weeks.length !== 4) throw new Error('weeks');
    out.weeks = input.weeks.map(w => {
      if (!w || !['action', 'owner', 'evidence'].every(k => text(w[k], 2000))) throw new Error('week');
      return {action: w.action, owner: w.owner, evidence: w.evidence};
    });
    if (!Array.isArray(input.trials) || input.trials.length > 200) throw new Error('rows');
    out.trials = input.trials.map(r => {
      if (!r || !text(r.task, 200) || !text(r.note, 2000) || !['unchecked', 'accepted', 'rework'].includes(r.quality)) throw new Error('trial');
      if (typeof r.date !== 'string' || (r.date !== '' && (!/^\d{4}-\d{2}-\d{2}$/.test(r.date) || !Number.isFinite(Date.parse(r.date)) || new Date(r.date).toISOString().slice(0, 10) !== r.date))) throw new Error('date');
      if (!['baseline', 'prepare', 'work', 'review'].every(k => number(r[k]))) throw new Error('number');
      return {date: r.date, task: r.task, baseline: r.baseline, prepare: r.prepare, work: r.work, review: r.review, quality: r.quality, note: r.note};
    });
    out.language = input.language;
    return out;
  }
  function summarize(trials) {
    const complete = trials.filter(r => ['baseline', 'prepare', 'work', 'review'].every(k => typeof r[k] === 'number' && number(r[k])));
    const baseline = complete.reduce((n, r) => n + r.baseline, 0);
    const actual = complete.reduce((n, r) => n + r.prepare + r.work + r.review, 0);
    return {count: complete.length, incomplete: trials.length - complete.length, baseline, actual, difference: baseline - actual, percent: baseline > 0 ? 100 * (baseline - actual) / baseline : null, accepted: complete.filter(r => r.quality === 'accepted').length};
  }
  function csv(trials) {
    const quote = v => {
      let s = String(v);
      if (/^[\s]*[=+\-@]/.test(s) || /^[\t\r\n]/.test(s)) s = "'" + s;
      return '"' + s.replace(/"/g, '""') + '"';
    };
    const keys = ['date', 'task', 'baseline', 'prepare', 'work', 'review', 'quality', 'note'];
    return '\uFEFF' + [keys, ...trials.map(r => keys.map(k => r[k]))].map(row => row.map(quote).join(',')).join('\r\n');
  }
  return {VERSION, blank, validate, summarize, csv};
});
