import { CSSProperties } from 'react'

export const styles: Record<string, CSSProperties> = {
  container: {
    width: 'min(96vw, 1500px)',
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '4.5vh 3vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '4vw',
    overflow: 'visible',
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
    height: 'auto',
    justifyContent: 'flex-start',
    minWidth: 0,
    position: 'relative',
    overflowY: 'hidden',
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
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
    padding: 0,
    margin: 0,
    alignContent: 'start',
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
    gap: '0.55rem',
    listStyle: 'none',
    padding: '1rem 1.05rem',
    border: '1px solid var(--line)',
    borderRadius: '12px',
    background: 'var(--surface-elevated)',
    minHeight: '160px',
  },

  itemHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '0.25rem',
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
    lineHeight: 1.5,
    color: 'var(--muted)',
    textAlign: 'justify',
    textAlignLast: 'left',
    textJustify: 'inter-word',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  itemLinks: {
    display: 'flex',
    gap: '15px',
    fontSize: 'clamp(13px, 1vw, 15px)',
    marginTop: 'auto',
    paddingTop: '0.25rem',
    flexWrap: 'wrap',
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

  agentsIntro: {
    fontSize: 'clamp(13px, 0.95vw, 15px)',
    lineHeight: 1.6,
    color: 'var(--muted)',
    maxWidth: '44ch',
    marginTop: '0.55rem',
  },

  agentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.2rem',
  },

  agentCardFeatured: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
    padding: '1.15rem',
    borderRadius: '14px',
    border: '1px solid var(--line)',
    background:
      'linear-gradient(180deg, var(--surface-elevated) 0%, color-mix(in srgb, var(--surface) 92%, var(--accent) 8%) 100%)',
    boxShadow: 'var(--shadow)',
    maxWidth: '780px',
  },

  agentCardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  },

  agentPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.42rem 0.7rem',
    borderRadius: '999px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
    color: 'var(--subtle)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },

  agentStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.42rem 0.72rem',
    borderRadius: '999px',
    background: 'var(--accent)',
    color: 'var(--accent-contrast)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },

  agentCardTitleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '18px',
  },

  agentTitle: {
    fontSize: 'clamp(30px, 3vw, 42px)',
    fontWeight: 400,
    lineHeight: 1.05,
    color: 'var(--text)',
  },

  agentMetaRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },

  agentMetaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.38rem 0.68rem',
    borderRadius: '999px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
    color: 'var(--muted)',
    fontSize: '11px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  docsPageContainer: {
    maxWidth: '1680px',
    width: 'min(98vw, 1680px)',
    gap: '2.6vw',
  },

  docsMain: {
    flex: '1',
    minWidth: 0,
  },

  docsShell: {
    display: 'grid',
    gridTemplateColumns: '280px minmax(0, 1fr)',
    gap: '1.6rem',
    alignItems: 'stretch',
  },

  docsNav: {
    position: 'sticky',
    top: '2rem',
    alignSelf: 'start',
    height: 'calc(100vh - 4rem)',
  },

  docsNavInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1.4rem',
    padding: '1rem',
    border: '1px solid var(--line)',
    borderRadius: '16px',
    background: 'var(--surface-elevated)',
    height: '100%',
    overflow: 'hidden',
  },

  docsNavSections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    minHeight: 0,
    overflowY: 'auto',
    paddingRight: '0.15rem',
  },

  docsNavGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.55rem',
  },

  docsNavHeading: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--subtle)',
  },

  docsNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.28rem',
  },

  docsNavLink: {
    color: 'var(--muted)',
    textDecoration: 'none',
    fontSize: '13px',
    lineHeight: 1.45,
    padding: '0.28rem 0.42rem',
    borderRadius: '8px',
    border: '1px solid transparent',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  },

  docsNavLinkActive: {
    color: 'var(--text)',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsNavFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
    paddingTop: '0.9rem',
    borderTop: '1px solid var(--line)',
  },

  docsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: 0,
  },

  docsHero: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    padding: '1.5rem',
    border: '1px solid var(--line)',
    borderRadius: '18px',
    background: 'var(--surface-elevated)',
  },

  docsEyebrow: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--subtle)',
  },

  docsTitle: {
    fontSize: 'clamp(34px, 3.2vw, 52px)',
    lineHeight: 1.08,
    fontWeight: 400,
    color: 'var(--text)',
  },

  docsLead: {
    fontSize: 'clamp(15px, 1.05vw, 17px)',
    lineHeight: 1.75,
    color: 'var(--muted)',
    maxWidth: '72ch',
  },

  docsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
    padding: '1.4rem 1.5rem',
    border: '1px solid var(--line)',
    borderRadius: '18px',
    background: 'var(--surface-elevated)',
    scrollMarginTop: '2rem',
  },

  docsSectionTitle: {
    fontSize: 'clamp(24px, 2vw, 34px)',
    lineHeight: 1.15,
    color: 'var(--text)',
    fontWeight: 500,
  },

  docsSectionBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  docsParagraph: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: 'var(--muted)',
    maxWidth: '76ch',
  },

  docsBulletList: {
    paddingLeft: '1.1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.48rem',
    color: 'var(--muted)',
    lineHeight: 1.65,
    fontSize: '14px',
  },

  docsNumberList: {
    paddingLeft: '1.15rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.52rem',
    color: 'var(--muted)',
    lineHeight: 1.7,
    fontSize: '14px',
  },

  docsCallout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    padding: '1rem 1.05rem',
    borderRadius: '14px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsCalloutTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text)',
  },

  docsMiniGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '0.8rem',
  },

  docsMiniCard: {
    padding: '0.9rem 1rem',
    borderRadius: '12px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsMiniCardText: {
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'var(--muted)',
  },

  docsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },

  docsModuleCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem 1.05rem',
    borderRadius: '14px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsModuleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  docsInlineCode: {
    fontFamily: 'inherit',
    fontSize: '13px',
    color: 'var(--text)',
    background: 'var(--surface)',
    padding: '0.12rem 0.35rem',
    borderRadius: '6px',
    border: '1px solid var(--line)',
  },

  docsTwoUp: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
  },

  docsCodeShell: {
    border: '1px solid var(--line)',
    borderRadius: '16px',
    background: 'var(--surface)',
    overflow: 'hidden',
  },

  docsCodeLabel: {
    padding: '0.72rem 0.9rem',
    borderBottom: '1px solid var(--line)',
    fontSize: '12px',
    color: 'var(--subtle)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },

  docsPre: {
    margin: 0,
    padding: '1rem',
    overflowX: 'auto',
    fontSize: '13px',
    lineHeight: 1.65,
    color: 'var(--text)',
  },

  docsTableWrap: {
    overflowX: 'auto',
    border: '1px solid var(--line)',
    borderRadius: '16px',
    background: 'var(--surface)',
  },

  docsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  docsTableHead: {
    textAlign: 'left',
    padding: '0.85rem 0.95rem',
    borderBottom: '1px solid var(--line)',
    color: 'var(--subtle)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 500,
  },

  docsTableCell: {
    padding: '0.85rem 0.95rem',
    borderBottom: '1px solid var(--line)',
    color: 'var(--muted)',
    fontSize: '14px',
    lineHeight: 1.6,
    verticalAlign: 'top',
  },

  docsPane: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    padding: '1rem 1.05rem',
    borderRadius: '14px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsPaneTitle: {
    fontSize: '16px',
    lineHeight: 1.35,
    color: 'var(--text)',
    fontWeight: 600,
  },

  docsToolGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.85rem',
  },

  docsToolCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    padding: '1rem 1.05rem',
    borderRadius: '14px',
    border: '1px solid var(--line)',
    background: 'var(--surface)',
  },

  docsToolName: {
    fontSize: '15px',
    lineHeight: 1.45,
    color: 'var(--text)',
    fontWeight: 600,
  },

  docsToolDescription: {
    fontSize: '14px',
    lineHeight: 1.65,
    color: 'var(--muted)',
  },

}
