import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStart: false, timeValue: 25, minutes: 25, seconds: 0, timerID: ''}

  onTogglePlayButton = () => {
    const {isStart} = this.state

    const timerID = setInterval(() => {
      this.tick()
    }, 1000)

    this.setState({
      isStart: !isStart,
      timerID,
    })
  }

  onTogglePauseButton = () => {
    const {timerID} = this.state
    clearInterval(timerID)
    this.setState({isStart: false})
  }

  tick = () => {
    this.setState(prevState => {
      let {minutes, seconds} = prevState
      const {timerID} = prevState

      if (minutes === 0 && seconds === 0) {
        clearInterval(timerID)
        return {isStart: false, seconds: 0}
      }
      if (seconds === 0) {
        seconds = 60
        minutes -= 1
      }

      return {minutes, seconds: seconds - 1}
    })
  }

  onClickDecreaseBtn = () => {
    const {isStart, minutes} = this.state

    if (isStart === false && minutes !== 1) {
      this.setState(prevState => {
        const {timeValue} = prevState
        return {
          timeValue: timeValue - 1,
          minutes: timeValue - 1,
        }
      })
    }
  }

  onClickIncreaseBtn = () => {
    const {isStart} = this.state

    if (isStart === false) {
      this.setState(prevState => {
        const {timeValue} = prevState
        return {
          timeValue: timeValue + 1,
          minutes: timeValue + 1,
        }
      })
    }
  }

  onClickResetBtn = () => {
    const {timerID} = this.state
    clearInterval(timerID)
    this.setState({isStart: false, timeValue: 25, minutes: 25, seconds: 0})
  }

  render() {
    const {isStart, timeValue, minutes, seconds} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="container">
          <div className="digital-timer-container">
            <div className="timer-container">
              <h1 className="timer">
                {minutes > 9 ? minutes : `0${minutes}`}:
                {seconds > 9 ? seconds : `0${seconds}`}
              </h1>
              <p className="paused">{isStart ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="start-reset-timer-container">
            <div className="start-reset-container">
              <button
                className="button start"
                type="button"
                onClick={
                  isStart ? this.onTogglePauseButton : this.onTogglePlayButton
                }
              >
                <img
                  src={
                    isStart
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isStart ? 'pause icon' : 'play icon'}
                  className="play-icon"
                />
                {isStart ? 'Pause' : 'Start'}
              </button>
              <button
                className="button start"
                type="button"
                onClick={this.onClickResetBtn}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-icon"
                />
                Reset
              </button>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="timer-change-container">
              <button
                className="button"
                type="button"
                onClick={this.onClickDecreaseBtn}
              >
                <p className="decrease">-</p>
              </button>
              <p className="timer-value">{timeValue}</p>
              <button
                className="button"
                type="button"
                onClick={this.onClickIncreaseBtn}
              >
                <p className="decrease">+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
