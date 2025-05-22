# 単一ステージビルド - メモリ問題を回避するため
FROM node:18-slim

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /app

# package.jsonとlock fileをコピー
COPY package*.json ./

# Prismaスキーマをコピー
COPY prisma ./prisma/

# TypeScript設定
COPY tsconfig.json ./

# 依存関係をインストール (development dependencies含む)
# Node.jsのメモリ制限を増やし、npm installのオプションを設定
RUN NODE_OPTIONS="--max_old_space_size=2048" npm install --no-optional --legacy-peer-deps

# Prismaクライアントを生成
RUN npx prisma generate

# ソースコードをコピー
COPY src ./src/

# TypeScriptのビルド
RUN npm run build

# 不要な開発依存関係を削除してイメージサイズを削減
# 代わりに必要な本番依存関係を維持
RUN npm prune --production

# 本番環境用の設定
ENV NODE_ENV=production
ENV PORT=8000

# ポートの公開
EXPOSE ${PORT}

# ヘルスチェックの設定
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# 起動コマンドを設定
# prismaマイグレーションを実行してからアプリを起動
CMD npx prisma migrate deploy && node dist/index.js