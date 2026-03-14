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
    backgroundColor: '#ffffff',
    boxShadow: '0 0 40px rgba(0,0,0,0.05)',
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
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '40px',
    marginBottom: '6vh',
    fontSize: 'clamp(13px, 1vw, 16px)',
    letterSpacing: '0.5px',
  },

  navLink: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: 400,
    transition: 'opacity 0.2s ease',
  },

  title: {
    fontSize: 'clamp(36px, 3.5vw, 56px)',
    fontWeight: 400,
    marginBottom: '3vh',
    lineHeight: 1.2,
  },

  bio: {
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    lineHeight: 1.6,
    marginBottom: '2vh',
    color: '#333',
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
    color: '#555',
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
    color: '#888',
    fontWeight: 500,
  },

  itemTitle: {
    fontWeight: 600,
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    color: '#000',
  },

  itemDescription: {
    fontSize: 'clamp(13px, 1vw, 15px)',
    lineHeight: 1.6,
    color: '#333',
  },

  itemLinks: {
    display: 'flex',
    gap: '15px',
    fontSize: 'clamp(13px, 1vw, 15px)',
  },

  link: {
    color: '#000',
    textDecoration: 'underline',
    fontWeight: 400,
    transition: 'opacity 0.2s ease',
  },

  writeSection: {
    fontSize: 'clamp(14px, 1.1vw, 16px)',
    lineHeight: 1.6,
    marginTop: '2vh',
    marginBottom: '4vh',
    color: '#333',
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
    color: '#000',
    textDecoration: 'underline',
    fontWeight: 400,
    width: 'fit-content',
  },

  bold: {
    fontWeight: 700,
  },
}
