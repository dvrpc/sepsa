import * as React from "react"
import { useEffect, useState } from "react"

// API timestamps represent calendar dates, so parse only their date portion.
const parseMeetingDate = dateString => {
  if (!dateString) return null
  const [year, month, day] = dateString.slice(0, 10).split("-").map(Number)
  return new Date(year, month - 1, day)
}

const getCommitteeId = () => "SEP"

const formatDateForUrl = dateString => {
  const date = parseMeetingDate(dateString)
  if (!date) return ""
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

const formatMeetingDate = dateString => {
  const date = parseMeetingDate(dateString)
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const checkUrlExists = async url => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    })
    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeoutId)
  }
}

const getMeetingUrls = meeting => {
  const committeeId = getCommitteeId()
  const date = formatDateForUrl(meeting.meetingdate)

  return {
    highlights: `https://www3.dvrpc.org/asp/committee/committees/${committeeId}/${date}.pdf`,
    presentations: `https://www3.dvrpc.org/asp/committee/committees/${committeeId}/presentations/${date}.pdf`,
    comments:
      committeeId === "BOARD"
        ? `https://www3.dvrpc.org/asp/committee/committees/${committeeId}/comments/${date}.pdf`
        : null,
  }
}

const Committee = () => {
  const [meetingsState, setMeetingsState] = useState({
    loaded: false,
    items: [],
    error: null,
  })
  const [selectedYear, setSelectedYear] = useState("")
  const [validUrls, setValidUrls] = useState(new Set())

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const committeeId = getCommitteeId()
        const startYear = new Date().getFullYear() - 6
        const response = await fetch(
          `https://apis.dvrpc.org/ords/dvrpcagenda/agendas/agenda?committee=${committeeId}&startYear=${startYear}&limit=999`
        )

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        setMeetingsState({ loaded: true, items: data.items || [], error: null })
      } catch (error) {
        setMeetingsState({ loaded: true, items: [], error: error.message })
      }
    }

    fetchMeetings()
  }, [])

  useEffect(() => {
    if (!meetingsState.loaded || meetingsState.items.length === 0) return

    let cancelled = false
    const validateUrls = async () => {
      const urls = new Set()
      meetingsState.items.forEach(meeting => {
        Object.values(getMeetingUrls(meeting)).forEach(url => {
          if (url) urls.add(url)
        })
      })

      const results = await Promise.all(
        [...urls].map(async url => ({ url, exists: await checkUrlExists(url) }))
      )
      if (!cancelled) {
        setValidUrls(
          new Set(
            results.filter(result => result.exists).map(result => result.url)
          )
        )
      }
    }

    validateUrls()
    return () => {
      cancelled = true
    }
  }, [meetingsState.loaded, meetingsState.items])

  const meetingsByYear = meetingsState.items.reduce((groups, meeting) => {
    const year = parseMeetingDate(meeting.meetingdate)?.getFullYear()
    if (!year) return groups
    groups[year] = [...(groups[year] || []), meeting]
    return groups
  }, {})
  const years = Object.keys(meetingsByYear).sort(
    (a, b) => Number(b) - Number(a)
  )
  const effectiveYear = selectedYear || years[0] || ""
  const meetings = [...(meetingsByYear[effectiveYear] || [])].sort(
    (a, b) => parseMeetingDate(b.meetingdate) - parseMeetingDate(a.meetingdate)
  )

  return (
    <section>
      <h2 className="font-semibold">Meetings By Year</h2>

      {!meetingsState.loaded && <p>Loading meetings...</p>}
      {meetingsState.error && (
        <p>Error loading meetings: {meetingsState.error}</p>
      )}
      {meetingsState.loaded &&
        !meetingsState.error &&
        meetingsState.items.length === 0 && <p>No meetings scheduled.</p>}

      {meetingsState.loaded && meetingsState.items.length > 0 && (
        <>
          <div className="year-filter">
            <label htmlFor="dvrpc-committee-year">Filter By Year</label>
            <div className="year-select">
              <select
                id="dvrpc-committee-year"
                name="dvrpc-committee-year"
                value={effectiveYear}
                onChange={event => setSelectedYear(event.target.value)}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {meetings.length === 0 ? (
            <p>No meetings for the selected year.</p>
          ) : (
            <table className="meetings">
              <colgroup>
                <col className="meetings-date-column" />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Meeting Materials</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map(meeting => {
                  const urls = getMeetingUrls(meeting)
                  const committeeId = getCommitteeId().toLowerCase()

                  return (
                    <tr key={meeting.id}>
                      <th scope="row">
                        {formatMeetingDate(meeting.meetingdate)}
                      </th>
                      <td>
                        <div className="meeting-links">
                          <a
                            className="underline"
                            href={`/sepsa/agenda/${meeting.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Agenda
                          </a>
                          {validUrls.has(urls.highlights) && (
                            <a
                              href={`https://www3.dvrpc.org/asp/committee/committees/${
                                meeting.committeeid
                              }/${formatDateForUrl(meeting.meetingdate)}.pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Meeting Minutes
                            </a>
                          )}
                          {validUrls.has(urls.presentations) && (
                            <a
                              href={urls.presentations}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Presentations
                            </a>
                          )}
                          {urls.comments && validUrls.has(urls.comments) && (
                            <a
                              href={urls.comments}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Comments
                            </a>
                          )}
                          {meeting.note2 && (
                            <a
                              href={meeting.note2}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Recording
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  )
}

export default Committee
