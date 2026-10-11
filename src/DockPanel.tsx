import {useRef,type ReactNode} from 'react'
import {PanelLeftClose,PanelLeftOpen,PanelRightClose,PanelRightOpen} from 'lucide-react'
type Props={side:'left'|'right';title:string;collapsed:boolean;width:number;onToggle:()=>void;onResize:(width:number)=>void;children:ReactNode}
export default function DockPanel({side,title,collapsed,width,onToggle,onResize,children}:Props){
 const resizing=useRef<{x:number;width:number}|null>(null),min=side==='left'?220:240,max=side==='left'?420:500
 const resize=(next:number)=>onResize(Math.max(min,Math.min(max,next)))
 const Icon=side==='left'?(collapsed?PanelLeftOpen:PanelLeftClose):(collapsed?PanelRightOpen:PanelRightClose)
 return <aside className={`dock-panel ${side==='left'?'area-sidebar':'inspector'} ${collapsed?'collapsed':''}`} aria-label={title}>
  <div className="dock-heading"><h2>{title}</h2><button aria-label={`${title}を${collapsed?'展開':'最小化'}`} title={`${title}を${collapsed?'展開':'最小化'}`} aria-expanded={!collapsed} onClick={onToggle}><Icon size={17}/></button></div>
  {collapsed&&<button className="dock-tab" aria-label={`${title}を開く`} onClick={onToggle}>{title}</button>}
  <div className="dock-content" hidden={collapsed}>{children}</div>
  {!collapsed&&<div className={`panel-resizer ${side}`} role="separator" tabIndex={0} aria-label={`${title}の幅`} aria-orientation="vertical" aria-valuenow={width} aria-valuemin={min} aria-valuemax={max}
   onPointerDown={e=>{if(e.button!==0)return;e.preventDefault();resizing.current={x:e.clientX,width};e.currentTarget.setPointerCapture(e.pointerId)}}
   onPointerMove={e=>{if(resizing.current)resize(resizing.current.width+(e.clientX-resizing.current.x)*(side==='left'?1:-1))}}
   onPointerUp={e=>{resizing.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)}} onPointerCancel={()=>{resizing.current=null}} onLostPointerCapture={()=>{resizing.current=null}}
   onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();resize(e.key==='Home'?min:e.key==='End'?max:width+(e.key==='ArrowRight'?16:-16)*(side==='left'?1:-1))}}}><span/></div>}
 </aside>
}
