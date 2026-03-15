import { useState } from 'react'

const DATA = [
  {id:1,name:"Martin Svoboda",co:"TradeGroup s.r.o.",seg:"Firma/instituce",email:"m.svoboda@tradegroup.cz",tel:"+420 602 333 444",zeme:"CZ",vek:42,prod:"Partnership",pot:"Velka ryba",score:10,stat:"Nabidka",rev:"Velmi vysoky",zkus:"10+ let",zdroj:"LinkedIn",fu:"2025-03-15",note:"CEO firmy TradeGroup, tym 5 traderu. Ceka na finalni podminky."},
  {id:2,name:"David Chen",co:"Alpha Capital Ltd",seg:"Firma/instituce",email:"d.chen@alphacap.hk",tel:"+852 9876 5432",zeme:"HK",vek:45,prod:"Partnership",pot:"Velka ryba",score:9,stat:"Zajem",rev:"Velmi vysoky",zkus:"15+ let",zdroj:"Cold email",fu:"2025-03-14",note:"Institucionalní klient z HK. Bulk funded accounts. Mozne NDA."},
  {id:3,name:"Jan Novak",co:"—",seg:"Retail trader",email:"jan.novak@gmail.com",tel:"+420 777 111 222",zeme:"CZ",vek:28,prod:"Funded Account",pot:"Velka ryba",score:9,stat:"Zajem",rev:"Stredni",zkus:"2 roky",zdroj:"Web",fu:"2025-03-16",note:"Aktivni forex trader, chce vetsi kapital bez vlastniho rizika."},
  {id:4,name:"Pavel Horak",co:"FX Advisory",seg:"Broker/poradce",email:"p.horak@fxadvisory.cz",tel:"+420 606 444 555",zeme:"CZ",vek:38,prod:"Reseller",pot:"Velka ryba",score:8,stat:"Nabidka",rev:"Pot. velmi vysoky",zkus:"8 let",zdroj:"Doporuceni",fu:"2025-03-13",note:"Broker s 200+ klienty. Klicovy partner pro skaloavni."},
  {id:5,name:"Sofia Kowalski",co:"—",seg:"Retail trader",email:"sofia.k@wp.pl",tel:"+48 512 987 654",zeme:"PL",vek:31,prod:"Funded Account",pot:"Stredni",score:7,stat:"Lead",rev:"Stredni",zkus:"3 roky",zdroj:"Instagram",fu:"2025-03-18",note:"Hleda alternativu k FTMO. Cena je klicovy faktor."},
  {id:6,name:"Emma Rossi",co:"—",seg:"Retail trader",email:"emma.r@libero.it",tel:"+39 333 112 2334",zeme:"IT",vek:27,prod:"Evaluation",pot:"Stredni",score:6,stat:"Kontaktovan",rev:"Nizky",zkus:"1 rok",zdroj:"Web",fu:"2025-03-17",note:"Novacek v prop firmach. Potrebuje EN materialy."},
  {id:7,name:"Lukas Muller",co:"—",seg:"Retail trader",email:"lukas.m@email.de",tel:"+49 151 5566 778",zeme:"DE",vek:24,prod:"Evaluation",pot:"Stredni",score:6,stat:"Kontaktovan",rev:"Nizky",zkus:"<1 rok",zdroj:"Cold call",fu:"2025-03-17",note:"Zacatecnik, nadseny. Edukovat o prop firmach."},
  {id:8,name:"Tomas Blaha",co:"—",seg:"Retail trader",email:"tomas.blaha@seznam.cz",tel:"+420 731 222 333",zeme:"SK",vek:35,prod:"Funded Account",pot:"Maly",score:4,stat:"Lead",rev:"Nizky",zkus:"Neznamo",zdroj:"Web",fu:"2025-03-20",note:"Pasivni zajem. Pridat do newsletteru."},
]

const potStyle = {
  "Velka ryba":{bg:"rgba(0,229,160,0.15)",color:"#00E5A0",border:"rgba(0,229,160,0.3)"},
  "Stredni":{bg:"rgba(255,176,32,0.15)",color:"#FFB020",border:"rgba(255,176,32,0.3)"},
  "Maly":{bg:"rgba(255,77,106,0.15)",color:"#FF4D6A",border:"rgba(255,77,106,0.3)"},
}
const statStyle = {
  "Lead":{bg:"rgba(255,255,255,0.05)",color:"#454D63"},
  "Kontaktovan":{bg:"rgba(61,142,255,0.15)",color:"#3D8EFF"},
  "Zajem":{bg:"rgba(255,176,32,0.15)",color:"#FFB020"},
  "Nabidka":{bg:"rgba(123,92,255,0.15)",color:"#7B5CFF"},
  "Uzavreno":{bg:"rgba(0,229,160,0.15)",color:"#00E5A0"},
  "Odmitl":{bg:"rgba(255,77,106,0.15)",color:"#FF4D6A"},
}
const potOrd = {"Velka ryba":0,"Stredni":1,"Maly":2}
const scoreColor = s => s>=8?"#00E5A0":s>=5?"#FFB020":"#FF4D6A"

