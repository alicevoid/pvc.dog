import { posts } from '$lib/posts';

// site info for the feed
const site_url = 'https://pvc.dog';
const site_title = "alicevoid's blog";
const site_description = "random stuff i do for fun";

export const prerender = true;

export function GET() {
    const items = posts.map(post => `
        <item>
            <title>${escape_xml(post.title)}</title>
            <link>${site_url}</link>
            <description>${escape_xml(post.content)}</description>
            <pubDate>${format_date(post.date)}</pubDate>
        </item>
    `).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>${site_title}</title>
        <link>${site_url}</link>
        <description>${site_description}</description>
        ${items}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}

// convert "MM/DD/YYYY" to RSS-friendly date format
function format_date(date_str: string): string {
    const [month, day, year] = date_str.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toUTCString();
}

// escape special xml characters
function escape_xml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
