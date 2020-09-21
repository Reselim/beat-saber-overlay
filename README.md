# Beat Saber Overlay bsr,no-performance オプション追加版

これは、Reselim氏が製作した[Beat Saber Overlay](https://github.com/Reselim/beat-saber-overlay)に、bsr表示(bsr)とスコア表示無し(no-performance)のオプションを追加したバージョンです。

Beat SaberをOBS等で配信や録画する時に譜面情報をオーバーレイ表示します。

![preview](https://rynan4818.github.io/beatsaber-overlay-bsr-image.png)

## インストール方法 (OBS)

1. [Beat Saber HTTP Status](https://github.com/opl-/beatsaber-http-status) か、拙作の[Beat Saber HTTP Status +Database](https://github.com/rynan4818/beatsaber-http-status-db)をダウンロードしてインストールします。

- HTTP StatusはRelease v1.11.1以降のバージョンを使用して下さい。(6/28現在 ModAssistantで対応済み)
- [bs-movie-cut(プレイ動画カットツール）](https://github.com/rynan4818/bs-movie-cut)を使用する場合は、HTTP Status +DatabaseはRelease v2020/06/08以降を使用して下さい。

2. [リリースページ](https://github.com/rynan4818/beat-saber-overlay-noscore/releases)から最新のリリースをダウンロードします。

3. zipを適当なフォルダに解凍します。例: C:\TOOL\beat-saber-overlay-bsr_no-performance\

4. OBSのソースにブラウザを追加します。

![image](https://rynan4818.github.io/beatsaber-overlay-noscore-obs-setting1.png)

5. zipを解凍したフォルダ名に合わせてプロパティのURLに `file:///C:/TOOL/beat-saber-overlay-bsr_no-performance/index.html?modifiers=bsr` の様に設定します。また、画面サイズと同じ幅と高さに設定します。 (1280x720 など)

![image](https://rynan4818.github.io/beatsaber-overlay-bsr-obs-setting.png)

ローカルファイルだと、オプション設定が出来ないのでURL表記で入力する必要があります。解凍したファイルのindex.htmlをブラウザで開いて、アドレス欄からコピー＆ペーストするのが楽です。

6. (オプション) 1080p(1920x1080)の画面サイズの場合,オーバレイ表示を1.5倍に拡大する `scale` 修飾子を使用して下さい。例: `file:///C:/TOOL/beat-saber-overlay-bsr_no-performance/index.html?modifiers=bsr,scale`

## オプション

次の様なオプションがURLに設定可能です。

```
file:///C:/TOOL/beat-saber-overlay-bsr_no-performance/index.html?modifiers=top,bsr
```

### `modifiers`

複数のオプションは,(カンマ)で区切ることができます。

- `top`
	* オーバーレイの表示を上部に配置し、レイアウトを垂直方向に反転します。
- `rtl`
	* オーバーレイを右に移動し、右揃えのレイアウトにします。	`!`と`.`の表示に問題があります。（下記参照)
- `scale`
	* 1080p(1920x1080)の画面で使用するために、オーバーレイを1.5倍にスケーリングします。
- `test`
	* テストのために背景を黒にします。
- `bsr`
	* bsrの検索・表示をします。（今回追加）
- `no-performance`
	* スコア表示を消します。　 （今回追加）

### `rtl`の表示修正

上記`rtl`オプションを使用すると、下記画像の様に`!`や`.`の表示位置がおかしくなる問題があります。

![image](https://github.com/rynan4818/rynan4818.github.io/blob/master/beatsaber-overlay-rtl2.png?raw=true)

この問題を修正するため、`rtl`オプションの代わりに、`index_rtl.html`を追加しました。
`index.html`の代わりに`index_rtl.html`に変更して使用してください。
デフォルトで右側表示になります。`rtl`オプション以外はそのまま使用可能です。

```
file:///C:/TOOL/beat-saber-overlay-bsr_no-performance/index_rtl.html?modifiers=top,bsr
```

### bsrの表示位置や文字サイズを変更したい場合

表示位置を変更したい場合は`index.html`の以下の部分を修正して下さい。
![image](https://rynan4818.github.io/beatsaber-overlay-index-html.png)

文字サイズなどは`style.css`の以下を修正して下さい。
![image](https://rynan4818.github.io/beatsaber-overlay-css.png)

## 正式公開について
~~上記改造版は本家に[プルリクエスト](https://github.com/Reselim/beat-saber-overlay/pull/15)依頼済みです。[2020/6/6]~~

オリジナルのリポジトリがアーカイブされてしまったので、このままここに置いておきます。
