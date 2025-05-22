// pages/terms.js
import React from 'react';

const Terms = () => {
  return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center">利用規約</h1>
        <p className="mt-4 text-center text-gray-600">以下の利用規約をよくお読みください。</p>

        {/* 利用規約の内容 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">第1条（総則）</h2>
          <p className="mt-2">
            本利用規約（以下「本規約」といいます）は、当社が運営するサービス（以下「本サービス」といいます）の利用条件を定めるものです。ユーザーは、本規約に同意の上、本サービスを利用するものとします。
          </p>

          <h2 className="text-2xl font-bold mt-6">第2条（定義）</h2>
          <p className="mt-2">
            本規約において使用する用語の定義は、以下の通りとします。
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>「ユーザー」とは、本サービスを利用する全ての者をいいます。</li>
            <li>「プロジェクトオーナー」とは、資金調達を目的としてプロジェクトを掲載する者をいいます。</li>
            <li>「投資家」とは、プロジェクトへの投資を検討する者をいいます。</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6">第3条（サービスの内容）</h2>
          <p className="mt-2">
            本サービスは、プロジェクトオーナーと投資家のマッチングの機会を提供するプラットフォームです。当社は、プロジェクトオーナーと投資家間の取引には一切関与せず、仲介を行いません。実際の取引条件や契約内容については、当事者間で直接協議・決定するものとします。
          </p>

          <h2 className="text-2xl font-bold mt-6">第4条（禁止事項）</h2>
          <p className="mt-2">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはならないものとします。</p>
          <ul className="list-disc ml-6 mt-2">
            <li>プロジェクト情報内での連絡先（メールアドレス、電話番号等）の掲載</li>
            <li>法令または公序良俗に違反する行為</li>
            <li>当社または第三者の知的財産権、肖像権、プライバシー権その他の権利を侵害する行為</li>
            <li>虚偽の情報を掲載する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6">第5条（連絡方法）</h2>
          <p className="mt-2">
            ユーザー間の連絡は、本サービス内のメッセージ機能を通じて行うものとします。実際の取引開始に際しては、ユーザー間の合意の上で連絡先を交換することができます。
          </p>

          <h2 className="text-2xl font-bold mt-6">第6条（取引上の注意事項）</h2>
          <p className="mt-2">
            ユーザーは、自己の責任において取引を行うものとします。当社は、ユーザー間の取引に起因するトラブルについて一切の責任を負いません。投資判断は各自の責任において行うものとし、当社は投資の成果について一切保証しません。
          </p>

          <h2 className="text-2xl font-bold mt-6">第7条（サービスの停止・変更）</h2>
          <p className="mt-2">
            当社は、以下の場合には本サービスの全部または一部の提供を停止することができます。
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>システムの保守・点検を行う場合</li>
            <li>天災・事故等により本サービスの提供が困難となった場合</li>
            <li>その他、当社が必要と判断した場合</li>
          </ul>
          <p className="mt-2">
            当社は、本サービスの内容を予告なく変更することができます。
          </p>

          <h2 className="text-2xl font-bold mt-6">第8条（免責事項）</h2>
          <p className="mt-2">
            当社は、本サービスに掲載される情報の正確性・完全性・有用性等について、いかなる保証も行いません。ユーザー間の取引に関するトラブルについて、当社は一切の責任を負わないものとします。本サービスの利用により生じた損害について、当社は一切の責任を負わないものとします。
          </p>

          <h2 className="text-2xl font-bold mt-6">第9条（規約の変更）</h2>
          <p className="mt-2">
            当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができます。変更後の規約は、当社ウェブサイトに掲載した時点で効力を生じるものとします。
          </p>

          <h2 className="text-2xl font-bold mt-6">第10条（準拠法・管轄裁判所）</h2>
          <p className="mt-2">
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>

          <p className="mt-6 text-center">以上</p>
          <p className="mt-2 text-center">制定日：2025年2月1日</p>
        </section>
      </div>
  );
};

export default Terms;