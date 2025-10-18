import { ReactNode } from "react";
export default function NeonCard({children, className=""}:{children:ReactNode,className?:string}){
  return (
    <div className={`relative rounded-3xl glass p-6 shadow-neon overflow-hidden ${className}`}>
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-neonPink to-neonCyan blur opacity-20" />
      <div className="relative">{children}</div>
    </div>
  );
}