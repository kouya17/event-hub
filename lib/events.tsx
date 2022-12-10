import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export type MdEventMatter = {
  title: string;
  start: string;
  end?: string;
  actors: string[];
  url: string;
  places: string[];
}

export type MdEventFile = {
  id: string;
  matter: MdEventMatter;
  contentHtml: string;
}

export type MdEvent = {
  file: MdEventFile
}

const eventsDirectory = path.join(process.cwd(), 'events')

export async function getEvents(month: number): Promise<MdEvent[]> {
  const fileNames = fs.readdirSync(eventsDirectory)
  const events: MdEvent[] = await Promise.all(fileNames
    .filter(f => parseInt(f.substring(5, 7)) === month || parseInt(f.substring(22, 24)) === month)
    .map(async (f) => {
      const content = fs.readFileSync(path.join(eventsDirectory, f), 'utf8')
      const matterResult = matter(content)
      return {
        file: {
          id: f.replace(/\.md$/, ''),
          matter: matterResult.data as MdEventMatter,
          contentHtml: await matterResultToHtml(matterResult),
        }
      }
    }))
  return events
}

async function matterResultToHtml(matterResult: matter.GrayMatterFile<string>): Promise<string> {
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown.
    .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
    .use(remarkRehype) // Turn it into HTML.
    .use(rehypeStringify) // Serialize HTML.
    .processSync(matterResult.content)
  return processedContent.toString()
}