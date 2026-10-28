import React, { useState } from 'react';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';
import { KnowledgeArticle } from '../types';
import {
  BookOpen,
  Search,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Shield,
} from 'lucide-react';

export const ScamKnowledgeCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>('phishing-smishing-mechanics');

  const categories = ['All', 'Phishing & Credentials', 'Employment Scams', 'Donation Fraud', 'Financial Fraud', 'Emerging AI Threats', 'Incident Response'];

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.howItOperates.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleToggleArticle = (id: string) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Simple Guides</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          How Scammers Try To Trick You
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          Quick, simple guides showing how bad guys operate, what fake texts look like, and how to protect yourself.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. fake job, fake check, package, crypto, gift cards)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
        </div>

        {/* Categories as clean buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs">
            No guides found matching your search. Try another word!
          </div>
        ) : (
          filteredArticles.map((article: KnowledgeArticle) => {
            const isExpanded = expandedArticleId === article.id;
            return (
              <div
                key={article.id}
                className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-all duration-200"
              >
                {/* Header button */}
                <button
                  onClick={() => handleToggleArticle(article.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                      <span className="text-white font-bold">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-neutral-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-1 text-neutral-400">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Article Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-neutral-800 space-y-5 text-xs sm:text-sm">
                    {/* How It Operates */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>How Scammers Do It:</span>
                      </div>
                      <p className="text-neutral-200 leading-relaxed">
                        {article.howItOperates}
                      </p>
                    </div>

                    {/* Common Red Flags */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Red Flags To Watch Out For:</span>
                      </div>
                      <ul className="space-y-1.5 text-neutral-300 pl-4 list-disc">
                        {article.commonRedFlags.map((flag, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fictional Example */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Fake Example:
                      </div>
                      <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs text-white leading-relaxed">
                        {article.fictionalExample}
                      </div>
                    </div>

                    {/* What to do */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>What You Should Do:</span>
                      </div>
                      <ol className="space-y-1.5 text-neutral-300 pl-4 list-decimal">
                        {article.verificationSteps.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* If Already Tricked */}
                    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-white" />
                        <span>If You Already Clicked or Sent Money:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-neutral-400 pl-4 list-disc">
                        {article.harmReduction.map((hr, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {hr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
