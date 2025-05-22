/**
 * 文字列をURLセーフなスラグに変換する
 * @param text スラグに変換する文字列
 * @returns URLセーフなスラグ文字列
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // 日本語や特殊文字をローマ字に置き換える簡易的な処理
    // より完全な多言語対応を行う場合はlibraryを使用することを推奨
    .replace(/[あ-ん]/g, match => {
      const romanMap: Record<string, string> = {
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n'
      };
      return romanMap[match] || match;
    })
    .replace(/[ぁ-ん]/g, match => {
      // 拗音などの小文字処理
      return match;
    })
    .replace(/[っ]/g, 'tsu')
    .replace(/[ァ-ン]/g, match => {
      // カタカナをひらがなに変換して処理
      const hira = String.fromCharCode(match.charCodeAt(0) - 0x60);
      return slugify(hira);
    })
    // スペースをハイフンに置き換え
    .replace(/\s+/g, '-')
    // 英数字とハイフン以外を削除
    .replace(/[^\w\-]+/g, '')
    // 連続するハイフンを単一のハイフンに置き換え
    .replace(/\-\-+/g, '-')
    // 先頭と末尾のハイフンを削除
    .replace(/^-+/, '')
    .replace(/-+$/, '');
} 