function Badge({label,style}){
  return <span style={{display:"inline-block",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:5,background:style.bg,color:style.color,border:`1px solid ${style.border||style.bg}`,whiteSpace:"nowrap"}}>{label}</span>
}

function Modal({d,onClose}){
  if(!d) return null
  const ps = potStyle[d.pot]||potStyle["Maly"]
  const ss = statStyle[d.stat]||statStyle["Lead"]
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:16,width:500,maxWidth:"95vw",maxHeight:"88vh",overflowY:"auto"}}>
        <div style={{background:"var(--bg3)",borderBottom:"1px solid var(--border)",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"16px 16px 0 0"}}>
          <span style={{fontSize:13,fontWeight:600}}>Detail zakaznika</span>
          <button onClick={onClose} style={{background:"var(--bg4)",border:"1px solid var(--border2)",borderRadius:6,width:28,height:28,color:"var(--text2)",fontSize:14}}>X</button>
        </div>
        <div style={{padding:20}}>
          <div style={{display:"flex",gap:14,marginBottom:18}}>
            <div style={{width:48,height:48,borderRadius:10,background:"rgba(0,229,160,0.1)",border:"1px solid rgba(0,229,160,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"var(--green)",flexShrink:0}}>
              {d.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
            </div>
            <div>
              <div style={{fontSize:17,fontWeight:700}}>{d.name}</div>
              <div style={{fontSize:12,color:"var(--text2)",margin:"3px 0 8px"}}>{d.co!=="—"?d.co+" - ":""}{d.seg} - {d.zeme} - {d.vek} let</div>
              <div style={{display:"flex",gap:6}}><Badge label={d.pot} style={ps}/><Badge label={d.stat} style={ss}/></div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {[["Email",d.email],["Telefon",d.tel],["Produkt",d.prod],["Score",d.score+" / 10"],["Revenue",d.rev],["Zkusenosti",d.zkus],["Zdroj",d.zdroj],["Follow-up",d.fu]].map(([l,v])=>(
              <div key={l} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 13px"}}>
                <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>{l}</div>
                <div style={{fontSize:12,fontWeight:500,color:l==="Score"?scoreColor(d.score):l==="Follow-up"?"var(--amber)":"var(--text)"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Poznamky</div>
          <div style={{background:"var(--bg3)",borderLeft:"2px solid var(--green)",borderRadius:8,padding:"13px 15px",fontSize:13,color:"var(--text2)",lineHeight:1.7,marginBottom:18}}>{d.note}</div>
          <button onClick={onClose} style={{padding:"9px 20px",background:"var(--green)",color:"#000",border:"none",borderRadius:8,fontWeight:700,fontSize:13}}>Zavrit</button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard(){
  const [search,setSearch]=useState("")
  const [fPot,setFPot]=useState("")
  const [fStat,setFStat]=useState("")
  const [fSeg,setFSeg]=useState("")
  const [sortK,setSortK]=useState("pot")
  const [sortD,setSortD]=useState(1)
  const [selected,setSelected]=useState(null)

  const filtered=DATA.filter(d=>
    (!search||[d.name,d.email,d.co,d.zeme].some(v=>v.toLowerCase().includes(search.toLowerCase())))&&
    (!fPot||d.pot===fPot)&&(!fStat||d.stat===fStat)&&(!fSeg||d.seg===fSeg)
  ).sort((a,b)=>{
    if(sortK==="pot") return sortD*(potOrd[a.pot]-potOrd[b.pot])
    if(sortK==="score") return sortD*(b.score-a.score)
    if(sortK==="fu") return sortD*a.fu.localeCompare(b.fu)
    return sortD*a.name.localeCompare(b.name)
  })

  const total=DATA.length
  const velke=DATA.filter(d=>d.pot==="Velka ryba").length
  const aktivni=DATA.filter(d=>["Zajem","Nabidka"].includes(d.stat)).length
  const avgScore=(DATA.reduce((s,d)=>s+d.score,0)/total).toFixed(1)

  const kpis=[
    {v:total,l:"Kontaktu",s:"celkem v CRM",c:"#3D8EFF"},
  {v:velke,l:"Velke ryby",s:Math.round(velke/total*100)+"% z celku",c:"#00E5A0"},
  {v:aktivni,l:"Aktivni zajem",s:"zajem + nabidka",c:"#7B5CFF"},
  {v:0,l:"Uzavreno",s:"finalni dealy",c:"#00E5A0"},
  {v:"$0",l:"Revenue dnes",s:"uzavrene dnes",c:"#00E5A0"},
  {v:"$0",l:"Revenue tyden",s:"tento tyden",c:"#FFB020"},
  {v:(DATA.reduce((s,d)=>s+d.score,0)/total).toFixed(1),l:"Avg. score",s:"z 10 bodu",c:"#FFB020"},
  {v:0,l:"Follow-up dnes",s:"zadne dnes",c:"#454D63"},
]

  const srt=k=>{if(sortK===k)setSortD(d=>d*-1);else{setSortK(k);setSortD(1)}}
  const arr=k=>sortK===k?(sortD===1?" v":" ^"):""
  const sel={background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:8,padding:"7px 12px",color:"var(--text2)",fontSize:13,outline:"none"}

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"-.4px"}}>Sales prehled</h1>
          <p style={{fontSize:13,color:"var(--text2)",marginTop:3}}>Funded accounts - Serazeno od nejvetsiho potencialu</p>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hledat zakaznika..." style={{...sel,width:210}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {kpis.map((k,i)=>(
          <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,padding:"16px 18px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:k.c,borderRadius:"12px 12px 0 0"}}/>
            <div style={{fontSize:30,fontWeight:700,color:k.c,letterSpacing:"-.8px",marginBottom:5}}>{k.v}</div>
            <div style={{fontSize:10,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:".07em"}}>{k.l}</div>
            <div style={{fontSize:10,color:"var(--text3)",marginTop:3}}>{k.s}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".07em"}}>Filtr</span>
        <select value={fPot} onChange={e=>setFPot(e.target.value)} style={sel}>
          <option value="">Potencial: vse</option>
          <option value="Velka ryba">Velka ryba</option>
          <option value="Stredni">Stredni</option>
          <option value="Maly">Maly</option>
        </select>
        <select value={fStat} onChange={e=>setFStat(e.target.value)} style={sel}>
          <option value="">Status: vse</option>
          <option value="Lead">Lead</option>
          <option value="Kontaktovan">Kontaktovan</option>
          <option value="Zajem">Zajem</option>
          <option value="Nabidka">Nabidka</option>
          <option value="Uzavreno">Uzavreno</option>
          <option value="Odmitl">Odmitl</option>
        </select>
        <select value={fSeg} onChange={e=>setFSeg(e.target.value)} style={sel}>
          <option value="">Segment: vse</option>
          <option value="Retail trader">Retail trader</option>
          <option value="Firma/instituce">Firma/instituce</option>
          <option value="Broker/poradce">Broker/poradce</option>
        </select>
      </div>

      <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",tableLayout:"fixed"}}>
          <thead>
            <tr style={{background:"var(--bg3)",borderBottom:"1px solid var(--border2)"}}>
              {[["Zakaznik","name","22%"],["Potencial","pot","12%"],["Score","score","7%"],["Segment",null,"13%"],["Zeme",null,"6%"],["Vek",null,"6%"],["Produkt",null,"12%"],["Status",null,"11%"],["Follow-up","fu","11%"]].map(([l,k,w])=>(
                <th key={l} onClick={k?()=>srt(k):undefined} style={{padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".08em",width:w,cursor:k?"pointer":"default",userSelect:"none",whiteSpace:"nowrap"}}>
                  {l}{k?arr(k):""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d,i)=>{
              const ps=potStyle[d.pot]||potStyle["Maly"]
              const ss=statStyle[d.stat]||statStyle["Lead"]
              return (
                <tr key={d.id} onClick={()=>setSelected(d)} style={{borderBottom:"1px solid var(--border)",cursor:"pointer",background:i%2===0?"var(--bg2)":"var(--bg3)"}}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg4)"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"var(--bg2)":"var(--bg3)"}
                >
                  <td style={{padding:"12px 14px"}}><div style={{fontWeight:600,fontSize:13}}>{d.name}</div><div style={{fontSize:11,color:"var(--text3)",marginTop:1}}>{d.co!=="—"?d.co:d.email}</div></td>
                  <td style={{padding:"12px 14px"}}><Badge label={d.pot} style={ps}/></td>
                  <td style={{padding:"12px 14px",fontWeight:700,fontSize:13,color:scoreColor(d.score),fontFamily:"monospace"}}>{d.score}</td>
                  <td style={{padding:"12px 14px",fontSize:12,color:"var(--text2)"}}>{d.seg}</td>
                  <td style={{padding:"12px 14px",fontWeight:700,fontSize:12,fontFamily:"monospace"}}>{d.zeme}</td>
                  <td style={{padding:"12px 14px",color:"var(--text2)"}}>{d.vek}</td>
                  <td style={{padding:"12px 14px",fontSize:12,color:"var(--text2)"}}>{d.prod}</td>
                  <td style={{padding:"12px 14px"}}><Badge label={d.stat} style={ss}/></td>
                  <td style={{padding:"12px 14px",fontSize:11,color:"var(--text3)",fontFamily:"monospace"}}>{d.fu}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{fontSize:11,color:"var(--text3)",marginTop:8,fontFamily:"monospace"}}>// {filtered.length} zakazniku - klikni na radek pro detail</div>
      <Modal d={selected} onClose={()=>setSelected(null)}/>
    </div>
  )
}
