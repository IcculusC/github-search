declare module "sanitize-html" {
  export interface ISanitizeHTMLOptions {
    allowedTags: string[];
  }
  export default function(html: string, options: ISanitizeHTMLOptions): string;
}
