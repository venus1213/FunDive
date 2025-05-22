export const emailLayout = (content: string): string => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Language" content="ja">
  <meta name="google" content="notranslate">
  <title>FUNDIVE</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      background-color: #0066cc;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #eeeeee;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #0066cc;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
    }
  </style>
</head>
<body class="notranslate">
  <div class="container">
    <div class="header">
      <h1>FUNDIVE</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FUNDIVE. All rights reserved.</p>
      <p>このメールは自動送信されています。返信はできませんのでご了承ください。</p>
    </div>
  </div>
</body>
</html>
`; 