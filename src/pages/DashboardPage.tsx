import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { useContacts } from '../features/contacts/hooks/useContacts';
import { getContactSummary } from '../features/dashboard/utils/getContactSummary';
import { getDashboardInsights } from '../features/dashboard/utils/getDashboardInsights';

export function DashboardPage() {
  const { data: contacts = [], isPending, isError, refetch } = useContacts();
  if (isPending) return <LoadingState message="Loading dashboard..." />;
  if (isError)
    return (
      <ErrorState message="Unable to load dashboard." onRetry={() => void refetch()} />
    );

  const summary = getContactSummary(contacts);
  const insights = getDashboardInsights(contacts);

  return (
    <main className="dashboard-page">
      <header className="dashboard-hero">
        <div>
          <p className="eyebrow">Orbit intelligence</p>
          <h1>
            Your relationships,
            <br />
            <em>in focus.</em>
          </h1>
        </div>
        <p className="dashboard-intro">
          A clear view of your customer universe, from first conversation to lasting
          partnership.
        </p>
      </header>

      <section className="dashboard-overview" aria-labelledby="overview-title">
        <div className="dashboard-section-heading">
          <div>
            <p className="eyebrow">At a glance</p>
            <h2 id="overview-title">Relationship health</h2>
          </div>
          <span className="dashboard-live-indicator">Live portfolio</span>
        </div>

        <div className="dashboard-metrics" aria-label="CRM summary">
          <article className="metric-card metric-card--pipeline">
            <span>Pipeline value</span>
            <strong>
              {summary.pipelineValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </strong>
            <small>Across every active relationship</small>
          </article>
          <article className="metric-card">
            <span>Total contacts</span>
            <strong>{summary.totalContacts}</strong>
            <small>People in your orbit</small>
          </article>
          <article className="metric-card">
            <span>Leads</span>
            <strong>{summary.leads}</strong>
            <small>Early-stage conversations</small>
          </article>
          <article className="metric-card">
            <span>Qualified</span>
            <strong>{summary.qualified}</strong>
            <small>Ready for the next step</small>
          </article>
          <article className="metric-card metric-card--customers">
            <span>Customers</span>
            <strong>{summary.customers}</strong>
            <small>Growing with you</small>
          </article>
        </div>

        <div className="dashboard-detail-grid">
          <section className="dashboard-panel" aria-labelledby="activity-title">
            <div className="dashboard-panel__header">
              <h2 id="activity-title">Recent activity</h2>
              <span>Last touchpoints</span>
            </div>
            <ul className="activity-list">
              {insights.recentContacts.map((contact) => (
                <li key={contact.id}>
                  <span className="activity-list__initials" aria-hidden="true">
                    {contact.fullName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <span>
                    <strong>{contact.fullName}</strong>
                    <small>{contact.company}</small>
                  </span>
                  <time dateTime={contact.lastActivity}>{contact.lastActivity}</time>
                </li>
              ))}
            </ul>
          </section>

          <section className="dashboard-panel" aria-labelledby="pipeline-title">
            <div className="dashboard-panel__header">
              <h2 id="pipeline-title">Pipeline composition</h2>
              <span>By relationship stage</span>
            </div>
            <div className="stage-breakdown">
              {insights.stageCounts.map(({ stage, count }) => (
                <div className="stage-breakdown__row" key={stage}>
                  <span>{stage}</span>
                  <div
                    aria-label={`${count} ${stage} contacts`}
                    className="stage-breakdown__track"
                  >
                    <i
                      style={{
                        width: `${contacts.length ? (count / contacts.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </section>

          <section
            className="dashboard-panel dashboard-panel--value"
            aria-labelledby="value-title"
          >
            <div className="dashboard-panel__header">
              <h2 id="value-title">High-value relationships</h2>
              <span>Largest opportunities</span>
            </div>
            <ol className="value-list">
              {insights.highValueContacts.map((contact, index) => (
                <li key={contact.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{contact.fullName}</strong>
                  <em>
                    {contact.potentialValue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    })}
                  </em>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}
