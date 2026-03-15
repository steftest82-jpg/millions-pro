import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          background: '#059669',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
