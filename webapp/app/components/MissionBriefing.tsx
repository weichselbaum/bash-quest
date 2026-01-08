'use client'

import { Mission } from '../lib/missions'

interface MissionBriefingProps {
  mission: Mission
  onStart: () => void
  onCancel: () => void
}

export default function MissionBriefing({
  mission,
  onStart,
  onCancel
}: MissionBriefingProps) {
  return (
    <div className="modal-overlay">
      <div className="modal mission-briefing-modal">
        <div className="mission-briefing-header">
          <span className="mission-briefing-emoji">{mission.emoji}</span>
          <div>
            <h2>{mission.title}</h2>
            <p className="mission-briefing-subtitle">{mission.subtitle}</p>
          </div>
        </div>

        <div className="mission-briefing-content">
          <pre className="mission-briefing-text">{mission.briefing}</pre>
        </div>

        <div className="mission-briefing-objectives">
          <h3>Objectives ({mission.objectives.length})</h3>
          <ul>
            {mission.objectives.map((obj, idx) => (
              <li key={obj.id}>
                <span className="objective-number">{idx + 1}.</span>
                {obj.description}
                <span className="objective-xp">+{obj.xpReward} XP</span>
              </li>
            ))}
          </ul>
          <div className="mission-briefing-bonus">
            Completion Bonus: +{mission.xpBonus} XP
          </div>
        </div>

        <div className="mission-briefing-actions">
          <button className="mission-btn-cancel" onClick={onCancel}>
            Not Ready
          </button>
          <button className="mission-btn-start" onClick={onStart}>
            Accept Mission
          </button>
        </div>
      </div>
    </div>
  )
}
