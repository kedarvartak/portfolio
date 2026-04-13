import { CSSProperties } from 'react'

export const styles: Record<string, CSSProperties> = {
  container: {
    width: 'min(96vw, 1500px)',
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '4.5vh 3vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '4vw',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--line)',
  },

  leftSidebar: {
    flex: '0 0 32%',
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
    overflowY: 'auto',
    overflowX: 'hidden',
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
    textAlign: 'justify',
    textAlignLast: 'left',
    textJustify: 'inter-word',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto',
  },

  accomplishmentsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.8vh',
    padding: 0,
    margin: 0,
  },

  sectionHeading: {
    fontSize: 'clamp(13px, 0.95vw, 16px)',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    marginBottom: '2.2vh',
    color: 'var(--subtle)',
  },

  accomplishmentItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7vh',
    listStyle: 'none',
    padding: '1.2rem 1.3rem',
    border: '1px solid var(--line)',
    borderRadius: '12px',
    background: 'var(--surface-elevated)',
    minHeight: 'auto',
  },

  itemHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '0.6vh',
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
    lineHeight: 1.35,
  },

  itemDescription: {
    fontSize: 'clamp(13px, 1vw, 15px)',
    lineHeight: 1.6,
    color: 'var(--muted)',
    textAlign: 'justify',
    textAlignLast: 'left',
    textJustify: 'inter-word',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto',
  },

  itemLinks: {
    display: 'flex',
    gap: '15px',
    fontSize: 'clamp(13px, 1vw, 15px)',
    marginTop: '0.8vh',
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
    textAlign: 'justify',
    textAlignLast: 'left',
    textJustify: 'inter-word',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto',
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderTop: 'none',
    alignItems: 'flex-start',
  },

  footerButtonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center',
  },

  footerSocialButton: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    border: '1px solid var(--control-border)',
    background: 'var(--control-bg)',
    color: 'var(--control-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: 'none',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    textDecoration: 'none',
    padding: '0',
  },

  footerSocialButtonSvg: {
    width: '22px',
    height: '22px',
    display: 'block',
  },

  footerLink: {
    color: 'var(--text)',
    textDecoration: 'underline',
    fontWeight: 400,
    transition: 'opacity 0.2s ease',
    cursor: 'pointer',
  },

  bold: {
    fontWeight: 700,
  },

  themeDock: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
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
    position: 'absolute',
    minWidth: '262px',
    transformOrigin: 'bottom right',
    transition: 'opacity 0.2s ease, transform 0.2s ease, max-height 0.2s ease, padding 0.2s ease, border-color 0.2s ease',
    maxHeight: '0px',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    transform: 'translateY(-10px) scale(0.98)',
    bottom: '56px',
    right: '0',
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

  workoutMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75vh',
    flex: 1,
    minHeight: 0,
    marginTop: '-3vh',
  },

  workoutBackLink: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: 'var(--link)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0,
    padding: 0,
    border: 'none',
    background: 'transparent',
    fontSize: '17px',
    letterSpacing: '0.02em',
    fontWeight: 500,
    transition: 'opacity 0.2s ease',
  },

  workoutTitleRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '12px',
  },

  workoutSubtleText: {
    fontSize: 'clamp(12px, 0.95vw, 14px)',
    color: 'var(--subtle)',
  },

  workoutKpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '12px',
  },

  workoutStravaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '12px',
  },

  workoutStravaCard: {
    border: '1px solid var(--line)',
    background: 'var(--surface-elevated)',
    padding: '12px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
  },

  workoutStravaValue: {
    fontSize: 'clamp(16px, 1.4vw, 22px)',
    color: 'var(--text)',
    fontWeight: 600,
    lineHeight: 1.1,
  },

  workoutStatusText: {
    fontSize: '12px',
    color: 'var(--muted)',
    marginBottom: '2px',
  },

  workoutKpiCard: {
    border: '1px solid var(--line)',
    background: 'var(--surface-elevated)',
    padding: '14px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: 0,
  },

  workoutKpiLabel: {
    fontSize: '11px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--subtle)',
  },

  workoutKpiValue: {
    fontSize: 'clamp(20px, 1.8vw, 28px)',
    color: 'var(--text)',
    fontWeight: 600,
    lineHeight: 1.1,
  },

  workoutKpiHint: {
    fontSize: '12px',
    color: 'var(--muted)',
  },

  workoutPanelGrid: {
    display: 'grid',
    gridTemplateColumns: '1.35fr 1fr',
    gap: '10px',
    flex: 1,
    minHeight: 0,
  },

  workoutPanel: {
    border: '1px solid var(--line)',
    background: 'var(--surface-elevated)',
    borderRadius: '10px',
    padding: '14px',
    minHeight: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  workoutPanelTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--subtle)',
  },

  workoutTable: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },

  workoutTableHead: {
    fontSize: '11px',
    color: 'var(--subtle)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },

  workoutTableCell: {
    fontSize: '13px',
    color: 'var(--muted)',
    padding: '8px 6px',
    borderBottom: '1px solid var(--line)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  workoutTableCellStrong: {
    color: 'var(--text)',
    fontWeight: 600,
  },

  workoutList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minHeight: 0,
  },

  workoutSessionItem: {
    border: '1px solid var(--line)',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    background: 'var(--surface)',
  },

  workoutSessionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },

  workoutSessionTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  workoutSessionMeta: {
    fontSize: '12px',
    color: 'var(--subtle)',
  },

  workoutBadgeRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },

  workoutBadge: {
    fontSize: '11px',
    color: 'var(--muted)',
    border: '1px solid var(--line)',
    borderRadius: '999px',
    padding: '2px 8px',
    background: 'var(--surface)',
  },

  workoutBarList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minHeight: 0,
  },

  workoutBarRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  workoutBarRowMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },

  workoutBarTrack: {
    width: '100%',
    height: '10px',
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: '999px',
    overflow: 'hidden',
  },

  workoutBarFill: {
    height: '100%',
    background: 'var(--accent)',
    opacity: 0.75,
    borderRadius: '999px',
    minWidth: '8px',
  },

  workoutWeekChart: {
    height: '96px',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
    gap: '8px',
    alignItems: 'end',
    marginBottom: '4px',
  },

  workoutWeekColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: 0,
  },

  workoutWeekColumnInner: {
    width: '100%',
    height: '76px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '3px',
  },

  workoutWeekBar: {
    width: '100%',
    borderRadius: '5px',
    background: 'var(--accent)',
    opacity: 0.75,
    minHeight: '8px',
  },

  workoutWeekLabel: {
    fontSize: '10px',
    color: 'var(--subtle)',
    whiteSpace: 'nowrap',
  },
}
