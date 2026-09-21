import * as React from "react"
import { Link } from "gatsby"

import logo from "../images/sep-logo-transparent.png"
import bucks from "../images/bucks.png"
import chester from "../images/chester.png"
import delaware from "../images/delaware.png"
import montgomery from "../images/montgomery.png"

const Header = () => (
  <header className="site-header font-acumin">
    <div className="mx-auto flex h-[210px] w-[calc(100%-2rem)] max-w-[1240px] gap-6 lg:gap-10">
      <Link className="block w-[46%] shrink-0" to="/">
        <div className="flex h-[280px] items-end justify-center rounded-b-[40px] border-x border-[#8fa9c2] bg-gradient-to-b from-[#a8bfd6] via-[#f4f7fa] via-55% to-white px-6 pb-6 shadow-[0_8px_8px_-4px_rgba(24,57,82,0.55)] max-[720px]:h-[254px] sm:px-8 lg:px-10">
          <img
            className="h-auto w-full"
            src={logo}
            alt="Sustainable Energy Partnership of Southeast PA"
          />
        </div>
      </Link>
      <div className="mt-auto flex min-w-0 flex-1 translate-y-4 items-center justify-between gap-4 md:translate-y-8">
        <a
          className="w-[19%] max-w-[125px]"
          href="https://www.buckscounty.gov/"
        >
          <img className="h-auto w-full" src={bucks} alt="Bucks County Seal." />
        </a>
        <a className="w-[19%] max-w-[125px]" href="https://www.chesco.org/">
          <img
            className="h-auto w-full"
            src={chester}
            alt="Chester County Seal."
          />
        </a>
        <a className="w-[19%] max-w-[125px]" href="https://www.delcopa.gov/">
          <img
            className="h-auto w-full"
            src={delaware}
            alt="Delaware County Seal."
          />
        </a>
        <a
          className="w-[19%] max-w-[125px]"
          href="https://www.montgomerycountypa.gov/"
        >
          <img
            className="h-auto w-full"
            src={montgomery}
            alt="Montgomery County Seal."
          />
        </a>
      </div>
    </div>
  </header>
)

export default Header
