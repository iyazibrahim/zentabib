import type { SiteContent } from './types';
import defaultsJson from '../../data/site.json';

export function getDefaultSiteContent(): SiteContent {
    return structuredClone(defaultsJson as SiteContent);
}
