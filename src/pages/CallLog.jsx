import { useState } from 'react'

const CALLS=[
  {id:1,date:"2025-03-10",emp:"Tereza Horakova",customer:"Jan Novak",channel:"Telefon",duration:12,result:"Zajem o Funded Account potvrzen",interest:"ANO",next:"Poslat podminky",followup:"2025-03-13",note:"Velmi pozitivni, chce jednat rychle"},
  {id:2,date:"2025-03-08",emp:"Ondrej Novak",customer:"Martin Svoboda",channel:"Email",duration:0,result:"Odpovedel, chce zoom call",interest:"ANO",next:"Domluvit 30min zoom",followup:"2025-03-11",note:"CEO firmy, realny zajem"},
  {id:3,date:"2025-03-07",emp:"Tereza Horakova",customer:"David Chen",channel:"Email",duration:0,result:"Poslal dotazy na podminky",interest:"ANO",next:"Odpovedel a NDA",followup:"2025-03-10",note:"Instituce HK, velmi serozni"},
  {id:4,date:"2025-03-09",emp:"Jakub Masek",customer:"Lukas Muller",channel:"WhatsApp",duration:8,result:"Zakladni info poskytnuto",interest:"MOZNA",next:"Poslat EN prehled",followup:"2025-03-14",note:"Novacek, potrebuje vysvetlit"},
  {id:5,date:"2025-03-06",emp:"Ondrej Novak",customer:"Pavel Horak",channel:"Telefon",duration:20,result:"Zajem o reseller program",interest:"ANO",next:"Reseller podminky",followup:"2025-03-13",note:"Broker 200+ klientu"},
  {id:6,date:"2025-03-11",emp:"Simona Vlckova",customer:"Sofia Kowalski",channel:"Email",duration:0,result:"Prectela, nezodpovedela",interest:"MOZNA",next:"Follow-up email",followup:"2025-03-15",note:"Poslat srovnani s FTMO"},
  {id:7,date:"2025-03-12",emp:"Simona Vlckova",customer:"Tomas Blaha",channel:"Telefon",duration:5,result:"Pasivni zajem",interest:"NE",next:"Newsletter sekvence",followup:"2025-03-26",note:"Vratit se za 2 tydny"},
  {id:8,date:"2025-03-10",emp:"Jakub Masek",customer:"Emma Rossi",channel:"WhatsApp",duration:6,result:"Zajem, chce EN materialy",interest:"MOZNA",next:"Poslat EN onboarding",followup:"2025-03-17",note:"Novacek, EN support"},
]

const empColors={"Tereza Horakova":"#00E5A0","Ondrej Novak":"#3D8EFF","Jakub Masek":"#7B5CFF","Simona Vlckova":"#FFB020","Martin Polak":"#454D63"}
const intStyle={"ANO":{bg:"rgba(0,229,160,0.15)",color:"#00E5A0"},"MOZNA":{bg:"rgba(255,176,32,0.15)",color:"#FFB020"},"NE":{bg:"rgba(255,77,106,0.15)",color:"#FF4D6A"}}
const chanIcon={"Telefon":"T","Email":"E","WhatsApp":"W","LinkedIn":"L","Zoom":"Z"}

export default function CallLog(){
  const [fEmp,setFEmp]=useState("")
  const [fInt,setFInt]=useState("")
  const [search,setSearch]=useState("")

  const filtered=CALLS.filter(c=>
    (!fEmp||c.emp===fEmp)&&
    (!fInt||c.interest===fInt)&&
    (!search||[c.customer,c.emp,c.result].some(v=>v.toLowerCase().includes(search.toLowerCase())))
  )

  const sel={background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:8,padding:"7px 12px",color:"var(--text2)",fontSize:13,outline:"none"}
  const emps=[...new Set(CALLS.map(c=>c.emp))]

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"-.4px"}}>Call Log</h1>
          <p style={{fontSize:13,color:"var(--text2)",marginTop:3}}>Zaznamy vsech hovoru - kdo kontaktoval koho</p>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hledat..." style={{...sel,width:200}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {[
          {v:CALLS.length,l:"Celkem hovoru",c:"#3D8EFF"},
          {v:CALLS.filter(c=>c.interest==="ANO").length,l:"Zajem ANO",c:"#00E5A0"},
          {v:CALLS.filter(c=>c.interest==="MOZNA").length,l:"Zajem MOZNA",c:"#FFB020"},
          {v:CALLS.reduce((s,c)=>s+c.duration,0),l:"Minut celkem",c:"#7B5CFF"},
        ].map((k,i)=>(
          <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,padding:"16px 18px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:k.c}}/>
            <div style={{fontSize:28,fontWeight:700,color:k.c,fontFamily:"monospace",marginBottom:4}}>{k.v}</div>
            <div style={{fontSize:10,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:".07em"}}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".07em"}}>Filtr</span>
        <select value={fEmp} onChange={e=>setFEmp(e.target.value)} style={sel}>
          <option value="">Zamestnanec: vse</option>
          {emps.map(e=><option key={e}>{e}</option>)}
        </select>
        <select value={fInt} onChange={e=>setFInt(e.target.value)} style={sel}>
          <option value="">Zajem: vse</option>
          <option value="ANO">ANO</option>
          <option value="MOZNA">MOZNA</option>
          <option value="NE">NE</option>
        </select>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map((c,i)=>{
          const ec=empColors[c.emp]||"#454D63"
          const is=intStyle[c.interest]||intStyle["NE"]
          return (
            <div key={c.id} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,padding:"16px 20px",display:"grid",gridTemplateColumns:"60px 1fr auto",gap:16,alignItems:"center"}}>
              <div style={{textAlign:"center"}}>
                <div style={{width:36,height:36,borderRadius:8,background:"var(--bg3)",border:"1px solid var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"var(--text2)",margin:"0 auto"}}>{chanIcon[c.channel]||"?"}</div>
                <div style={{fontSize:10,color:"var(--text3)",fontFamily:"monospace",marginTop:4}}>{c.date.slice(5)}</div>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:5,background:ec+"20",color:ec,border:"1px solid "+ec+"40"}}>{c.emp}</span>
                  <span style={{fontSize:12,color:"var(--text2)"}}>to</span>
                  <span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{c.customer}</span>
                  {c.duration>0&&<span style={{fontSize:11,color:"var(--text3)"}}>{c.duration} min</span>}
                </div>
                <div style={{fontSize:13,color:"var(--text2)",marginBottom:4}}>{c.result}</div>
                <div style={{fontSize:12,color:"var(--text3)"}}>Next: <span style={{color:"var(--text2)"}}>{c.next}</span> <span style={{marginLeft:12}}>Follow-up: <span style={{color:"var(--amber)",fontFamily:"monospace"}}>{c.followup}</span></span></div>
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6,background:is.bg,color:is.color}}>{c.interest}</span>
                {c.note&&<div style={{fontSize:11,color:"var(--text3)",marginTop:6,maxWidth:140,textAlign:"right",fontStyle:"italic"}}>{c.note}</div>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{fontSize:11,color:"var(--text3)",marginTop:10,fontFamily:"monospace"}}>// {filtered.length} zaznamu</div>
    </div>
  )
}
