import React, { useEffect, useRef } from 'react'
import Boy from './components/Boy'

export default function App(){
  const canvasRef = useRef(null)
  const starsRef = useRef(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    function resize(){
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let particles = []

    function firework(){
      let x = Math.random() * canvas.width
      let y = Math.random() * canvas.height / 2
      for(let i=0;i<140;i++){
        let angle = Math.random() * Math.PI * 2
        let speed = Math.random() * 6 + 2
        particles.push({
          x, y,
          vx: Math.cos(angle)*speed,
          vy: Math.sin(angle)*speed,
          life: 100
        })
      }
    }

    const interval = setInterval(firework, 1200)

    let animationId
    function animate(){
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0,0,canvas.width,canvas.height)

      for(let i = particles.length - 1; i >= 0; i--){
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.life--

        ctx.fillStyle = `hsla(${Math.random()*360},100%,60%,${p.life/100})`
        ctx.beginPath()
        ctx.arc(p.x,p.y,2,0,Math.PI*2)
        ctx.fill()

        if(p.life <= 0) particles.splice(i,1)
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return ()=>{
      clearInterval(interval)
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  },[])

  useEffect(()=>{
    const stars = starsRef.current
    if(!stars) return
    stars.innerHTML = ''
    for(let i=0;i<220;i++){
      const s = document.createElement('div')
      s.style.position = 'absolute'
      const size = Math.random()*3 + 1
      s.style.width = s.style.height = size + 'px'
      s.style.background = 'white'
      s.style.borderRadius = '50%'
      s.style.left = Math.random()*100 + '%'
      s.style.top = Math.random()*100 + '%'
      s.style.animation = `twinkle ${Math.random()*3+2}s infinite alternate`
      stars.appendChild(s)
    }
  },[])

  return (
    <>
      <canvas id="fireworks" ref={canvasRef}></canvas>
      <div className="stars" id="stars" ref={starsRef}></div>

      <div className="container">
        <div className="title">Happy New Year</div>
        <div className="year-container">
          <Boy />
          <div className="year-old">2025</div>
          <div className="year-new">2026</div>
        </div>
        <p>✨🎆 Welcome 2026 with new dreams, new beginnings, and endless possibilities for everyone ✨🎆</p>
      </div>
    </>
  )
}
