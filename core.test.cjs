const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('./core.js');
const row = () => ({date:'2026-10-31', task:'Task', baseline:30, prepare:5, work:8, review:10, quality:'accepted', note:''});
test('round trip preserves typed records and removes unknown properties', () => {
  const n=C.blank();n.trials=[row()];n.unknown='not retained';const out=C.validate(JSON.parse(JSON.stringify(n)));assert.equal(out.unknown,undefined);assert.deepEqual(out.trials,n.trials);
});
test('all effort included, missing measurement excluded, zero preserved',()=>{const a=row(),b={...row(),review:''},c={...row(),baseline:0,prepare:0,work:0,review:0};assert.deepEqual(C.summarize([a,b,c]),{count:2,incomplete:1,baseline:30,actual:23,difference:7,percent:100*7/30,accepted:2});});
test('negative benefit and zero baseline are not disguised',()=>{assert.equal(C.summarize([{...row(),review:40}]).difference,-23);assert.equal(C.summarize([{...row(),baseline:0}]).percent,null);});
test('reject dangerous and malformed values',()=>{for(const v of [-1,Infinity,NaN,100001,'4',null,{}]){const n=C.blank();n.trials=[{...row(),work:v}];assert.throws(()=>C.validate(n));}for(const date of ['2026-02-30','not-a-date','2026-13-02']){const n=C.blank();n.trials=[{...row(),date}];assert.throws(()=>C.validate(n));}});
test('reject excessive rows and string lengths',()=>{const n=C.blank();n.trials=Array.from({length:201},row);assert.throws(()=>C.validate(n));n.trials=[];n.goal='a'.repeat(3001);assert.throws(()=>C.validate(n));});
test('CSV handles quotes and neutralizes spreadsheet formula prefixes',()=>{const s=C.csv([{...row(),task:'=1+1',note:'  @SUM(1)\n"quoted"'}]);assert.match(s,/"'=1\+1"/);assert.match(s,/"'  @SUM/);assert.match(s,/""quoted""/);});
test('untrusted strings remain plain data; prototype fields not carried over',()=>{const n=JSON.parse(JSON.stringify(C.blank()));n.title='<img src=x onerror=alert(1)>';Object.defineProperty(n,'__proto__',{value:{leak:true},enumerable:true});const out=C.validate(n);assert.equal(out.title,n.title);assert.equal(out.leak,undefined);assert.equal(Object.getPrototypeOf(out),Object.prototype);});
