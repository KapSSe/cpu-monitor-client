import { setCurrent, setSeconds, setMinutes, setHours } from '../store/actions/cpuStatsActions'
import store from '../store/store'

export default class ConnectionService {
  constructor() {
    this._apiUrl = 'http://localhost:8090'
    this.isConnected = false
    this.token = store.getState().auth.token
    this.enqued = {}
    this.init()
  }

  init = async () => {
    try {
      if (this.token) {
        const sid = await this.getSession()
        document.cookie = `sessionID=${sid}`
      }

      this.client = new window.ActionheroWebsocketClient({ url: this._apiUrl })
      this.client.connect((err, details) => {
        if(err){
          throw new Error(err)
        }else{
          this.isConnected = true
        }
      })
    } catch(err) {
      console.error(err)
    }
  }

  getSession = async () => {
    const res = await fetch(`${this._apiUrl}/api/get:fp`)
    if (!res.ok) throw new Error(`Could not fetch from api`)
    const sid = await res.json()
    return sid
  }

  enqueAction(action, options = null, interval) {
    this.enqued[action] = setInterval(() => {
      this.action(action, options)
    } , interval)
  }

  clearQueue(action) {
    clearInterval(this.enqued[action])
  }

	action(action, options = null ) {
		setTimeout(() => {
			this[action](action, options)
		}, 100)
	}

  getCurrent = (action) => {
    if (!this.isConnected) {
      return this.action(action)
    }
    this.client.action('monitor:get:current', (data) => {
      store.dispatch(setCurrent(data.message))
    })
  }

  getLast = async (action, options) => {
    if (!this.isConnected) {
      return this.action(action, options)
    }
    
    const body = JSON.stringify(options)
    const params = { method: 'POST', headers: { "Content-Type": "application/json"}, body }

    const res = await fetch(`${this._apiUrl}/api/monitor:get:stats`, params)

    if (res.ok) {
      const data = await res.json()
      if (data.message) {
        this.messageResolver(data.message, options.type)
      }
    }
  }

  messageResolver = (message, options) => {
    switch(options) {
      case 'seconds':
        store.dispatch(setSeconds(message))
        break
      case 'minutes':
        store.dispatch(setMinutes(message))
        break
      case 'hours':
        store.dispatch(setHours(message))
        break
      default:
        break
    }
  }
}