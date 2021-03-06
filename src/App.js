import './App.css';
import Settings from './league-settings'
import { useEffect, useState } from 'react'
import { previousTuesday, parseISO, isWithinInterval } from 'date-fns';
import { addWeeks, nextTuesday } from 'date-fns/esm';

const baseUrl = 'https://api.sleeper.app/v1'
async function getLeague() {
  return fetch(`${baseUrl}/league/${Settings.ID}`).then(res => res.json())
}

async function getRosters() {
  return fetch(`${baseUrl}/league/${Settings.ID}/rosters`).then(res => res.json())
}

async function getUsers() {
  return fetch(`${baseUrl}/league/${Settings.ID}/users`).then(res => res.json())
}

async function getTransactions(leg) {
  return fetch(`${baseUrl}/league/${Settings.ID}/transactions/${leg}`).then(res => res.json())
}
async function getMatchups(leg) {
  return fetch(`${baseUrl}/league/${Settings.ID}/matchups/${leg}`).then(res => res.json())
}

async function getNFLState() {
  return fetch(`${baseUrl}/state/nfl`).then(res => res.json())
}

const TRANSACTION_TYPE = {
  TRADE: 'trade',
  WAIVER: 'waiver',
  FREE_AGENT: 'free_agent'
}

const MAX_PAGES = 5
function App() {
  // eslint-disable-next-line
  const [league, setLeague] = useState({})
  const [losers, setLosers] = useState([])
  const [members, setMembers] = useState([])
  // eslint-disable-next-line
  const [nflState, setNflState] = useState({});
  const [transactions, setTransactions] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(new Array(MAX_PAGES).fill(0).map((_, i) => i + 1))
  useEffect(() => {
    (async () => {
      const [league, rosters, users, nflState] = await Promise.all([
        getLeague(),
        getRosters(),
        getUsers(),
        getNFLState(),
      ])
      setLeague(league)
      setNflState(nflState)
      if (nflState.season_type === 'regular') {
        setCurrentPage(nflState.leg)
      }
      const members = users.map(({
        user_id,
        display_name,
        metadata: {
          team_name,
          avatar
        }
      }) => {
        const {
          roster_id,
          settings: {
            wins,
            losses,
            ties
          }
        } = rosters.find(roster => roster.owner_id === user_id)
        return {
          user_id,
          roster_id,
          avatar,
          display_name,
          team_name,
          wins,
          losses,
          ties
        }
      })
      setMembers(members.sort((a, b) => a.roster_id - b.roster_id))
    })()
  }, [])

  useEffect(() => {
    if (!nflState.season_start_date) return
    // season always starts on a thursday be we want tuesday
    const season_start_date = parseISO(nflState.season_start_date)
    const week_selected = addWeeks(season_start_date, currentPage - 1)
    const interval = { start: previousTuesday(week_selected), end: nextTuesday(week_selected) }

    const transaction_queries = [getTransactions(currentPage)]
    if (currentPage > 1) {
      transaction_queries.push(getTransactions(currentPage - 1))
    } else {
      transaction_queries.push(Promise.resolve([]))
    }
    (async () => {
      const [matchups, ...rest] = await Promise.all([
        getMatchups(currentPage),
        ...transaction_queries,
      ])
      const transactions = rest.flat()
      const losers = matchups.reduce((acc, curr) => {
        const { matchup_id, points, roster_id } = curr
        const prev = acc[matchup_id]
        if (prev && prev.points !== points) {
          acc[matchup_id] = prev.points < points ? prev : { roster_id, points }
        } else if (!prev) {
          acc[matchup_id] = { roster_id, points }
        } else {
          delete acc[matchup_id]
        }
        return acc
      }, {})
      setLosers(Object.values(losers))
      const trans_totals = transactions.reduce((acc, { adds, status, type, status_updated }) => {
        if (status !== 'complete' || !adds) return acc
        const updated_date = new Date(status_updated)
        /**@todo  Date ranges needs work.
         *        Need to only include transactions from previous tuesday(12am) through following monday (before tuesday 12am)
        */
        if (!isWithinInterval(updated_date, interval)) return acc
        switch (type) {
          case TRANSACTION_TYPE.WAIVER:
          case TRANSACTION_TYPE.FREE_AGENT: {
            // adds are maps of player_id => roster_id
            Object.values(adds).forEach(roster_id => {
              const prev = acc[roster_id] ?? { adds: 0, trades: 0 }
              acc[roster_id] = { ...prev, adds: prev.adds ? prev.adds + 1 : 1 }
            })
            break
          }
          case TRANSACTION_TYPE.TRADE: {
            Object.values(adds).forEach(roster_id => {
              const prev = acc[roster_id] ?? { adds: 0, trades: 0 }
              acc[roster_id] = { ...prev, trades: prev.trades ? prev.trades + 1 : 1 }
            })
            break
          }
          default:
        }
        return acc
      }, {})
      setTransactions(trans_totals)
    })()
  }, [currentPage, nflState.season_start_date])

  function handlePageLeft() {
    const first = pages[0] - MAX_PAGES
    const last = pages[0] - 1
    setPages(new Array(MAX_PAGES).fill(0).map((_, i) => first + i))
    setCurrentPage(last)
  }
  function handlePageRight() {
    const max = nflState.season.type === 'regular' ? nflState.leg : Settings.WEEKS
    const first = pages[pages.length - 1] + 1
    const pagesLeft = MAX_PAGES > max + 1 - first ? max + 1 - first : MAX_PAGES
    setPages(new Array(pagesLeft).fill(0).map((_, i) => first + i))
    setCurrentPage(first)
  }

  async function handlePageSelect(leg) {
    setCurrentPage(leg)
  }

  function genTableData() {
    const table_data = members.map(({ avatar, roster_id, display_name, team_name, wins, losses, ties }) => {
      const { adds, trades } = transactions[roster_id] ?? { adds: 0, trades: 0 }
      const adds_total = adds * Settings.ADD
      const trades_total = trades * Settings.TRADE
      const loss = losers.find((loser) => roster_id === loser.roster_id) ? 1 : 0
      return {
        avatar,
        header: team_name ?? `Team ${display_name}`,
        sub_header: `@${display_name}`,
        roster_id,
        loss,
        record: `${wins}-${losses}-${ties}`,
        adds,
        adds_total,
        trades,
        trades_total,
        total: adds_total + trades_total + (loss * Settings.LOSS)
      }
    })
    return table_data
  }

  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table caption-top">
          <caption>
            <strong>Weekly Costs Summary:</strong>
            <br />
            <span>
              The Loss column is calculated based on the current state of the weeks matchup.
              Check back after the week has ended for the most accurate results.
          </span>
          </caption>
          <thead>
            <tr className="table-dark">
              <th className="avatar"></th>
              <th scope="col">Team</th>
              <th scope="col">Record</th>
              <th scope="col">Adds ($3/ea)</th>
              <th scope="col">Trades ($10/ea)</th>
              <th scope="col">Loss</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {
              genTableData().map(data => (
                <tr key={data.roster_id}>
                  <td className="avatar">
                    {data.avatar && <img alt={`${data.header} avatar`} src={data.avatar} />}
                  </td>
                  <th className="align-middle" scope="row">
                    <span>{data.header}</span>
                    <br />
                    <span>{data.sub_header}</span>
                  </th>
                  <td className="align-middle">{data.record}</td>
                  <td className="align-middle">${data.adds_total} ({data.adds})</td>
                  <td className="align-middle">${data.trades_total} ({data.trades})</td>
                  <td className="align-middle">${data.loss * Settings.LOSS}</td>
                  <td className="align-middle">${data.total}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="content">
        <nav aria-label="Table pagination">
          <ul className="pagination">
            <li className={`page-item ${pages[0] === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePageLeft} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {
              pages.map(page => {
                const props = {
                  className: 'page-item'
                }
                if (currentPage === page) {
                  props.className = `${props.className} active`
                  props["aria-current"] = "page"
                }
                return (
                  <li
                    key={`page-item-${page}`}
                    {...props}
                  >
                    <button key={`page-link-${page}`} className="page-link" onClick={() => { handlePageSelect(page) }}>{page}</button>
                  </li>
                )
              })
            }
            <li className={`page-item ${pages[pages.length - 1] === Settings.WEEKS ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePageRight} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
