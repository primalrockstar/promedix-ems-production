// ProMedix EMS Search Engine (clean minimal version)
export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'flashcard' | 'study-notes' | 'calculator' | 'medication' | 'protocol' | 'scenario';
  category: string;
  chapter?: number;
  url: string;
  relevanceScore: number;
  snippet: string;
  tags?: string[];
}

export interface SearchFilters {
  types: string[];
  chapters: number[];
  categories: string[];
  minScore: number;
}

interface SearchableContent {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  chapter?: number;
  url: string;
  tags?: string[];
}

class SearchEngine {
  private searchableContent: SearchableContent[] = [];
  private isIndexed = false;

  constructor() {
    try {
      this.initializeSearch();
    } catch (e) {
      // Fail-safe: continue with empty index
      console.warn('Search init failed; continuing with empty index');
    }
  }

  private async initializeSearch() {
    if (this.isIndexed) return;
    await this.indexContent();
    this.isIndexed = true;
  }

  private async indexContent() {
    // Lightweight seed content to ensure search works even if full datasets are unavailable
    this.searchableContent = [
      {
        id: 'airway-1',
        title: 'Airway Management',
        content: 'Basic airway management techniques including positioning, suctioning, and adjuncts',
        type: 'study-notes',
        category: 'Airway',
        chapter: 1,
        url: '/emtb',
        tags: ['airway', 'breathing', 'basic']
      },
      {
        id: 'cpr-1',
        title: 'CPR Protocols',
        content: 'Adult, child, and infant CPR procedures and compression rates',
        type: 'protocol',
        category: 'Cardiac',
        chapter: 2,
        url: '/protocols',
        tags: ['cpr', 'cardiac', 'resuscitation']
      },
      {
        id: 'meds-1',
        title: 'EMT Medications',
        content: 'Common EMT-B medications including aspirin, nitroglycerin, and epinephrine',
        type: 'medication',
        category: 'Pharmacology',
        chapter: 5,
        url: '/medications',
        tags: ['medications', 'drugs', 'pharmacology']
      }
    ];
  }

  search(query: string, filters?: SearchFilters): SearchResult[] {
    const q = (query || '').trim();
    if (q.length < 2) return [];

    const full = q.toLowerCase();
    const terms = this.extractKeywords(full);

    let results = this.searchableContent
      .map((item) => ({
        ...item,
        relevanceScore: this.score(item, terms, full),
      }))
      .filter((i) => i.relevanceScore > 0);

    if (filters) {
      const { types = [], chapters = [], categories = [], minScore = 0 } = filters;
      if (types.length) results = results.filter((i) => types.includes(i.type));
      if (chapters.length) results = results.filter((i) => i.chapter && chapters.includes(i.chapter));
      if (categories.length) results = results.filter((i) => categories.some((c) => i.category.toLowerCase().includes(c.toLowerCase())));
      if (minScore > 0) results = results.filter((i) => i.relevanceScore >= minScore);
    }

    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return results.slice(0, 50).map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      type: item.type as any,
      category: item.category,
      chapter: item.chapter,
      url: item.url,
      relevanceScore: item.relevanceScore,
      snippet: this.snippet(item.content, q),
      tags: item.tags,
    }));
  }

  getSearchSuggestions(query: string): string[] {
    const q = (query || '').trim();
    if (q.length < 2) return [];
    const ql = q.toLowerCase();

    const set = new Set<string>();
    this.searchableContent.forEach((item) => {
      if (item.title.toLowerCase().includes(ql)) set.add(item.title);
      if (item.category.toLowerCase().includes(ql)) set.add(item.category);
      item.tags?.forEach((t) => t.toLowerCase().includes(ql) && set.add(t));
    });

    const common = ['airway management', 'cpr', 'vital signs', 'trauma assessment', 'oxygen therapy'];
    common.forEach((c) => c.includes(ql) && set.add(c));

    return Array.from(set).slice(0, 8);
  }

  getPopularSearches(): string[] {
    return ['airway management', 'cardiac arrest', 'trauma assessment', 'vital signs', 'cpr protocols'];
  }

  private extractKeywords(text: string): string[] {
    const stop = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stop.has(w));
  }

  private score(item: SearchableContent, terms: string[], full: string): number {
    let s = 0;
    const title = item.title.toLowerCase();
    const content = item.content.toLowerCase();
    const tags = (item.tags || []).map((t) => t.toLowerCase());

    if (title.includes(full)) s += 100;
    if (content.includes(full)) s += 50;
    if (tags.some((t) => t.includes(full))) s += 75;

    terms.forEach((t) => {
      if (title.includes(t)) s += 25;
      if (content.includes(t)) s += 10;
      if (tags.some((tg) => tg.includes(t))) s += 20;
      if (item.category.toLowerCase().includes(t)) s += 15;
    });

    return s;
  }

  private snippet(content: string, q: string): string {
    const max = 150;
    const cl = content.toLowerCase();
    const ql = q.toLowerCase();
    const i = cl.indexOf(ql);
    if (i === -1) return content.length <= max ? content : content.slice(0, max) + '...';
    const start = Math.max(0, i - 50);
    const end = Math.min(content.length, i + q.length + 50);
    return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
  }
}

export const searchEngine = new SearchEngine();
export default searchEngine;
