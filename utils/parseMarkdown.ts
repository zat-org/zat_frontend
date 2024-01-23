import markdownParser from '@nuxt/content/transformers/markdown'
import { ParsedContent } from '@nuxt/content/types'
const parseMarkdown = (md: string): ParsedContent | Promise<ParsedContent> | null => {
    if (markdownParser && markdownParser.parse && md && md.length > 0)
        return markdownParser.parse('custom.md', md, {});
    return null;
}
export { parseMarkdown }