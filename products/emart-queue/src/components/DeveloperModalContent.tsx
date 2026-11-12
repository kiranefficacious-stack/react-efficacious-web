import { useState } from 'react';
import { 
  Code2, Terminal, Webhook, Activity, History, Cookie, 
  CheckCircle2, ExternalLink, Copy, Check, Server, ShieldCheck, Cpu, Smartphone
} from 'lucide-react';

export type DevModalType = 'api' | 'sdk' | 'webhooks' | 'status' | 'changelog' | 'cookie';

interface DeveloperModalContentProps {
  type: DevModalType;
  onNavigateContact?: () => void;
}

export function DeveloperModalContent({ type, onNavigateContact }: DeveloperModalContentProps) {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  switch (type) {
    case 'api':
      return (
        <div className="space-y-6 text-slate-600">
          <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl border border-primary-100">
            <Code2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">REST API v1.0</h4>
              <p className="text-xs text-slate-500">
                Integrate appointments, live queue positions, and QR ticket verification into your software or kiosk.
              </p>
            </div>
            <a 
              href="/swagger" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Swagger Docs <ExternalLink size={12} />
            </a>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-2">Base Endpoint URL</h5>
            <div className="flex items-center justify-between p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono">
              <code>https://api.efficacious.co.in/api/v1/queue</code>
              <button 
                onClick={() => copyToClipboard('https://api.efficacious.co.in/api/v1/queue', 'base')}
                className="text-slate-400 hover:text-white p-1"
                title="Copy base URL"
              >
                {copiedSnippet === 'base' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-2">Key Endpoints</h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3 flex items-start gap-3">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">GET</span>
                <div>
                  <code className="font-bold text-slate-800">/slots/available</code>
                  <p className="text-slate-500 mt-0.5">Query available appointment dates and counter slots by branch ID.</p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-3">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded">POST</span>
                <div>
                  <code className="font-bold text-slate-800">/tickets/book</code>
                  <p className="text-slate-500 mt-0.5">Issue a new digital ticket pass with encrypted QR payload.</p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-3">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">GET</span>
                <div>
                  <code className="font-bold text-slate-800">/tickets/&#123;ticketId&#125;/status</code>
                  <p className="text-slate-500 mt-0.5">Fetch real-time wait duration, current ticket serving, and remaining queue size.</p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-3">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">POST</span>
                <div>
                  <code className="font-bold text-slate-800">/kiosk/scan-pass</code>
                  <p className="text-slate-500 mt-0.5">Verify QR code at entrance turnstile or counter tablet scanner.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Need an API key or dedicated sandbox?</span>
            <p className="text-slate-500 mb-2">Enterprise customers receive production credentials with high-throughput rate limits.</p>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateContact) onNavigateContact();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-primary-600 font-bold hover:underline"
            >
              Contact our engineering team &rarr;
            </a>
          </div>
        </div>
      );

    case 'sdk':
      return (
        <div className="space-y-6 text-slate-600">
          <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <Smartphone className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Official Queue SDKs</h4>
              <p className="text-xs text-slate-500">
                Plug-and-play mobile & web libraries with native QR generation, camera scanning, and WebSocket listeners.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Terminal size={16} className="text-slate-500" /> Web / React / Node.js
                </span>
                <span className="text-[10px] bg-slate-100 font-mono px-2 py-0.5 rounded text-slate-600">npm</span>
              </div>
              <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono flex items-center justify-between">
                <code>npm install @efficacious/smartqueue-sdk</code>
                <button 
                  onClick={() => copyToClipboard('npm install @efficacious/smartqueue-sdk', 'npm')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedSnippet === 'npm' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Smartphone size={16} className="text-slate-500" /> iOS (Swift / CocoaPods)
                </span>
                <span className="text-[10px] bg-slate-100 font-mono px-2 py-0.5 rounded text-slate-600">pod</span>
              </div>
              <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono flex items-center justify-between">
                <code>pod 'EfficaciousSmartQueue', '~&gt; 2.4.0'</code>
                <button 
                  onClick={() => copyToClipboard("pod 'EfficaciousSmartQueue', '~> 2.4.0'", 'pod')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedSnippet === 'pod' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Cpu size={16} className="text-slate-500" /> Android (Kotlin / Gradle)
                </span>
                <span className="text-[10px] bg-slate-100 font-mono px-2 py-0.5 rounded text-slate-600">gradle</span>
              </div>
              <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono flex items-center justify-between">
                <code>implementation 'com.efficacious:smartqueue-android:2.4.0'</code>
                <button 
                  onClick={() => copyToClipboard("implementation 'com.efficacious:smartqueue-android:2.4.0'", 'gradle')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedSnippet === 'gradle' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'webhooks':
      return (
        <div className="space-y-6 text-slate-600">
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <Webhook className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Real-time Webhook Subscriptions</h4>
              <p className="text-xs text-slate-500">
                Receive instant HTTP POST callbacks when queues advance, appointments update, or tickets finish.
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-2">Available Event Triggers</h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3">
                <code className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">queue.ticket.created</code>
                <p className="text-slate-500 mt-1">Dispatched immediately when a user confirms an appointment slot.</p>
              </div>
              <div className="p-3">
                <code className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">queue.ticket.called</code>
                <p className="text-slate-500 mt-1">Dispatched when teller/operator calls the ticket to counter display.</p>
              </div>
              <div className="p-3">
                <code className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">queue.ticket.completed</code>
                <p className="text-slate-500 mt-1">Triggered when consultation/transaction finishes to sync CRM or billing.</p>
              </div>
              <div className="p-3">
                <code className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">queue.ticket.no_show</code>
                <p className="text-slate-500 mt-1">Triggered if customer fails to appear within grace period.</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-2">Sample Webhook Payload</h5>
            <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto">
{`{
  "event": "queue.ticket.called",
  "timestamp": "${new Date().toISOString()}",
  "branch_id": "BR_PANVEL_01",
  "counter_number": 4,
  "ticket": {
    "id": "TKT-884920",
    "token_number": "A-042",
    "customer_name": "Rohan Sharma",
    "service_category": "Account Opening",
    "status": "CALLED"
  }
}`}
            </pre>
          </div>
        </div>
      );

    case 'status':
      return (
        <div className="space-y-6 text-slate-600">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">All Systems Operational</h4>
                <p className="text-xs text-emerald-700">99.98% average uptime over the past 90 days.</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-white px-2.5 py-1 rounded-md text-emerald-800 border border-emerald-200 font-bold">
              HEALTHY
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Core API Gateway (Port 5231 / SSL)', status: 'Operational', latency: '24ms' },
              { name: 'Real-time WebSocket Queue Cluster', status: 'Operational', latency: '18ms' },
              { name: 'QR Code Generation & Cryptographic Verification', status: 'Operational', latency: '9ms' },
              { name: 'SMS & WhatsApp Notification Gateway', status: 'Operational', latency: '99.4% Delivery' },
              { name: 'Mobile App Store & Google Play Sync Services', status: 'Operational', latency: 'Normal' },
              { name: 'Cloud Relational Database & Read Replicas', status: 'Operational', latency: 'Connected' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-slate-800">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono">{item.latency}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center">
            Automated monitoring runs every 60 seconds across cloud availability zones.
          </p>
        </div>
      );

    case 'changelog':
      return (
        <div className="space-y-6 text-slate-600">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <History className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Release Changelog</h4>
              <p className="text-xs text-slate-500">Continuous updates, performance enhancements, and security upgrades.</p>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 text-xs">
            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-primary-600 ring-4 ring-white" />
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 text-sm">v2.4.2</span>
                <span className="bg-primary-100 text-primary-800 text-[10px] font-bold px-2 py-0.2 rounded-full">Current Release</span>
                <span className="text-slate-400 text-[11px] ml-auto">November 2026</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Optimized high-resolution white logo rendering for dark mode footers.</li>
                <li>Fixed interactive in-page anchor navigation offsets and smooth scroll hooks.</li>
                <li>Added developer resource modals for direct API, SDK, and Webhook inspection.</li>
              </ul>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 text-sm">v2.4.0</span>
                <span className="text-slate-400 text-[11px] ml-auto">October 2026</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Automated WhatsApp appointment confirmations and instant cancellation links.</li>
                <li>Geofence pre-arrival check-ins to automatically alert counter staff when users enter the premises.</li>
                <li>Kiosk self-service check-in app update with thermal printer driver support.</li>
              </ul>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 text-sm">v2.3.0</span>
                <span className="text-slate-400 text-[11px] ml-auto">August 2026</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Multi-counter load balancing algorithms for banking and hospital departments.</li>
                <li>Bi-directional counter reassignment without resetting customer wait positions.</li>
                <li>Comprehensive analytics dashboard for staff throughput and average service intervals.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 'cookie':
      return (
        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <Cookie className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Cookie & Storage Policy</h4>
              <p className="text-xs text-slate-500">How E-Smart Queue uses browser storage to safeguard your sessions.</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2">1. Essential Technical Cookies</h5>
            <p className="text-xs text-slate-500 mb-3">
              These cookies are strictly required to ensure proper queue token generation, authenticate your administrative sessions, and maintain state while navigating the portal.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <span className="font-mono font-bold text-slate-700">_esmart_queue_token</span> &mdash; Secures individual appointment requests and encrypted QR tickets.
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2">2. Performance & Preference Cookies</h5>
            <p className="text-xs text-slate-500 mb-3">
              We store non-intrusive UI preferences, such as selected branch location, active portal views, and accessibility options, to provide a fast, seamless experience.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-2">3. Managing Your Preferences</h5>
            <p className="text-xs text-slate-500">
              You can modify or disable cookies anytime via your browser settings. However, disabling essential cookies may impact real-time ticket notifications and authentication.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

