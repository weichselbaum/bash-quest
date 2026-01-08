'use client'

interface MissionCompleteProps {
  emoji: string
  title: string
  successMessage: string
  xpEarned: number
  onClose: () => void
}

export default function MissionComplete({
  emoji,
  title,
  successMessage,
  xpEarned,
  onClose
}: MissionCompleteProps) {
  return (
    <div className="modal-overlay">
      <div className="modal mission-complete-modal">
        <div className="mission-complete-header">
          <div className="mission-complete-badge">MISSION COMPLETE</div>
          <div className="mission-complete-emoji">{emoji}</div>
          <h2>{title}</h2>
        </div>

        <div className="mission-complete-content">
          <pre className="mission-complete-message">{successMessage}</pre>
        </div>

        <div className="mission-complete-xp">
          <span className="xp-earned">+{xpEarned} XP</span>
        </div>

        <button className="mission-complete-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  )
}
