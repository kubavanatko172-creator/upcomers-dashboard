import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Script from './pages/Script'
import Team from './pages/Team'
import CallLog from './pages/CallLog'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')
  const tabs = [
    { id:'dashboard', label:'Dashboard' },
    { id:'script', label:'Sales Script' },
    { id:'team', label:'Tym' },
    { id:'calllog', label:'Call Log' },
  ]
  return (
    <div style={{minHeight:'100vh',background:'var(--bg)'}}>
      <nav style={{background:'var(--bg2)',borderBottom:'1px solid var(--border2)',padding:'0 28px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14,color:'#000'}}>U</div>
          <span style={{fontWeight:700,fontSize:15}}>Upcomers<span style={{color:'var(--green)'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:4}}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setPage(t.id)} style={{padding:'6px 16px',borderRadius:8,border:'none',fontSize:13,fontWeight:500,background:page===t.id?'rgba(0,229,160,0.1)':'transparent',color:page===t.id?'var(--green)':'var(--text2)'}}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text2)'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 8px #00E5A0'}}/>Live
          </div>
          <div style={{fontSize:11,fontWeight:600,background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:6,padding:'4px 10px',color:'var(--text2)'}}>Sales navrh</div>
        </div>
      </nav>
      <main style={{padding:'28px'}}>
        {page==='dashboard' && <Dashboard/>}
        {page==='script' && <Script/>}
        {page==='team' && <Team/>}
        {page==='calllog' && <CallLog/>}
      </main>
    </div>
  )
}
export default App
