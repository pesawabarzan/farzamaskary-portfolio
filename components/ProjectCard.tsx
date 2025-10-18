import NeonCard from "./NeonCard";
export default function ProjectCard({title, desc, tags, year}:{title:string,desc:string,tags:string[],year:string}){
  return (
    <NeonCard>
      <header className="flex items-center justify-between"><h4 className="font-semibold">{title}</h4><span className="text-xs text-slate-400">{year}</span></header>
      <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-black/40 border border-white/10">{t}</span>)}
      </div>
    </NeonCard>
  )
}