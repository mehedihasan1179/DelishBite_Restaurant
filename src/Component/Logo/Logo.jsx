import React from 'react'

const Logo = () => {
  return (
    <div className="transition-transform duration-500 hover:scale-110">
        <span
        className="
            font-black text-3xl lg:text-4xl inline-block
            text-transparent 
            bg-[radial-gradient(circle,var(--logo-color)_0%,var(--logo-color)_100%)]
            bg-no-repeat bg-[length:0%_0%] bg-center 
            [background-clip:text] [-webkit-background-clip:text]
            [text-stroke:1px_var(--logo-color)] [-webkit-text-stroke:1px_var(--logo-color)]
            transition-[background-size,color,transform] duration-500
            hover:bg-[length:100%_100%]
            hover:[text-stroke:1px_var(--primary-hover)] hover:[-webkit-text-stroke:1px_var(--primary-hover)]
            hover:scale-[1.05]
        "
        >
        DelishBite
        </span>
    </div>
  )
}

export default Logo;