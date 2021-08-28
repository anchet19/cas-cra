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

const TRANSACTION_TYPE = {
  TRADE: 'trade',
  WAIVER: 'waiver',
  FREE_AGENT: 'free_agent'
}

function App() {
  // eslint-disable-next-line
  const [league, setLeague] = useState({})
  const [transactions, setTransactions] = useState({})
  const [members, setMembers] = useState([])
  useEffect(() => {
    (async () => {
      setLeague(await getLeague())
      const rosters = await getRosters()
      const users = await getUsers()
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
    const transactions = await getTransactions(leg)
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
    const table_data = members.map(({ roster_id, display_name, team_name, wins, losses, ties }) => {
      const { adds, trades } = transactions[roster_id] ?? { adds: 0, trades: 0 }
      const adds_total = adds * Settings.ADD
      const trades_total = trades * Settings.TRADE
      return {
        header: team_name ?? display_name,
        record: `${wins}-${losses}-${ties}`,
        adds,
        adds_total,
        trades,
        trades_total,
        total: adds_total + trades_total
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
          <thead>
            <tr>
              <th>Team</th>
              <th>Record</th>
              <th>Adds</th>
              <th>Adds Cost</th>
              <th>Trades</th>
              <th>Trades Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {
              genTableData().map(data => (
                <tr key={data.roster_id}>
                  <th scope="row">{data.header}</th>
                  <td>{data.record}</td>
                  <td>{data.adds}</td>
                  <td>${data.adds_total}</td>
                  <td>{data.trades}</td>
                  <td>${data.trades_total}</td>
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
