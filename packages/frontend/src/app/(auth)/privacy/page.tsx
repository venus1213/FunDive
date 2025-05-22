export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">
          最終更新日: {new Date().toLocaleDateString('ja-JP')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. はじめに</h2>
          <p className="mb-4">
            FUNDIVE（以下「当社」）は、ユーザーの個人情報保護を重要な責務と考え、以下のプライバシーポリシーに従って個人情報を取り扱います。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 収集する情報</h2>
          <p className="mb-4">当社が収集する情報には以下が含まれます：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>プロフィール情報</li>
            <li>ログイン情報</li>
            <li>利用状況に関する情報</li>
            <li>デバイス情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 情報の利用目的</h2>
          <p className="mb-4">収集した情報は、以下の目的で利用されます：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>サービスの提供・運営</li>
            <li>ユーザー認証</li>
            <li>カスタマーサポート</li>
            <li>サービスの改善・新機能の開発</li>
            <li>利用規約違反の調査</li>
            <li>法令に基づく対応</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 情報の共有</h2>
          <p className="mb-4">
            当社は、以下の場合を除き、ユーザーの個人情報を第三者と共有することはありません：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>サービス提供に必要な外部委託先との共有</li>
            <li>当社の権利保護のために必要な場合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. セキュリティ</h2>
          <p className="mb-4">
            当社は、ユーザーの個人情報を適切に保護するため、以下の対策を実施しています：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>SSL暗号化通信の使用</li>
            <li>アクセス制限の実施</li>
            <li>定期的なセキュリティ監査</li>
            <li>従業員の教育・研修</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. ユーザーの権利</h2>
          <p className="mb-4">
            ユーザーには以下の権利があります：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>個人情報の開示請求</li>
            <li>個人情報の訂正・削除請求</li>
            <li>個人情報の利用停止請求</li>
            <li>個人情報の第三者提供の停止請求</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookieの使用</h2>
          <p className="mb-4">
            当社のサービスでは、ユーザー体験の向上やサービスの改善のためにCookieを使用しています。
            ブラウザの設定でCookieを無効にすることも可能ですが、一部のサービスが正常に動作しなくなる可能性があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. お問い合わせ</h2>
          <p className="mb-4">
            プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします：
          </p>
          <p className="mb-4">
            <a href="/contact" className="text-primary hover:underline">
              お問い合わせフォーム
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. プライバシーポリシーの変更</h2>
          <p className="mb-4">
            当社は、必要に応じて本プライバシーポリシーを変更することがあります。
            重要な変更がある場合は、サービス上での通知やメールでお知らせします。
          </p>
        </section>
      </div>
    </div>
  );
}
