import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  pipelineResearch, pipelineRun, pipelineAll,
  getAgents, getAgentCosts, getPillars
} from '@/lib/api';
import {
  Search, Play, Loader2, CheckCircle, XCircle, AlertTriangle,
  Zap, DollarSign, Bot, ArrowRight, RefreshCw, Shield
} from 'lucide-react';
import { toast } from 'sonner';

const STATUS_COLORS = {
  idle: 'bg-stone-100 text-stone-500',
  running: 'bg-blue-100 text-blue-700 animate-pulse',
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  skipped: 'bg-stone-50 text-stone-400',
  gated: 'bg-amber-100 text-amber-700',
};

const STATUS_ICONS = {
  idle: null,
  running: Loader2,
  success: CheckCircle,
  failed: XCircle,
  skipped: null,
  gated: AlertTriangle,
};

export default function AdminPipelinePage() {
  const [pillars, setPillars] = useState([]);
  const [agents, setAgents] = useState({});
  const [costs, setCosts] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [researching, setResearching] = useState(false);
  const [runningPipeline, setRunningPipeline] = useState(false);

  // Research state
  const [keywordInput, setKeywordInput] = useState('');
  const [researchResults, setResearchResults] = useState(null);

  // Pipeline run state
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [pipelineResult, setPipelineResult] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pillarsRes, agentsRes, costsRes, pipelinesRes] = await Promise.all([
        getPillars(),
        getAgents().catch(() => ({ data: {} })),
        getAgentCosts().catch(() => ({ data: { monthly_total: 0, breakdown: {} } })),
        pipelineAll().catch(() => ({ data: [] })),
      ]);
      setPillars(pillarsRes.data);
      setAgents(agentsRes.data);
      setCosts(costsRes.data);
      setPipelines(pipelinesRes.data);
    } catch (err) {
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResearch = async () => {
    if (!keywordInput.trim()) {
      toast.error('Enter a topic area to research');
      return;
    }
    setResearching(true);
    setResearchResults(null);
    try {
      const res = await pipelineResearch(keywordInput);
      setResearchResults(res.data);
      toast.success(`Found ${res.data.topics?.length || 0} topic suggestions`);
    } catch (err) {
      toast.error('Research failed: ' + (err.response?.data?.detail || err.message));
    } finally {
      setResearching(false);
    }
  };

  const handleRunPipeline = async (topic) => {
    setRunningPipeline(true);
    setPipelineResult(null);
    setSelectedTopic(topic);
    try {
      const pillar = pillars.find(p => p.slug === topic.pillar_slug);
      const res = await pipelineRun({
        topic: topic.title,
        pillar_id: pillar?.id || '',
        pillar_slug: topic.pillar_slug,
        keyword_request: topic.keyword,
        auto_publish: false,
      });
      setPipelineResult(res.data);
      if (res.data.success) {
        toast.success('Pipeline complete! Article ready.');
      } else if (res.data.status === 'paused') {
        toast.warning('Pipeline paused — Master Agent needs review.');
      } else {
        toast.error('Pipeline failed: ' + (res.data.error || 'Unknown error'));
      }
      await loadData();
    } catch (err) {
      toast.error('Pipeline error: ' + (err.response?.data?.detail || err.message));
    } finally {
      setRunningPipeline(false);
    }
  };

  const handleQuickPipeline = async () => {
    if (!keywordInput.trim()) {
      toast.error('Enter a topic to write about');
      return;
    }
    setRunningPipeline(true);
    setPipelineResult(null);
    try {
      const res = await pipelineRun({
        keyword_request: keywordInput,
        auto_publish: false,
      });
      setPipelineResult(res.data);
      if (res.data.success) {
        toast.success('Full pipeline complete!');
      } else {
        toast.warning(`Pipeline ${res.data.status}: ${res.data.error || 'Check results'}`);
      }
      await loadData();
    } catch (err) {
      toast.error('Pipeline error: ' + (err.response?.data?.detail || err.message));
    } finally {
      setRunningPipeline(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl" data-testid="pipeline-page">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-stone-900 flex items-center gap-3">
              <Bot size={28} />
              AI Content Pipeline
            </h1>
            <p className="text-stone-500 mt-1">
              19 agents. Research → Write → Quality Check → Publish. Master Agent gates everything.
            </p>
          </div>
          <button
            onClick={loadData}
            className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Cost Overview */}
        {costs && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white border border-stone-200 rounded-sm">
              <DollarSign size={16} className="text-stone-400 mb-2" />
              <p className="text-xl font-serif text-stone-900">${costs.monthly_total?.toFixed(3)}</p>
              <p className="text-xs text-stone-500">Monthly spend</p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-sm">
              <Zap size={16} className="text-stone-400 mb-2" />
              <p className="text-xl font-serif text-stone-900">{Object.keys(agents).length}</p>
              <p className="text-xs text-stone-500">Agents registered</p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded-sm">
              <Shield size={16} className="text-stone-400 mb-2" />
              <p className="text-xl font-serif text-stone-900">{pipelines.length}</p>
              <p className="text-xs text-stone-500">Pipelines run</p>
            </div>
          </div>
        )}

        {/* Research Section */}
        <div className="bg-white border border-stone-200 rounded-sm p-6 mb-8">
          <h2 className="font-serif text-xl text-stone-900 mb-4 flex items-center gap-2">
            <Search size={20} />
            Research Topics
          </h2>
          <p className="text-stone-500 text-sm mb-4">
            Claude finds the best article topics by analyzing search intent, competition, and content gaps for overthinkers.
          </p>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 focus:border-stone-400 outline-none"
              placeholder="e.g., 'overthinking at work' or 'stoic techniques for anxiety'"
              onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
            />
            <button
              onClick={handleResearch}
              disabled={researching}
              className="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 disabled:opacity-50 flex items-center gap-2"
            >
              {researching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Research
            </button>
            <button
              onClick={handleQuickPipeline}
              disabled={runningPipeline || !keywordInput.trim()}
              className="px-6 py-3 bg-green-700 text-white text-sm font-medium rounded-sm hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
              title="Run full pipeline: Research → Write → SEO → Quality Check → Publish"
            >
              {runningPipeline ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              Full Pipeline
            </button>
          </div>

          {/* Research Results */}
          {researchResults?.topics && researchResults.topics.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-stone-700 mb-3">
                Topic Suggestions ({researchResults.topics.length})
              </h3>
              {researchResults.topics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 border border-stone-200 rounded-sm hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900">{topic.title}</h4>
                      <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
                        <span className="px-2 py-0.5 bg-stone-100 rounded">
                          {topic.pillar_slug?.replace(/-/g, ' ')}
                        </span>
                        <span>Keyword: {topic.keyword}</span>
                        <span className={`px-2 py-0.5 rounded ${
                          topic.competition === 'low' ? 'bg-green-100 text-green-700' :
                          topic.competition === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {topic.competition} competition
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          topic.estimated_volume === 'high' ? 'bg-green-100 text-green-700' :
                          'bg-stone-100 text-stone-600'
                        }`}>
                          {topic.estimated_volume} volume
                        </span>
                      </div>
                      {topic.angle && (
                        <p className="text-sm text-stone-500 mt-2">{topic.angle}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRunPipeline(topic)}
                      disabled={runningPipeline}
                      className="ml-4 px-4 py-2 bg-stone-900 text-white text-sm rounded-sm hover:bg-stone-800 disabled:opacity-50 flex items-center gap-1 whitespace-nowrap"
                    >
                      {runningPipeline && selectedTopic?.title === topic.title ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Play size={14} />
                      )}
                      Write This
                    </button>
                  </div>
                </div>
              ))}

              {researchResults.gaps_found?.length > 0 && (
                <div className="mt-4 p-3 bg-stone-50 rounded-sm">
                  <p className="text-xs font-medium text-stone-600 mb-1">Content Gaps Found:</p>
                  <p className="text-sm text-stone-500">
                    {researchResults.gaps_found.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pipeline Result */}
        {pipelineResult && (
          <div className={`border rounded-sm p-6 mb-8 ${
            pipelineResult.success ? 'bg-green-50 border-green-200' :
            pipelineResult.status === 'paused' ? 'bg-amber-50 border-amber-200' :
            'bg-red-50 border-red-200'
          }`}>
            <h2 className="font-serif text-xl text-stone-900 mb-4 flex items-center gap-2">
              {pipelineResult.success ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : pipelineResult.status === 'paused' ? (
                <AlertTriangle size={20} className="text-amber-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
              Pipeline Result: {pipelineResult.status}
            </h2>

            {pipelineResult.article?.title && (
              <div className="mb-4">
                <h3 className="font-medium text-stone-900">{pipelineResult.article.title}</h3>
                <p className="text-sm text-stone-500 mt-1">{pipelineResult.article.excerpt}</p>
                <div className="flex gap-4 mt-2 text-xs text-stone-500">
                  <span>{pipelineResult.article.word_count} words</span>
                  <span>Slug: {pipelineResult.article.slug}</span>
                  <span>Cost: ${pipelineResult.cost?.total?.toFixed(3)}</span>
                </div>
              </div>
            )}

            {/* Scores */}
            {pipelineResult.scores && (
              <div className="grid grid-cols-5 gap-3 mb-4">
                {[
                  { label: 'Brand', value: pipelineResult.scores.brand_score, max: 80, min: 75 },
                  { label: 'SEO', value: pipelineResult.scores.seo_score, max: 100, min: 80 },
                  { label: 'Readability', value: pipelineResult.scores.readability_score, max: 100, min: 70 },
                  { label: 'Originality', value: pipelineResult.scores.originality_score, max: 100, min: 85 },
                  { label: 'Master', value: pipelineResult.scores.master_approved ? 'APPROVED' : 'REJECTED', isBool: true },
                ].map(s => (
                  <div key={s.label} className="text-center p-2 bg-white rounded-sm border border-stone-200">
                    <p className="text-xs text-stone-500">{s.label}</p>
                    <p className={`text-lg font-serif ${
                      s.isBool ? (s.value === 'APPROVED' ? 'text-green-600' : 'text-red-600') :
                      s.value >= s.min ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {s.isBool ? s.value : `${s.value}/${s.max}`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Stage Progress */}
            {pipelineResult.stages && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-stone-600 mb-2">Pipeline Stages:</p>
                <div className="flex flex-wrap gap-1">
                  {pipelineResult.stages.map((stage, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded ${
                        stage.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                      title={stage.error || `${stage.agent} - $${stage.cost}`}
                    >
                      {stage.agent} {stage.success ? '✓' : '✗'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {pipelineResult.error && (
              <p className="mt-3 text-sm text-red-600">{pipelineResult.error}</p>
            )}
          </div>
        )}

        {/* Agent Status Grid */}
        <div className="bg-white border border-stone-200 rounded-sm p-6 mb-8">
          <h2 className="font-serif text-xl text-stone-900 mb-4">All 19 Agents</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(agents).sort((a, b) => {
              const typeOrder = { pipeline: 0, content: 1, platform: 2 };
              return (typeOrder[a.type] || 0) - (typeOrder[b.type] || 0) || a.order - b.order;
            }).map((agent) => {
              const StatusIcon = STATUS_ICONS[agent.status];
              return (
                <div
                  key={agent.id}
                  className="p-3 border border-stone-200 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-stone-900 truncate">{agent.name}</span>
                    {agent.is_gate && <Shield size={12} className="text-amber-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${STATUS_COLORS[agent.status] || 'bg-stone-100'}`}>
                      {StatusIcon && <StatusIcon size={10} className="inline mr-1" />}
                      {agent.status}
                    </span>
                    <span className="text-xs text-stone-400">{agent.type}</span>
                  </div>
                  {agent.last_result && (
                    <p className="text-xs text-stone-400 mt-1">
                      ${agent.last_result.cost?.toFixed(3)} | {agent.last_result.duration_ms}ms
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Pipelines */}
        {pipelines.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-sm p-6">
            <h2 className="font-serif text-xl text-stone-900 mb-4">Recent Pipelines</h2>
            <div className="space-y-2">
              {pipelines.map((p) => (
                <div key={p.pipeline_id} className="flex items-center justify-between p-3 bg-stone-50 rounded-sm">
                  <div>
                    <span className="text-sm font-medium text-stone-900">
                      {p.title || p.topic || p.pipeline_id}
                    </span>
                    <span className={`ml-3 px-2 py-0.5 text-xs rounded ${STATUS_COLORS[p.status] || 'bg-stone-100'}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500">
                    ${p.total_cost?.toFixed(3)} | {p.master_approved ? 'Approved' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
