import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Millions Pro — Personal Finance Tips, Investing Strategies & Financial Commentary'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f172a 70%, #020617 100%)',
            display: 'flex',
          }}
        />

        {/* Decorative accent circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-60px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Gold accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, #f59e0b 20%, #10b981 50%, #3b82f6 80%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo / Brand Mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                boxShadow: '0 4px 24px rgba(16, 185, 129, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1,
                }}
              >
                M
              </span>
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#e2e8f0',
                letterSpacing: '-0.02em',
              }}
            >
              Millions Pro
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '3px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              marginBottom: '32px',
              marginTop: '20px',
              display: 'flex',
            }}
          />

          {/* Main heading */}
          <h1
            style={{
              fontSize: '58px',
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              padding: 0,
              maxWidth: '900px',
            }}
          >
            Personal Finance Tips
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#94a3b8',
              textAlign: 'center',
              lineHeight: 1.5,
              margin: 0,
              marginTop: '20px',
              maxWidth: '720px',
            }}
          >
            Expert financial commentary on budgeting, investing, debt management, and building wealth.
          </p>

          {/* Category pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '36px',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Budgeting', color: '#10b981' },
              { label: 'Investing', color: '#3b82f6' },
              { label: 'Debt Free', color: '#f59e0b' },
              { label: 'Side Hustles', color: '#8b5cf6' },
              { label: 'Wellness', color: '#ec4899' },
            ].map((cat) => (
              <div
                key={cat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: `1.5px solid ${cat.color}40`,
                  background: `${cat.color}15`,
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: cat.color,
                    marginRight: '8px',
                    display: 'flex',
                  }}
                />
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#cbd5e1',
                  }}
                >
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#64748b',
              letterSpacing: '0.05em',
            }}
          >
            millionspro.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
