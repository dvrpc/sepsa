import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import Seo from "../../../components/seo"

const getAgendaId = () => {
  if (typeof window === "undefined") return null
  const segments = window.location.pathname.split("/").filter(Boolean)
  const agendaIndex = segments.indexOf("agenda")
  return agendaIndex >= 0 ? segments[agendaIndex + 1] || null : null
}

const parseMeetingDate = dateString => {
  if (!dateString) return null
  const [year, month, day] = dateString.slice(0, 10).split("-").map(Number)
  return new Date(year, month - 1, day)
}

const AgendaPage = () => {
  const [agendaState, setAgendaState] = useState({
    loaded: false,
    data: null,
    error: null,
  })

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const agendaId = getAgendaId()
        if (!agendaId) {
          setAgendaState({
            loaded: true,
            data: null,
            error: "No agenda ID found in URL",
          })
          return
        }

        const response = await fetch(
          `https://apis.dvrpc.org/ords/dvrpcagenda/agendas/agenda?id=${agendaId}`
        )
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        setAgendaState({ loaded: true, data, error: null })
      } catch (error) {
        setAgendaState({ loaded: true, data: null, error: error.message })
      }
    }

    fetchAgenda()
  }, [])

  if (
    !agendaState.loaded ||
    agendaState.error ||
    !agendaState.data?.items?.[0]
  ) {
    const message = !agendaState.loaded
      ? "Loading..."
      : agendaState.error
      ? `Error: ${agendaState.error}`
      : "No agenda found."

    return (
      <Layout>
        <article className="content-copy">
          <h1 className="page-title">Agenda</h1>
          <p>{message}</p>
        </article>
      </Layout>
    )
  }

  const meeting = agendaState.data.items[0]
  const meetingDate = parseMeetingDate(meeting.meetingdate)
  const registrationTime = meeting.meetingdatetime
    ? new Date(meeting.meetingdatetime)
    : null
  registrationTime?.setHours(registrationTime.getHours() + 2)
  const now = new Date()
  const isMeetingDay =
    registrationTime?.toLocaleDateString() === now.toLocaleDateString()
  const agendaHtml = meeting.meetingdetail?.replace(/(?:&nbsp;|\u00a0)+/gi, " ")

  return (
    <Layout>
      <article className="content-copy agenda-page">
        <Link className="eyebrow" to="/">
          &lsaquo; Home
        </Link>
        <h1 className="page-title">
          Agenda
          {meetingDate &&
            `: ${meetingDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}
        </h1>

        <h2>Meeting Details</h2>
        <p className="agenda-meeting-date">
          <strong>
            {meetingDate?.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {meetingDate && meeting.meetingtime ? ", " : ""}
            {meeting.meetingtime}
          </strong>
        </p>

        <div className="agenda-actions">
          {registrationTime > now && meeting.note3 && !isMeetingDay && (
            <a href={meeting.note3} className="agenda-action">
              Register Now
            </a>
          )}
          {isMeetingDay && meeting.note3 && (
            <a href={meeting.note3} className="agenda-action">
              Join Meeting
            </a>
          )}
          {meeting.note2 && (
            <a href={meeting.note2} className="agenda-action">
              Watch Recording
            </a>
          )}
        </div>

        {meeting.note1 && <p>{meeting.note1}</p>}

        {(meeting.locationname ||
          meeting.address1 ||
          meeting.address2 ||
          meeting.city ||
          meeting.state) && (
          <address className="meeting-address">
            {meeting.locationname && <span>{meeting.locationname}</span>}
            {meeting.address1 && <span>{meeting.address1}</span>}
            {meeting.address2 && <span>{meeting.address2}</span>}
            {(meeting.city || meeting.state) && (
              <span>
                {meeting.city}
                {meeting.city && meeting.state ? ", " : ""}
                {meeting.state}
              </span>
            )}
          </address>
        )}

        {(meeting.locationnote1 || meeting.locationnote2) && (
          <p>
            {meeting.locationnote1}
            {meeting.locationnote1 && meeting.locationnote2 && <br />}
            {meeting.locationnote2}
          </p>
        )}

        {agendaHtml && (
          <>
            <h2>Agenda</h2>
            <div
              className="agenda-details"
              dangerouslySetInnerHTML={{ __html: agendaHtml }}
            />
          </>
        )}
      </article>
    </Layout>
  )
}

export const Head = () => <Seo title="Agenda" />

export default AgendaPage
