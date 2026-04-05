import { readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { ThemeSwitcher } from '../components/theme-switcher'
import { styles } from '../styles'

type WorkoutRow = {
  title: string
  start_time: string
  end_time: string
  exercise_title: string
  weight_kg: number
  reps: number
  distance_km: number
  duration_seconds: number
}

type ExerciseSummary = {
  name: string
  sets: number
  reps: number
  volume: number
}

type SessionSummary = {
  id: string
  title: string
  start: Date
  end: Date
  sets: number
  exercises: number
  volume: number
}

type WeeklyStat = {
  key: string
  label: string
  sessions: number
  volume: number
}

type StravaSummary = {
  connected: boolean
  athleteName: string | null
  allTimeDistanceKm: number
  ytdActivities: number
  ytdDistanceKm: number
}

export const metadata = {
  title: 'Workouts - Kedar Vartak',
  description: 'Workout dashboard generated from Hevy export data',
}

export default async function WorkoutsPage() {
  const rows = await loadWorkoutRows()
  const stravaSummary = await loadStravaSummary()

  const sessionMap = new Map<string, SessionSummary>()
  const exerciseMap = new Map<string, ExerciseSummary>()
  const activeDays = new Set<string>()

  let totalReps = 0
  let totalVolume = 0
  let totalDistance = 0

  for (const row of rows) {
    const sessionKey = `${row.title}|${row.start_time}`
    const startDate = parseHevyDate(row.start_time)
    const endDate = parseHevyDate(row.end_time)

    if (startDate) {
      activeDays.add(startDate.toISOString().slice(0, 10))
    }

    if (!sessionMap.has(sessionKey)) {
      sessionMap.set(sessionKey, {
        id: sessionKey,
        title: row.title || 'Workout Session',
        start: startDate ?? new Date(0),
        end: endDate ?? startDate ?? new Date(0),
        sets: 0,
        exercises: 0,
        volume: 0,
      })
    }

    const session = sessionMap.get(sessionKey)
    if (session) {
      session.sets += 1
      if (row.weight_kg > 0 && row.reps > 0) {
        const liftVolume = row.weight_kg * row.reps
        session.volume += liftVolume
        totalVolume += liftVolume
      }
    }

    if (row.reps > 0) {
      totalReps += row.reps
    }

    if (row.distance_km > 0) {
      totalDistance += row.distance_km
    }

    const exerciseName = row.exercise_title || 'Unknown Exercise'
    if (!exerciseMap.has(exerciseName)) {
      exerciseMap.set(exerciseName, {
        name: exerciseName,
        sets: 0,
        reps: 0,
        volume: 0,
      })
    }

    const exercise = exerciseMap.get(exerciseName)
    if (exercise) {
      exercise.sets += 1
      exercise.reps += row.reps
      if (row.weight_kg > 0 && row.reps > 0) {
        exercise.volume += row.weight_kg * row.reps
      }
    }
  }

  const sessions = Array.from(sessionMap.values()).sort((a, b) => b.start.getTime() - a.start.getTime())
  for (const session of sessions) {
    const inSession = rows.filter((row) => `${row.title}|${row.start_time}` === session.id)
    session.exercises = new Set(inSession.map((row) => row.exercise_title || 'Unknown Exercise')).size
  }

  const topExercises = Array.from(exerciseMap.values())
    .sort((a, b) => b.sets - a.sets)
    .slice(0, 6)

  const recentSessions = sessions.slice(0, 4)
  const weeklyStats = buildWeeklyStats(sessions)
  const maxExerciseSets = topExercises[0]?.sets ?? 1
  const maxWeeklySessions = Math.max(1, ...weeklyStats.map((item) => item.sessions))

  const totalSessions = sessions.length
  const totalSets = rows.length
  const totalHours = sessions.reduce((sum, session) => {
    const diffMs = session.end.getTime() - session.start.getTime()
    if (!Number.isFinite(diffMs) || diffMs <= 0) {
      return sum
    }
    return sum + diffMs / (1000 * 60 * 60)
  }, 0)

  const avgSetsPerSession = totalSessions > 0 ? totalSets / totalSessions : 0
  const avgVolumePerSession = totalSessions > 0 ? totalVolume / totalSessions : 0
  const mostFrequentExercise = topExercises[0]?.name ?? 'N/A'

  return (
    <div style={styles.container} className="layout-container">
      <main style={styles.rightContent} className="layout-main">
        <header style={styles.header}>
          <Link href="/" style={styles.workoutBackLink}>
            Back to home page
          </Link>

          <ThemeSwitcher />
        </header>

        <section style={styles.workoutMain}>
          <div style={styles.workoutTitleRow}>
            <h1 style={{ ...styles.title, marginBottom: 0 }}>Workout Dashboard</h1>
            <p style={styles.workoutSubtleText}>Generated from Hevy + Strava</p>
          </div>

          <div style={styles.workoutKpiGrid}>
            <article style={styles.workoutKpiCard}>
              <p style={styles.workoutKpiLabel}>Total Sessions</p>
              <p style={styles.workoutKpiValue}>{formatNumber(totalSessions)}</p>
              <p style={styles.workoutKpiHint}>{formatNumber(activeDays.size)} active days</p>
            </article>

            <article style={styles.workoutKpiCard}>
              <p style={styles.workoutKpiLabel}>Sets Logged</p>
              <p style={styles.workoutKpiValue}>{formatNumber(totalSets)}</p>
              <p style={styles.workoutKpiHint}>{avgSetsPerSession.toFixed(1)} avg / session</p>
            </article>

            <article style={styles.workoutKpiCard}>
              <p style={styles.workoutKpiLabel}>Volume</p>
              <p style={styles.workoutKpiValue}>{formatNumber(Math.round(totalVolume))} kg</p>
              <p style={styles.workoutKpiHint}>{formatNumber(Math.round(avgVolumePerSession))} kg avg / session</p>
            </article>

            <article style={styles.workoutKpiCard}>
              <p style={styles.workoutKpiLabel}>Training Time</p>
              <p style={styles.workoutKpiValue}>{totalHours.toFixed(1)} h</p>
              <p style={styles.workoutKpiHint}>{totalDistance.toFixed(1)} km cardio distance</p>
            </article>
          </div>

          <div style={styles.workoutStatusText}>
            Strava: {stravaSummary.connected ? `Connected${stravaSummary.athleteName ? ` as ${stravaSummary.athleteName}` : ''}` : 'Not connected (set STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN)'}
          </div>

          <div style={styles.workoutStravaGrid}>
            <article style={styles.workoutStravaCard}>
              <p style={styles.workoutKpiLabel}>Strava All-Time Distance</p>
              <p style={styles.workoutStravaValue}>{formatNumber(Math.round(stravaSummary.allTimeDistanceKm))} km</p>
              <p style={styles.workoutKpiHint}>Run + Ride + Swim</p>
            </article>

            <article style={styles.workoutStravaCard}>
              <p style={styles.workoutKpiLabel}>Strava YTD Activities</p>
              <p style={styles.workoutStravaValue}>{formatNumber(stravaSummary.ytdActivities)}</p>
              <p style={styles.workoutKpiHint}>Current year</p>
            </article>

            <article style={styles.workoutStravaCard}>
              <p style={styles.workoutKpiLabel}>Strava YTD Distance</p>
              <p style={styles.workoutStravaValue}>{formatNumber(Math.round(stravaSummary.ytdDistanceKm))} km</p>
              <p style={styles.workoutKpiHint}>Current year total</p>
            </article>
          </div>

          <div style={styles.workoutPanelGrid}>
            <section style={styles.workoutPanel}>
              <h2 style={styles.workoutPanelTitle}>Top Exercises</h2>
              <div style={styles.workoutBarList}>
                {topExercises.map((exercise) => {
                  const width = `${Math.max(8, (exercise.sets / maxExerciseSets) * 100)}%`

                  return (
                    <div key={exercise.name} style={styles.workoutBarRow}>
                      <div style={styles.workoutBarRowMeta}>
                        <span style={{ ...styles.workoutTableCellStrong, fontSize: '13px' }}>{exercise.name}</span>
                        <span style={styles.workoutSessionMeta}>{formatNumber(exercise.sets)} sets</span>
                      </div>
                      <div style={styles.workoutBarTrack}>
                        <div style={{ ...styles.workoutBarFill, width }} />
                      </div>
                      <div style={styles.workoutBarRowMeta}>
                        <span style={styles.workoutSubtleText}>{formatNumber(exercise.reps)} reps</span>
                        <span style={styles.workoutSubtleText}>{formatNumber(Math.round(exercise.volume))} kg</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section style={styles.workoutPanel}>
              <h2 style={styles.workoutPanelTitle}>8 Week Activity</h2>
              <div style={styles.workoutWeekChart}>
                {weeklyStats.map((week) => {
                  const height = `${Math.max(10, (week.sessions / maxWeeklySessions) * 100)}%`

                  return (
                    <div key={week.key} style={styles.workoutWeekColumn}>
                      <div style={styles.workoutWeekColumnInner}>
                        <div style={{ ...styles.workoutWeekBar, height }} title={`${week.sessions} sessions`} />
                      </div>
                      <span style={styles.workoutWeekLabel}>{week.label}</span>
                    </div>
                  )
                })}
              </div>

              <h2 style={styles.workoutPanelTitle}>Recent Sessions</h2>
              <ul style={styles.workoutList}>
                {recentSessions.map((session) => (
                  <li key={session.id} style={styles.workoutSessionItem}>
                    <div style={styles.workoutSessionHeader}>
                      <p style={styles.workoutSessionTitle}>{session.title}</p>
                      <span style={styles.workoutSessionMeta}>{formatSessionDate(session.start)}</span>
                    </div>
                    <div style={styles.workoutBadgeRow}>
                      <span style={styles.workoutBadge}>{formatNumber(session.sets)} sets</span>
                      <span style={styles.workoutBadge}>{formatNumber(session.exercises)} exercises</span>
                      <span style={styles.workoutBadge}>{formatNumber(Math.round(session.volume))} kg volume</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ ...styles.workoutSubtleText, marginTop: 'auto' }}>
                Most frequent: <strong style={styles.bold}>{mostFrequentExercise}</strong> · Total reps: {formatNumber(totalReps)}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

async function loadWorkoutRows(): Promise<WorkoutRow[]> {
  const csvPath = path.join(process.cwd(), 'public', 'workout_data.csv')
  const raw = await readFile(csvPath, 'utf8')
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0)

  if (lines.length < 2) {
    return []
  }

  const headers = parseCsvLine(lines[0])
  const rows: WorkoutRow[] = []

  for (const line of lines.slice(1)) {
    const values = parseCsvLine(line)
    const record: Record<string, string> = {}

    for (let i = 0; i < headers.length; i += 1) {
      record[headers[i]] = values[i] ?? ''
    }

    rows.push({
      title: record.title ?? '',
      start_time: record.start_time ?? '',
      end_time: record.end_time ?? '',
      exercise_title: record.exercise_title ?? '',
      weight_kg: toNumber(record.weight_kg),
      reps: toNumber(record.reps),
      distance_km: toNumber(record.distance_km),
      duration_seconds: toNumber(record.duration_seconds),
    })
  }

  return rows
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      const nextChar = line[i + 1]
      if (inQuotes && nextChar === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
      continue
    }

    current += char
  }

  result.push(current)
  return result
}

function parseHevyDate(value: string): Date | null {
  const match = value.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4}),\s(\d{2}):(\d{2})$/)
  if (!match) {
    return null
  }

  const day = Number(match[1])
  const monthText = match[2]
  const year = Number(match[3])
  const hours = Number(match[4])
  const minutes = Number(match[5])

  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }

  const month = months[monthText]
  if (month === undefined) {
    return null
  }

  const date = new Date(year, month, day, hours, minutes)
  return Number.isNaN(date.getTime()) ? null : date
}

function toNumber(value: string | undefined): number {
  if (!value) {
    return 0
  }
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function buildWeeklyStats(sessions: SessionSummary[]): WeeklyStat[] {
  if (sessions.length === 0) {
    return []
  }

  const latest = sessions[0].start
  const endWeekStart = getWeekStart(latest)
  const buckets: WeeklyStat[] = []

  for (let i = 7; i >= 0; i -= 1) {
    const weekStart = new Date(endWeekStart)
    weekStart.setDate(endWeekStart.getDate() - i * 7)
    buckets.push({
      key: weekStart.toISOString().slice(0, 10),
      label: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessions: 0,
      volume: 0,
    })
  }

  const bucketMap = new Map<string, WeeklyStat>()
  for (const bucket of buckets) {
    bucketMap.set(bucket.key, bucket)
  }

  for (const session of sessions) {
    if (Number.isNaN(session.start.getTime())) {
      continue
    }
    const weekKey = getWeekStart(session.start).toISOString().slice(0, 10)
    const bucket = bucketMap.get(weekKey)
    if (!bucket) {
      continue
    }
    bucket.sessions += 1
    bucket.volume += session.volume
  }

  return buckets
}

function getWeekStart(date: Date): Date {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = normalized.getDay()
  const offset = day === 0 ? -6 : 1 - day
  normalized.setDate(normalized.getDate() + offset)
  return normalized
}

async function loadStravaSummary(): Promise<StravaSummary> {
  const accessToken = await getStravaAccessToken()
  if (!accessToken) {
    return {
      connected: false,
      athleteName: null,
      allTimeDistanceKm: 0,
      ytdActivities: 0,
      ytdDistanceKm: 0,
    }
  }

  try {
    const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    if (!athleteResponse.ok) {
      throw new Error('Failed to fetch athlete profile')
    }

    const athlete = (await athleteResponse.json()) as { id: number; firstname?: string; lastname?: string }
    const athleteName = [athlete.firstname, athlete.lastname].filter(Boolean).join(' ').trim() || null

    const activities = await loadStravaActivities(accessToken)
    const currentYear = new Date().getFullYear()

    let allTimeMeters = 0
    let ytdMeters = 0
    let ytdActivities = 0

    for (const activity of activities) {
      if (activity.distance > 0) {
        allTimeMeters += activity.distance
        if (new Date(activity.start_date).getFullYear() === currentYear) {
          ytdMeters += activity.distance
        }
      }

      if (new Date(activity.start_date).getFullYear() === currentYear) {
        ytdActivities += 1
      }
    }

    return {
      connected: true,
      athleteName,
      allTimeDistanceKm: allTimeMeters / 1000,
      ytdActivities,
      ytdDistanceKm: ytdMeters / 1000,
    }
  } catch {
    return {
      connected: false,
      athleteName: null,
      allTimeDistanceKm: 0,
      ytdActivities: 0,
      ytdDistanceKm: 0,
    }
  }
}

async function loadStravaActivities(accessToken: string): Promise<Array<{ distance: number; start_date: string }>> {
  const activities: Array<{ distance: number; start_date: string }> = []

  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=${page}&before=${Math.floor(Date.now() / 1000)}&after=0`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      break
    }

    const pageActivities = (await response.json()) as Array<{ distance?: number; start_date?: string }>
    if (pageActivities.length === 0) {
      break
    }

    for (const activity of pageActivities) {
      if (typeof activity.distance !== 'number' || !activity.start_date) {
        continue
      }
      activities.push({
        distance: activity.distance,
        start_date: activity.start_date,
      })
    }

    if (pageActivities.length < 100) {
      break
    }
  }

  return activities
}

async function getStravaAccessToken(): Promise<string | null> {
  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return null
  }

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { access_token?: string }
    return data.access_token ?? null
  } catch {
    return null
  }
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatSessionDate(value: Date): string {
  if (Number.isNaN(value.getTime())) {
    return 'Unknown date'
  }

  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
