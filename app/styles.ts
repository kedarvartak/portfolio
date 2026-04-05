import { CSSProperties } from 'react'

export const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '6vh 4vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '6vw',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--line)',
  },

  leftSidebar: {
    flex: '0 0 35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    minWidth: 0,
  },

  rightContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    minWidth: 0,
    position: 'relative',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2vh',
    flex: 1,
  },

  pageColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '4vh',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '6vh',
    fontSize: 'clamp(13px, 1vw, 16px)',
    letterSpacing: '0.5px',
  },

  headerGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },

  navLink: {
    textDecoration: 'none',
    color: 'var(--text)',
    fontWeight: 400,
    transition: 'opacity 0.2s ease',
  },

  title: {
    fontSize: 'clamp(36px, 3.5vw, 56px)',
    fontWeight: 400,
    marginBottom: '3vh',
    lineHeight: 1.2,
    color: 'var(--text)',
  },

  bio: {
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    lineHeight: 1.6,
    marginBottom: '2vh',
    color: 'var(--muted)',
    fontWeight: 400,
  },

  accomplishmentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '3vw',
    padding: 0,
    margin: 0,
  },

  sectionHeading: {
    fontSize: 'clamp(13px, 0.95vw, 16px)',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    marginBottom: '4vh',
    color: 'var(--subtle)',
  },

  accomplishmentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1vh',
    listStyle: 'none',
  },

  itemHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
  },

  itemNumber: {
    fontSize: 'clamp(11px, 0.85vw, 13px)',
    color: 'var(--subtle)',
    fontWeight: 500,
  },

  itemTitle: {
    fontWeight: 600,
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    color: 'var(--text)',
  },

  itemDescription: {
    fontSize: 'clamp(13px, 1vw, 15px)',
    lineHeight: 1.6,
    color: 'var(--muted)',
  },

  itemLinks: {
    display: 'flex',
    gap: '15px',
    fontSize: 'clamp(13px, 1vw, 15px)',
  },

  link: {
    color: 'var(--link)',
    textDecoration: 'underline',
    fontWeight: 400,
    transition: 'opacity 0.2s ease',
  },

  writeSection: {
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    lineHeight: 1.6,
    marginTop: '2vh',
    marginBottom: '4vh',
    color: 'var(--muted)',
  },

  footer: {
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    lineHeight: 1.6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '15px',
    borderTop: 'none',
  },

  footerLink: {
    color: 'var(--text)',
    textDecoration: 'underline',
    fontWeight: 400,
    width: 'fit-content',
  },

  bold: {
    fontWeight: 700,
  },

  themeDock: {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
  },

  themeTrigger: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    border: '1px solid var(--control-border)',
    background: 'var(--control-bg)',
    color: 'var(--control-text)',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    boxShadow: 'none',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },

  themeTriggerOpen: {
    transform: 'rotate(8deg) scale(1.02)',
    boxShadow: 'none',
  },

  themeTriggerIconWrap: {
    display: 'grid',
    placeItems: 'center',
    width: '24px',
    height: '24px',
  },

  themeTriggerSvg: {
    width: '22px',
    height: '22px',
    display: 'block',
  },

  themePalette: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '12px',
    border: '1px solid var(--control-border)',
    background: 'var(--control-bg)',
    color: 'var(--control-text)',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
    position: 'relative',
    minWidth: '262px',
    transformOrigin: 'top right',
    transition: 'opacity 0.2s ease, transform 0.2s ease, max-height 0.2s ease, padding 0.2s ease, border-color 0.2s ease',
    maxHeight: '0px',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    transform: 'translateY(-6px) scale(0.98)',
  },

  themePaletteOpen: {
    maxHeight: '340px',
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'translateY(0) scale(1)',
  },

  themePaletteHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '14px',
  },

  themePaletteTitle: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--subtle)',
  },

  themePaletteHint: {
    fontSize: '11px',
    color: 'var(--subtle)',
    opacity: 0.8,
  },

  themeSwatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '10px',
  },

  themeSwatchButton: {
    border: '1px solid transparent',
    background: 'transparent',
    borderRadius: '10px',
    padding: '0',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    minWidth: '0',
  },

  themeSwatchButtonActive: {
    transform: 'translateY(-2px)',
    borderColor: 'var(--accent)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.14)',
  },

  themeSwatchPreview: {
    width: '64px',
    height: '64px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.32)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
  },

  themeSwatchLabel: {
    fontSize: '11px',
    color: 'var(--control-text)',
    letterSpacing: '0.02em',
  },

  themeSwatchDefault: {
    backgroundImage:
      'linear-gradient(135deg, #f9f9f9 0%, #f9f9f9 32%, #e9e9e9 32%, #e9e9e9 34%, #ffffff 34%, #ffffff 66%, #ebebeb 66%, #ebebeb 68%, #f3f3f3 68%, #f3f3f3 100%)',
  },

  themeSwatchMidnight: {
    backgroundImage:
      'linear-gradient(135deg, #09111c 0%, #09111c 30%, #17253b 30%, #17253b 34%, #0f1a2a 34%, #0f1a2a 66%, #244064 66%, #244064 70%, #0c1523 70%, #0c1523 100%)',
  },

  themeSwatchAmber: {
    backgroundImage:
      'linear-gradient(135deg, #f7efe4 0%, #f7efe4 30%, #f0d6b4 30%, #f0d6b4 34%, #fffaf4 34%, #fffaf4 66%, #dfae76 66%, #dfae76 70%, #f3e2cc 70%, #f3e2cc 100%)',
  },
}
