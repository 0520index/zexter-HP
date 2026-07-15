# 株式会社zexter ウェブサイト フォルダ構成

## プロジェクト構造

```
zexter02/
├── index.html                    # メインホームページ
├── project-structure.md          # このファイル（構成説明）
├── README.md                     # プロジェクト概要
│
├── assets/                       # 静的リソース
│   ├── css/                      # スタイルシート
│   │   ├── main.css             # メインスタイル
│   │   ├── components.css       # コンポーネント用
│   │   ├── animations.css       # アニメーション専用
│   │   └── responsive.css       # レスポンシブ対応
│   │
│   ├── js/                      # JavaScript
│   │   ├── main.js             # メインスクリプト
│   │   ├── animations.js       # アニメーション制御
│   │   ├── components.js       # コンポーネント制御
│   │   └── utils.js            # ユーティリティ関数
│   │
│   ├── images/                  # 画像ファイル
│   │   ├── logo/               # ロゴ関連
│   │   ├── icons/              # アイコン
│   │   ├── backgrounds/        # 背景画像
│   │   └── content/            # コンテンツ画像
│   │
│   └── fonts/                   # Webフォント（必要に応じて）
│
├── components/                   # 再利用可能コンポーネント
│   ├── header.html              # ヘッダー
│   ├── footer.html              # フッター
│   ├── navigation.html          # ナビゲーション
│   └── contact-form.html        # お問い合わせフォーム
│
└── pages/                       # 個別ページ（将来の拡張用）
    ├── about.html               # 会社概要詳細
    ├── services.html            # サービス詳細
    ├── contact.html             # お問い合わせページ
    └── company.html             # 企業情報
```

## デザインコンセプト

### カラーパレット
- **プライマリー**: ゴールド (#FFD700, #F4D03F, #E6C200)
- **セカンダリー**: ホワイト (#FFFFFF, #F8F9FA, #F1F2F6)
- **アクセント**: ダークグレー (#2C3E50, #34495E) - テキスト用
- **背景**: ライトグレー (#FAFAFA, #F5F6FA)

### タイポグラフィ
- **メインフォント**: Inter (Google Fonts)
- **見出し**: 700, 600 (Bold, Semi-Bold)
- **本文**: 400, 500 (Regular, Medium)

### セクション構成
1. **Hero** - メインビジュアル・キャッチコピー
2. **About** - 会社紹介・理念
3. **Business** - 事業内容紹介
4. **Strength** - 強み・特徴
5. **Company** - 企業情報
6. **Contact** - お問い合わせ

### 特徴
- **白と金をベースとした明るいデザイン**
- **ゲーミング風の洗練されたアニメーション**
- **レスポンシブ対応**
- **高いパフォーマンス**
- **SEO最適化**

## 開発の進め方

1. ✅ **フォルダ構成設計** ← 現在ここ
2. **デザインシステム構築**
3. **各セクションの段階的実装**
4. **アニメーション追加**
5. **パフォーマンス最適化**

## 技術仕様

- **HTML5** - セマンティックマークアップ
- **CSS3** - Grid, Flexbox, Custom Properties
- **JavaScript ES6+** - モジュール化された構成
- **Font Awesome** - アイコンライブラリ
- **Google Fonts** - Webフォント

---

*Excellence Never Settles - 株式会社zexter*