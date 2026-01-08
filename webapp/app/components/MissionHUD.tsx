'use client'

import { Mission } from '../lib/missions'

interface MissionHUDProps {
  mission: Mission
  currentObjectiveIndex: number
  objectivesCompleted: string[]
  onAbandon: () => void
}

export default function MissionHUD({
  mission,
  currentObjectiveIndex,
  objectivesCompleted,
  onAbandon
}: MissionHUDProps) {
  const currentObjective = mission.objectives[currentObjectiveIndex]
  const progress = objectivesCompleted.length
  const total = mission.objectives.length

  return (
    <div className="mission-hud">
      <div className="mission-hud-header">
        <span className="mission-hud-emoji">{mission.emoji}</span>
        <div className="mission-hud-title">
          <h3>{mission.title}</h3>
          <span className="mission-hud-progress">{progress}/{total}</span>
        </div>
        <button className="mission-hud-abandon" onClick={onAbandon} title="Mission abbrechen">
          ✕
        </button>
      </div>

      <div className="mission-hud-objective">
        <div className="mission-hud-objective-text">
          → {currentObjective?.description || 'Alle Ziele erreicht!'}
          {currentObjective && <span className="mission-hud-xp">+{currentObjective.xpReward} XP</span>}
        </div>
        {currentObjective?.hint && (
          <div className="mission-hud-hint">
            Tipp: {currentObjective.hint}
          </div>
        )}
      </div>
    </div>
  )
}
