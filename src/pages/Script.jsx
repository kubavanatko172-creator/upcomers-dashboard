import { useState } from 'react'

const tabs = [
  {id:'retail-cz',label:'Retail CZ'},
  {id:'retail-en',label:'Retail EN'},
  {id:'b2b-cz',label:'Firma CZ'},
  {id:'b2b-en',label:'Firma EN'},
  {id:'objections',label:'Namitky'},
  {id:'profiles',label:'Typy lidi'},
]

const content = {
  'retail-cz':{sections:[
    {title:"Otevreni",steps:["Predstav se: Dobry den, jmenuji se [jmeno], volam z Upcomers.com - prop trading firmy.","Over osobu: Mluvim s [jmeno]? Mam chvili na kratky rozhovor?","Hacek: Dostali jsme se k vam, protoze se zajimate o trading. Chtel bych vam ukazat, jak obchodovat s kapitalem firmy - bez vlastniho rizika."]},
    {title:"Otazky - zjisti situaci",steps:["Jak dlouho se tradingu venujete?","Obchodujete aktualne s vlastnim kapitalem, nebo hledate jinou cestu?","Co vam v tradingu momentalne dela nejvetsi problem - kapital, strategie, nebo mentalni stranka?","Slyseli jste nekdy o prop firmach? Vite, jak to funguje?"]},
    {title:"Pitch - Funded Account",steps:["Navazuj na jejich problem: Prave to resi nas funded account - obchodujete nas kapital, ne vlastni uspory.","Konkretni cisla: Zacinate od [X]$ - projdete evaluation, pak obchodujete ostro s profit splitem az [X]%.","Duvera: Upcomers.com je transparentni - platime vcas, mame realne vyplaty a komunitu traderu."]},
    {title:"Uzavreni",steps:["Co vam brani to zkusit ted?","Mohu vam poslat presne detaily na email / WhatsApp?","Mam volne misto v dnesni onboarding session - chcete se pripojit?"]},
  ]},
  'retail-en':{sections:[
    {title:"Opening",steps:["Intro: Hi, my name is [name], I am calling from Upcomers.com - a professional prop trading firm.","Confirm: Am I speaking with [name]? Do you have a few minutes?","Hook: We reached out because you are interested in trading. I would love to show you how to trade firm capital with no personal risk."]},
    {title:"Discovery questions",steps:["How long have you been trading?","Are you currently trading with your own capital, or are you looking for another route?","What is your biggest challenge right now - capital, strategy, or the mental side?","Have you heard of prop firms before? Do you know how they work?"]},
    {title:"Pitch - Funded Account",steps:["Match to pain: That is exactly what our funded account solves - you trade our capital, not your savings.","Be specific: You start from [X]$ - pass evaluation, then trade live with up to [X]% profit split.","Build trust: Upcomers.com is a transparent firm - we pay on time and have real payouts."]},
    {title:"Close",steps:["What is stopping you from trying this now?","Can I send you the details to your email or WhatsApp?","I have a spot in today's onboarding session - want to join?"]},
  ]},
  'b2b-cz':{sections:[
    {title:"Otevreni - formalni ton",steps:["Dobry den, jmenuji se [jmeno] z Upcomers.com - poskytujeme prop trading infrastrukturu pro obchodni tymy a instituce.","Sledujeme vas tym a myslim, ze mame reseni, ktere by mohlo pridat vasi firme hodnotu.","Bylo by mozne si domluvit 20minutovy hovor s prislusnou osobou tento tyden?"]},
    {title:"Discovery - otazky pro firmy",steps:["Mate aktualne interni tym traderu, nebo spolupracujete s externimi?","Jak resите pristup k obchodnimu kapitalu - vlastni zdroje, nebo hledate partnera?","Kolik traderu by potencialne vyuzivalo funded accounts?","Jake jsou vase priority - vykon, compliance, nebo skaloavtelnost?"]},
    {title:"Pitch - pro firmy",steps:["Skaloavtelnost: Umime nastavit funded accounts pro cely tym - kazdy trader dostane vlastni ucet s jasnymi pravidly.","Partnerstvi: Pro vetsi spoluprace mame partnersky program - individualni podminky a dedicovana podpora.","ROI logika: Vasi traderi obchoduji nas kapital - vas risk je minimalni, vynosy jdou primo vasemu tymu."]},
    {title:"Uzavreni - B2B",steps:["Ma smysl si domluvit detailni hovor s nasim tymem?","Poslu vam shrnutí a navrh spoluprace - do kdy byste potreboval odpoved?","Kdo by byl na vasi strane rozhodovatel?"]},
  ]},
  'b2b-en':{sections:[
    {title:"Opening - professional tone",steps:["Hello, my name is [name] from Upcomers.com - we provide prop trading infrastructure for trading teams and institutions.","We have been following your team and believe we have a solution that could complement what you are doing.","Would it be possible to schedule a 20-minute call with the right person this week?"]},
    {title:"Discovery questions",steps:["Do you currently have an in-house trading team, or do you work with external traders?","How do you handle access to trading capital - own resources, or are you looking for a partner?","How many traders would potentially use funded accounts?","What are your priorities - performance, compliance, or scalability?"]},
    {title:"Pitch - for companies",steps:["Scalability: We can set up funded accounts for your entire team - each trader gets their own account with clear rules.","Partnership: For larger collaborations we have a partner program - custom terms and dedicated support.","ROI logic: Your traders trade our capital - your risk is minimal, profits go directly to your team."]},
    {title:"Close - B2B",steps:["Does it make sense to schedule a detailed call with our team?","I will send you a summary and partnership proposal - when do you need an answer by?","Who would be the decision maker on your side?"]},
  ]},
  'objections':{sections:[
    {title:"Retail - nejcastejsi namitky",steps:["Nemam cas. --> Rozumim - poslu vam to na WhatsApp, podivate se az budete mit chvili.","Nevim jestli je to pro me. --> To je prave duvod proc se bavime - zjistime to spolecne.","Prop firmy jsou scam. --> Chapu - proto jsme transparentni: ukazu vam realne vyplaty a recenze.","Je to drahe. --> Evaluation fee je zlomek kapitalu, se kterym pak obchodujete.","Potrebuji si to promyslet. --> Co by vam pomohlo v rozhodnutí - mam zodpovedet konkretni otazku?"]},
    {title:"B2B - namitky firem",steps:["Potrebujeme to probrat interně. --> Mohu vam pripravit shrnutí pro interni diskuzi?","Mame uz vlastni reseni. --> Nejsme nahrada, ale doplnek. Kde vas model narazi na limity?","Nevime jestli vam muzeme verit. --> Radi poskytneme reference, vyplaty, pripadne NDA.","Neni to ted priorita. --> Kdy by byl spravny cas se vratit?"]},
  ]},
  'profiles':{sections:[
    {title:"Typy zakazniku - jak komunikovat",steps:["Zacatecnik (18-25): Vysvetli prop firmu od základu. Zduraznit komunitu a nizkou barierú. Zadny slozity zargon.","Profesional (25-40): Prejdi rovnou k podminkam - profit split, drawdown, vyplaty. Ocenuje cisla a transparentnost.","Skeptik: Neptej se proc ne - ptej se co by pomohlo rozhodnutí udelat. Buduj duveru pomalu.","International: Speak slowly. Simple English. Emphasize global payouts. Avoid idioms. Follow up in writing.","Firma/instituce: Formalni ton. Mluv o ROI, skaloavtelnosti, compliance. Cil = domluvit druhy hovor."]},
    {title:"Kanaly - jak komunikovat",steps:["Telefon: Prvni veta do 5 sekund. Mluv prirozene, necti. Vzdy navrhni next step.","Email: Predmet max 6 slov. Max 3 odstavce. Zakoncit jednou otazkou. Follow-up po 2-3 dnech.","WhatsApp: Kratce a pratelsky. Jedna zprava = jedna myslenka. Odkaz posli az po prvni odpovedi."]},
  ]},
}

export default function Script(){
  const [active,setActive]=useState('retail-cz')
  const data=content[active]
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:"-.4px"}}>Sales Script</h1>
        <p style={{fontSize:13,color:"var(--text2)",marginTop:3}}>Retail traders + Firmy/instituce - CZ + EN verze</p>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setActive(t.id)} style={{padding:"7px 16px",borderRadius:8,border:"1px solid",fontSize:13,fontWeight:500,borderColor:active===t.id?"rgba(0,229,160,0.4)":"var(--border2)",background:active===t.id?"rgba(0,229,160,0.1)":"var(--bg2)",color:active===t.id?"var(--green)":"var(--text2)"}}>
            {t.label}
          </button>
        ))}
      </div>
      {data.sections.map((sec,si)=>(
        <div key={si} style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:12,padding:"18px 22px",marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>{sec.title}</div>
          {sec.steps.map((step,i)=>(
            <div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
              <div style={{minWidth:22,height:22,borderRadius:"50%",background:"rgba(0,229,160,0.1)",border:"1px solid rgba(0,229,160,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"var(--green)",flexShrink:0,marginTop:1}}>{i+1}</div>
              <div style={{fontSize:14,color:"var(--text)",lineHeight:1.6}}>{step}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
