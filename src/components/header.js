import * as React from "react"
import { Link } from "gatsby"

import logo from "../images/logo.png"
import bucks from "../images/bucks.png"
import chester from "../images/chester.png"
import delaware from "../images/delaware.png"
import montgomery from "../images/montgomery.png"

const Header = () => (
  <header className="site-header font-acumin">
    <div className="mx-auto flex h-[210px] w-[calc(100%-2rem)] max-w-[1240px] gap-6 lg:gap-10">
      <Link className="block w-[46%] shrink-0" to="/">
        <div className="flex h-[280px] items-end justify-center rounded-b-[40px] border-x border-[#8fa9c2] bg-gradient-to-b from-[#a8bfd6] via-[#f4f7fa] via-55% to-white px-6 pb-6 shadow-[0_8px_8px_-4px_rgba(24,57,82,0.55)] max-[720px]:h-[254px] sm:px-8 lg:px-10">
          <div className="flex h-[100px] w-full items-center justify-center gap-4 sm:gap-6 lg:h-[125px]">
            <img className="h-full w-auto" src={logo} alt="" />
            <span className="block origin-left scale-y-125">
              <h1 className="m-0 text-xl font-bold !leading-none tracking-[-0.04em] text-[#2479b9] sm:text-3xl lg:text-4xl">
                SUSTAINABLE
              </h1>
              <h1 className="m-0 whitespace-nowrap text-xl font-bold !leading-none tracking-[-0.04em] text-[#2479b9] sm:text-3xl lg:text-4xl">
                ENERGY PARTNERSHIP
              </h1>
              <h2 className="m-0 text-base font-normal !leading-none tracking-[0.015em] text-[#2479b9] sm:text-xl lg:text-2xl">
                OF SOUTHEAST PA
              </h2>
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-auto flex min-w-0 flex-1 translate-y-4 items-center justify-between gap-4 md:translate-y-8">
        <img className="h-auto w-[19%] max-w-[125px]" src={bucks} alt="" />
        <img className="h-auto w-[19%] max-w-[125px]" src={chester} alt="" />
        <img className="h-auto w-[19%] max-w-[125px]" src={delaware} alt="" />
        <img className="h-auto w-[19%] max-w-[125px]" src={montgomery} alt="" />
      </div>
    </div>
  </header>
)

export default Header
