const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context={window:{},location:{origin:'https://example.test'},URL};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/map/content.js'),'utf8'),context);
const content=context.window.MAP_CONTENT;
test('actual own media precedes official actual subjects, then justified labeled AI illustrations',()=>{
 const entry={media:[
  {id:'ai',type:'image',url:'/ai.jpg',provenance:{kind:'ai',reason:'No actual or official image available'}},
  {id:'official',type:'image',url:'/official.jpg',provenance:{kind:'official',actualSubject:true,sourceUrl:'https://official.example/subject'}},
  {id:'own',type:'image',url:'/own.jpg',provenance:{kind:'own',actualSubject:true}},
  {id:'unknown',type:'image',url:'/old.jpg'},
  {id:'bad',type:'image',url:'javascript:alert(1)'}
 ]};
 assert.deepEqual(Array.from(content.media(entry),item=>item.id),['own','official','unknown']);
 assert.equal(content.media({media:[entry.media[0]]})[0].id,'ai');
 assert.match(content.label(entry.media[0]),/AI illustration/);
 assert.equal(entry.media[0].id,'ai'); // Selection cannot mutate the source order.
 assert.equal(content.primary({media:[entry.media[1],{...entry.media[2],type:'video'}]}).type,'video');
});
test('pins reject missing, partial, private or out-of-range coordinates; zero remains valid',()=>{
 for(const place of [{lat:'',lng:''},{lat:null,lng:null},{lat:10},{lat:91,lng:0},{lat:0,lng:181},{lat:10,lng:20,visibility:'private'}])assert.equal(content.coordinates(place),false);
 assert.equal(content.coordinates({lat:0,lng:0}),true);
});
test('details preserve multiple places, business and source links; escape text and exclude private places',()=>{
 const html=content.details({id:'entry',projects:['NOVA'],locations:[{label:'Hotel',role:'hotel'},{label:'Launch',role:'launch'},{label:'SECRET',visibility:'private'}],links:[{kind:'business',label:'Operator',url:'https://official.example/'}],sources:[{label:'Evidence',url:'https://example.test/source'}],media:[]});
 assert.match(html,/Hotel/);assert.match(html,/Launch/);assert.match(html,/Business: Operator/);assert.match(html,/Source: Evidence/);assert.doesNotMatch(html,/SECRET/);assert.match(html,/place unverified/);
 assert.equal(content.mapsURL({label:'SECRET',visibility:'private'}),'');
 assert.equal(content.placeVerified({label:'Venue',mapsUrl:'https://google.com/not-a-map',sourceUrl:'https://official.example/',verification:'verified'}),false);
 assert.equal(content.url('https://user:password@example.test/'),'');
 assert.doesNotMatch(content.details({id:'<script>',projects:['<img>'],media:[]}),/<script>|<img>/);
});
