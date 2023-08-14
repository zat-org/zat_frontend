import markdownParser from '@nuxt/content/transformers/markdown'
import { ParsedContent } from '@nuxt/content/types'
export const parseMarkdown = (md: string): ParsedContent | Promise<ParsedContent> | null => {
    if (markdownParser && markdownParser.parse)
        return markdownParser.parse('custom.md', md, {});
    return null;
}