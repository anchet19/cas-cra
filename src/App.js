import './App.css';
import Settings from './league-settings'
import { useEffect, useState } from 'react'

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
      console.log(nflState);
      const members = users.map(({
        user_id,
        display_name,
        metadata: {
          team_name
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
    (async () => {
      const [transactions, matchups] = await Promise.all([
        getTransactions(currentPage),
        getMatchups(currentPage),
      ])

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
      const trans_totals = transactions.reduce((acc, { adds, status, type }) => {
        if (status !== 'complete' || !adds) return acc
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
  }, [currentPage])

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
    const table_data = members.map(({ roster_id, display_name, team_name, wins, losses, ties }) => {
      const { adds, trades } = transactions[roster_id] ?? { adds: 0, trades: 0 }
      const adds_total = adds * Settings.ADD
      const trades_total = trades * Settings.TRADE
      const loss = losers.find((loser) => roster_id === loser.roster_id) ? 1 : 0
      return {
        header: team_name ?? display_name,
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
      <div className="content">
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
                  <th scope="row">{data.header}</th>
                  <td>{data.record}</td>
                  <td>${data.adds_total} ({data.adds})</td>
                  <td>${data.trades_total} ({data.trades})</td>
                  <td>${data.loss * Settings.LOSS}</td>
                  <td>${data.total}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <nav aria-label="Table pagination">
          <ul className="pagination">
            <li className={`page-item ${pages[0] === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePageLeft} ariaLabel="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {
              pages.map(page => (
                <li className={`page-item ${currentPage === page ? 'active' : ''}`} ariaCurrent={`${currentPage === page ? 'page' : ''}`}>
                  <button className="page-link" onClick={() => { handlePageSelect(page) }}>{page}</button>
                </li>
              ))
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
