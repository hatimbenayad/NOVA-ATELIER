import { memo } from 'react'

function ApproachDomeComponent() {
  return (
    <div
      aria-hidden="true"
      className="approach-dome surface-paper"
    />
  )
}

export const ApproachDome = memo(ApproachDomeComponent)
export default ApproachDome
