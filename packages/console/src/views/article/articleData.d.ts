interface TabaData {
  content?: Array<ArticleData>;
  size?: number;
  total?: number;
  currentPage?: number;
}

interface ArticleData {
  _id?: string;
  title?: string;
  time?: Date;
  tag?: string;
  content?: string;
  description?: string;
}

export { TabaData, ArticleData }