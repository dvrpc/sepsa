import * as React from "react"

import Committee from "../components/committee"
import Layout from "../components/layout"
import Seo from "../components/seo"
import memorandumOfUnderstanding from "../pdf/memorandumofunderstanding.pdf"
import electricityPlan from "../pdf/electriccostmgmtandprocplan.pdf"
import operatingProcedures from "../pdf/programoperatingprocedures.pdf"
import renewableEnergyStrategy from "../pdf/renewableenergystrategy.pdf"
import newMemberQualifications from "../pdf/newmemberqualifications.pdf"

const IndexPage = () => {
  return (
    <Layout>
      <article className="content-copy">
        <h1 className="page-title">The Sustainable Energy Partnership</h1>
        <p>
          The Sustainable Energy Partnership (SEP) has been working together
          since September 2020 to help member governments secure access to
          reliable, low-cost energy prices and purchase renewable energy to
          power county operations in Bucks, Chester, Delaware, and Montgomery
          counties. In October 2023, the four counties adopted a Memorandum of
          Understanding (MOU) establishing an Energy Board to oversee the
          Partnership and advance shared goals:
        </p>
        <ol className="list-decimal ml-8">
          <li>Meet renewable energy targets.</li>
          <li>Lower energy costs and lessen budget risk.</li>
          <li>Grow Pennsylvania's renewable energy resources.</li>
          <li>Institutionalize and plan for ongoing energy procurement.</li>
          <li>Avoid overburdening county resources.</li>
        </ol>
        <p>
          In 2024, SEP established a wholesale electricity portfolio to provide
          member governments with more predictable and stable energy prices. A
          competitively selected supplier manages a dedicated wholesale
          subaccount for all members, building the portfolio over time under a
          consultant’s guidance and according to SEP’s approved cost-management
          strategy for electricity and renewable energy.
        </p>
        <p>
          The portfolio includes fixed-rate blocks of power (typically for 80%
          of load) purchased on the forward market for up to four years in
          advance through a transparent wholesale bid process, with the
          remaining supply from PJM’s hourly-priced market. This strategy allows
          for a consistent billing rate, opportunities to reduce energy usage,
          and flexibility to procure renewable energy.
        </p>
        <p>
          New members can join by invitation of the SEP Board if they meet
          criteria such as load size, credit-worthiness, and alignment with
          renewable energy goals.
        </p>

        <h2 className="font-semibold">Energy Board</h2>
        <ul className="board-list">
          <li>
            <strong>Chairperson:</strong> Devi Ramkissoon, Montgomery County{" "}
            <i>(alternate: Joe Coco)</i>
          </li>
          <li>
            <strong>Bucks County Appointee:</strong> David Bria{" "}
            <i>(alternate: Jeannette Weaver)</i>
          </li>
          <li>
            <strong>Chester County Appointee:</strong> Julie Bookheimer{" "}
            <i>(alternate: Vickie Brown)</i>
          </li>
          <li>
            <strong>Delaware County Appointee:</strong> Steve Goldfield{" "}
            <i>(alternate: Rebecca Yurkovich)</i>
          </li>
          <li>
            <strong>Coordinator:</strong> Liz Compitello, DVRPC
          </li>
          <li>
            <strong>Meeting Frequency: </strong>The Energy Board meets
            quarterly. Agendas will be posted approximately 7 days before a
            meeting. Public comment can be submitted via{" "}
            <a className="underline" href="mailto:SEPSPA@dvrpc.org">
              SEPSPA@dvrpc.org
            </a>
            .
          </li>
        </ul>

        <h2 className="font-semibold">
          Sustainable Energy Partnership of Southeast PA Adopted Guiding
          Documents
        </h2>
        <ol className="list-decimal ml-8">
          <li>
            <a
              className="underline"
              href={memorandumOfUnderstanding}
              target="_blank"
              rel="noopener noreferrer"
            >
              SEP Memorandum of Understanding (PDF)
            </a>
          </li>
          <li>
            <a
              className="underline"
              href={electricityPlan}
              target="_blank"
              rel="noopener noreferrer"
            >
              Electricity Procurement and Management Plan (PDF)
            </a>
          </li>
          <li>
            <a
              className="underline"
              href={operatingProcedures}
              target="_blank"
              rel="noopener noreferrer"
            >
              Program Operating Procedures (PDF)
            </a>
          </li>
          <li>
            <a
              className="underline"
              href={renewableEnergyStrategy}
              target="_blank"
              rel="noopener noreferrer"
            >
              Renewable Energy Strategy (PDF)
            </a>
          </li>
          <li>
            <a
              className="underline"
              href={newMemberQualifications}
              target="_blank"
              rel="noopener noreferrer"
            >
              New Member Qualifications (PDF)
            </a>
          </li>
        </ol>

        <Committee />
      </article>
    </Layout>
  )
}

export const Head = () => <Seo title="Sustainable Energy Partnership" />
export default IndexPage
