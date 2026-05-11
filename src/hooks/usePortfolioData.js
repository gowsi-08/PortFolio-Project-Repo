import { useMemo } from 'react';
import yaml from 'js-yaml';
import rawYaml from '../data/portfolio.yaml?raw';

/**
 * usePortfolioData
 * Parses the portfolio.yaml file at runtime (imported as raw text via ?raw)
 * and returns the structured data object.
 *
 * Usage:
 *   const data = usePortfolioData();
 *   console.log(data.personal.name);
 */
export function usePortfolioData() {
  const data = useMemo(() => {
    try {
      return yaml.load(rawYaml);
    } catch (err) {
      console.error('[usePortfolioData] Failed to parse portfolio.yaml:', err);
      return {};
    }
  }, []);

  return data;
}
