(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子要素を全て削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    // 無名関数, = function() {と同じ
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        // 何も記入されなかったら戻り値0で処理を終了する
        if (userName.length === 0) {
            return;
        }
        // 診断結果表示エリア
        // 2回目以降のクリックで繰り返し表示されないように削除
        removeAllChildren(resultDivided);

        const header = document.createElement('h3');
        header.innerText = 'ふむふむ，なるほど...';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリア
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=異世界適性診断&ref_src=twsrc%5Etfw";
        anchor.setAttribute('href', hrefValue);
        anchor.setAttribute('class', "twitter-hashtag-button");
        anchor.setAttribute('data-text', result);
        anchor.setAttribute('data-show-count', false);
        // anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #異世界適性診断';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    const answers = [
        '{userName}には魔法の才能があるようじゃ．そこで拾った木の棒をやろう．',
        '{userName}には大剣の才能があるようじゃ．小学生まではイキれるのう．',
        '{userName}には受付の才能があるようじゃ．最近人手不足なんで助かるわい．',
        '{userName}には商人の才能があるようじゃ．宝玉使用料5億Gです．',
        '{userName}には泥棒の才能があるようじゃ．どこで間違えたんじゃ？',
        '{userName}には勇者の才能があるようじゃ．宝玉の調子が悪いんかのぅ．',
        '{userName}には遊び人の才能があるようじゃ．儂が一番苦手なタイプ．',
        '{userName}にはパイロットの才能があるようじゃ．パイルバンカーをやろう．',
        '{userName}にはアイドルの才能があるようじゃ．儂のことはプロデューサーと呼べ．',
        '{userName}にはネタ出しの才能があるようじゃ．ちょっと手伝ってくれんか．',
        '{userName}には賭け事の才能があるようじゃ．もういいよ！私競馬やめる！',
        '{userName}には課金の才能があるようじゃ．そんな才能はない．',
        '{userName}には炎上の才能があるようじゃ．だから鍵垢にしておけと言ったろう．',
        '{userName}には料理の才能があるようじゃ．必殺技はアームロックじゃ．',
        '{userName}には野球の才能があるようじゃ．チームを低迷から救いたくはないか？',
        '{userName}には...今日もいい天気じゃなぁ．'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        // 入力文字のコードを取得し，足し合わせる
        // letは{}内だけで使える変数
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字コード番号の合計を回答の数で割って添字の数値を求める
        // constは定数の宣言
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        // 正規表現
        result = result.replace(/{userName}/g, userName);
        return result;
    }
    
    /*確認用
    console.log(assessment('太郎'));
    console.log(assessment('次郎'));
    console.log(assessment('太郎'));
    
   console.assert(
       assessment('太郎') === '太郎にはアイドルの才能があるようじゃ．儂のことはプロデューサーと呼べ．',
       '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
   )
   */
})();
