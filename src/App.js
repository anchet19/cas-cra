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

function App() {
  // eslint-disable-next-line
  const [league, setLeague] = useState({})
  const [losers, setLosers] = useState([])
  const [members, setMembers] = useState([])
  // eslint-disable-next-line
  const [nflState, setNflState] = useState({});
  const [transactions, setTransactions] = useState({})
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

  async function handleSelect(e) {
    const leg = e.target.value
    if (Number.isNaN(+leg)) return
    const [transactions, matchups] = await Promise.all([
      getTransactions(leg),
      getMatchups(leg),
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
  }

  function genTableData() {
    console.log(losers);
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
    <div className="container">
      <div className="content">
        <div className="select-wrapper">
          <label htmlFor="leg">Week: </label>
          <select name="leg" onChange={handleSelect}>
            <option disabled selected key="placeholder" value="placeholder">Select a Week</option>
            {
              new Array(Settings.WEEKS).fill(0).map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
            }
          </select>
        </div>
        <table>
          <caption>
            <strong className="caption-heading">Weekly Costs Summary:</strong>
            <br />
            <span className="caption-summary">
              The Loss column is calculated based on the current state of the weeks matchup.
              Check back after the week has ended for the most accurate results.
              </span>
          </caption>
          <thead>
            <tr>
              <th>Team</th>
              <th>Record</th>
              <th>Adds ($3/ea)</th>
              <th>Trades ($10/ea)</th>
              <th>Loss</th>
              <th>Total</th>
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
      </div>
    </div>
  );
}

export default App;
