import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface SeoAnalyzerProps {
  title: string;
  description: string;
  slug: string;
  content: string;
}

export default function SeoAnalyzer({ title = '', description = '', slug = '', content = '' }: SeoAnalyzerProps) {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [score, setScore] = useState(0);

  // Checks
  const [checks, setChecks] = useState({
    titleHasKeyword: false,
    descHasKeyword: false,
    urlHasKeyword: false,
    contentHasKeyword: false,
    contentLength: false,
    keywordDensity: false,
  });

  useEffect(() => {
    if (!focusKeyword.trim()) {
      setScore(0);
      setChecks({
        titleHasKeyword: false,
        descHasKeyword: false,
        urlHasKeyword: false,
        contentHasKeyword: false,
        contentLength: false,
        keywordDensity: false,
      });
      return;
    }

    const keyword = focusKeyword.toLowerCase().trim();
    const t = title.toLowerCase();
    const d = description.toLowerCase();
    const s = slug.toLowerCase();
    const c = content.toLowerCase();

    // Calculate Content Word Count
    const wordCount = content.trim().split(/\s+/).length;
    
    // Calculate Keyword Density
    const keywordMatches = (c.match(new RegExp(keyword, 'g')) || []).length;
    const density = wordCount > 0 ? (keywordMatches / wordCount) * 100 : 0;

    const newChecks = {
      titleHasKeyword: t.includes(keyword),
      descHasKeyword: d.includes(keyword),
      urlHasKeyword: s.includes(keyword.replace(/\s+/g, '-')),
      contentHasKeyword: c.indexOf(keyword) > -1 && c.indexOf(keyword) < 500, // Early appearance
      contentLength: wordCount > 300,
      keywordDensity: density >= 0.5 && density <= 2.5,
    };

    setChecks(newChecks);

    // Calculate score
    let totalScore = 0;
    if (newChecks.titleHasKeyword) totalScore += 20;
    if (newChecks.descHasKeyword) totalScore += 20;
    if (newChecks.urlHasKeyword) totalScore += 15;
    if (newChecks.contentHasKeyword) totalScore += 15;
    if (newChecks.contentLength) totalScore += 15;
    if (newChecks.keywordDensity) totalScore += 15;

    setScore(totalScore);

  }, [focusKeyword, title, description, slug, content]);

  const getScoreColor = () => {
    if (!focusKeyword) return 'text-slate-300 stroke-slate-200';
    if (score >= 80) return 'text-green-500 stroke-green-500';
    if (score >= 50) return 'text-yellow-500 stroke-yellow-500';
    return 'text-red-500 stroke-red-500';
  };

  const getScoreBg = () => {
    if (!focusKeyword) return 'bg-slate-100';
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const CheckItem = ({ label, passed, empty }: { label: string, passed: boolean, empty?: boolean }) => (
    <div className="flex items-start gap-2 text-sm">
      {empty ? (
        <AlertCircle size={16} className="text-slate-300 mt-0.5 shrink-0" />
      ) : passed ? (
        <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
      ) : (
        <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
      )}
      <span className={empty ? 'text-slate-400' : 'text-slate-700'}>{label}</span>
    </div>
  );

  return (
    <div className={`rounded-xl shadow-sm border p-6 space-y-6 transition-colors duration-300 ${getScoreBg()}`}>
      <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
        <h2 className="text-lg font-bold text-slate-800">SEO Analyzer</h2>
        
        {/* Circular Progress */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-slate-200/50"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`${getScoreColor()} transition-all duration-1000 ease-out`}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className={`absolute text-sm font-bold ${getScoreColor().split(' ')[0]}`}>
            {score}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Focus Keyword</label>
        <input
          type="text"
          value={focusKeyword}
          onChange={(e) => setFocusKeyword(e.target.value)}
          placeholder="e.g. sustainability report"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0066FF] outline-none bg-white"
        />
        <p className="text-xs text-slate-500">Enter a keyword to calculate your SEO score.</p>
      </div>

      <div className="space-y-3 pt-2">
        <CheckItem 
          label="Focus keyword found in Title" 
          passed={checks.titleHasKeyword} 
          empty={!focusKeyword} 
        />
        <CheckItem 
          label="Focus keyword found in Meta Description" 
          passed={checks.descHasKeyword} 
          empty={!focusKeyword} 
        />
        <CheckItem 
          label="Focus keyword found in URL Slug" 
          passed={checks.urlHasKeyword} 
          empty={!focusKeyword} 
        />
        <CheckItem 
          label="Focus keyword appears in first 10% of content" 
          passed={checks.contentHasKeyword} 
          empty={!focusKeyword} 
        />
        <CheckItem 
          label="Content is at least 300 words long" 
          passed={checks.contentLength} 
          empty={!focusKeyword} 
        />
        <CheckItem 
          label="Keyword density is between 0.5% and 2.5%" 
          passed={checks.keywordDensity} 
          empty={!focusKeyword} 
        />
      </div>
    </div>
  );
}
