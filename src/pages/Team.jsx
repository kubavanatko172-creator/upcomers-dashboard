export default function Team(){
  const team=[
    {name:"Ondrej Novak",role:"Sales Executive",goalCalls:30,actualCalls:27,goalClosed:3,actualClosed:2,note:"Zkuseny, spolehlivy. Push na uzavirani."},
    {name:"Tereza Horakova",role:"Sales Executive",goalCalls:30,actualCalls:31,goalClosed:3,actualClosed:3,note:"Nejlepsi v tymu, konzistentni vykon."},
    {name:"Jakub Masek",role:"Junior Sales",goalCalls:20,actualCalls:14,goalClosed:2,actualClosed:1,note:"Novacek, potrebuje vice coachingu."},
    {name:"Simona Vlckova",role:"Sales Executive",goalCalls:30,actualCalls:22,goalClosed:3,actualClosed:1,note:"Dobra komunikace, nizka konverze."},
    {name:"Martin Polak",role:"Junior Sales",goalCalls:20,actualCalls:11,goalClosed:1,actualClosed:0,note:"Prave nastoupil, onboarding."},
  ]
  const empColors={"Ondrej Novak":"#3D8EFF","Tereza Horakova":"#00E5A0","Jakub Masek":"#7B5CFF","Simona Vlckova":"#FFB020","Martin Polak":"#454D63"}
  const getPerf=(actual,goal)=>{
    const pct=Math.round(actual/goal*100)
    if(pct>=100) return {label:pct+"% Prekorocil",bg:"rgba(0,229,160,0.15)",color:"#00E5A0"}
    if(pct>=80)  return {label:pct+"% Splnil",bg:"rgba(61,142,255,0.15)",color:"#3D8EFF"}
    if(pct>=50)  return {label:pct+"% V procesu",bg:"rgba(255,176,32,0.15)",color:"#FFB020"}
    return             {label:pct+"% Pozor",bg:"rgba(255,77,106,0.15)",color:"#FF4D6A"}
  }
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"-.4px"}}>Tym</h1>
        <p style={{fontSize:13,color:"var(--text2)",marginTop:3}}>Vykon kazdeho clena - Cile vs. skutecnost</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {team.map((m,i)=>{
          const perf=getPerf(m.actualCalls,m.goalCalls)
          const conv=m.actualCalls?Math.round(m.actualClosed/m.actualCalls*100):0
          const ini=m.name.split(" ").map(w=>w[0]).join("")
          const color=empColors[m.name]||"#454D63"
          return (
            <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,padding:"18px 22px",display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
              <div style={{width:46,height:46,borderRadius:10,background:color+"20",border:"1px solid "+color+"40",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color,flexShrink:0,fontFamily:"monospace"}}>{ini}</div>
              <div style={{minWidth:160}}>
                <div style={{fontWeight:700,fontSize:14}}>{m.name}</div>
                <div style={{fontSize:12,color:"var(--text2)",marginTop:2}}>{m.role}</div>
              </div>
              <div style={{display:"flex",gap:12,flex:1,flexWrap:"wrap"}}>
                <div style={{background:"var(--bg3)",borderRadius:8,padding:"10px 14px",minWidth:120}}>
                  <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Hovory</div>
                  <div style={{fontSize:18,fontWeight:700,fontFamily:"monospace",color:"var(--text)"}}>{m.actualCalls}<span style={{fontSize:12,color:"var(--text3)",fontWeight:400}}>/{m.goalCalls}</span></div>
                </div>
                <div style={{background:"var(--bg3)",borderRadius:8,padding:"10px 14px",minWidth:120}}>
                  <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Uzavreno</div>
                  <div style={{fontSize:18,fontWeight:700,fontFamily:"monospace",color:"var(--green)"}}>{m.actualClosed}<span style={{fontSize:12,color:"var(--text3)",fontWeight:400}}>/{m.goalClosed}</span></div>
                </div>
                <div style={{background:"var(--bg3)",borderRadius:8,padding:"10px 14px",minWidth:100}}>
                  <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Konverze</div>
                  <div style={{fontSize:18,fontWeight:700,fontFamily:"monospace",color:"var(--amber)"}}>{conv}%</div>
                </div>
                <div style={{background:perf.bg,borderRadius:8,padding:"10px 14px",minWidth:140,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{fontSize:13,fontWeight:700,color:perf.color}}>{perf.label}</div>
                </div>
              </div>
              <div style={{fontSize:12,color:"var(--text3)",maxWidth:220,fontStyle:"italic"}}>{m.note}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
