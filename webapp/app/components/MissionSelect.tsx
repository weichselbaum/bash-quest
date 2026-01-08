'use client'

interface MissionSummary {
  id: string
  title: string
  subtitle: string
  emoji: string
  level: number
  xpTotal: number
  objectiveCount: number
  locked: boolean
  completed: boolean
  inProgress: boolean
}

interface MissionSelectProps {
  missions: MissionSummary[]
  userLevel: number
  onSelect: (missionId: string) => void
  onClose: () => void
}

export default function MissionSelect({
  missions,
  userLevel,
  onSelect,
  onClose
}: MissionSelectProps) {
  // Group by level
  const missionsByLevel: Record<number, MissionSummary[]> = {}
  missions.forEach(m => {
    if (!missionsByLevel[m.level]) {
      missionsByLevel[m.level] = []
    }
    missionsByLevel[m.level].push(m)
  })

  const levels = Object.keys(missionsByLevel).map(Number).sort((a, b) => a - b)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal mission-select-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="mission-select-title">Select Mission</h2>
        <p className="mission-select-subtitle">
          Your Level: {userLevel} | Choose your adventure
        </p>

        <div className="mission-select-list">
          {levels.map(level => (
            <div key={level} className="mission-level-group">
              <h3 className="mission-level-header">
                Level {level} Missions
                {level > userLevel && <span className="mission-locked-badge">Locked</span>}
              </h3>

              <div className="mission-cards">
                {missionsByLevel[level].map(mission => (
                  <div
                    key={mission.id}
                    className={`mission-card ${
                      mission.locked ? 'locked' :
                      mission.completed ? 'completed' :
                      mission.inProgress ? 'in-progress' : ''
                    }`}
                    onClick={() => !mission.locked && !mission.completed && onSelect(mission.id)}
                  >
                    <div className="mission-card-emoji">{mission.emoji}</div>
                    <div className="mission-card-content">
                      <h4>{mission.title}</h4>
                      <p>{mission.subtitle}</p>
                      <div className="mission-card-meta">
                        <span>{mission.objectiveCount} objectives</span>
                        <span>+{mission.xpTotal} XP</span>
                      </div>
                    </div>
                    <div className="mission-card-status">
                      {mission.locked && '🔒'}
                      {mission.completed && '✓'}
                      {mission.inProgress && '▶'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
