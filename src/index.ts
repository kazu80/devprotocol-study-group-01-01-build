/**
 * ⑨ ユーザーの所持DEVを取得して表示します
 */
function getBalanceOfDEV() {
  return "0";
}

/**
 * ⑥ ネットワークに接続できているかをチェックします
 */
function isMainNet() {
  return true;
}

/**
 * ⑤-2 Metamaskからウォレットアドレスを取得する
 */
async function getAccount() {
  return "0x000000000";
}

/**
 * ⑤-1 Metamaskでログインされているかをチェックします
 *   Metamaskからウォレットアドレスを取得できたらログイン出来ていることとする
 */
async function isMetaMaskLogin(): Promise<boolean> {
  return true;
}

/**
 * ④ Metamaskと接続ができているかのチェックを行います
 */
async function connectMetaMask(): Promise<boolean> {
  return true;
}

/**
 * ③ Metamaskがインストールされているかのチェックを行います
 */
function isMetamask(): boolean {
  return true;
}

/**
 * ステータスの状態をコントロール関数
 * @param statusElements
 * @param activeStatus
 */
function setStatusStyle(statusElements: HTMLElement, activeStatus: number) {
  const status = Array.from(statusElements.children);
  status.forEach((element) => {
    element.classList.remove("active");
  });

  statusElements.children[activeStatus].classList.add("active");
}

/**
 * ② ボタンが押されたら、Walletにアクセスして認証処理を行い、ユーザーのウォレットアドレスと所持DEVを
 * 表示するプログラムを書きます
 */
function clickLoginButton() {
  const statusElements = document.getElementById("status");

  // ③ Metamaskがインストールされているかのチェックを行います
  if (!isMetamask()) {
    alert("MetaMaskをインストールしてください");
    setStatusStyle(statusElements, 0);
    return;
  }

  // ④ Metamaskと接続ができているかのチェックを行います
  if (!connectMetaMask()) {
    alert("MetaMaskとの接続を許可してください");
    setStatusStyle(statusElements, 1);
    return;
  }

  // ⑤ Metamaskでログインされているかをチェックします
  if (!isMetaMaskLogin()) {
    alert("MetaMaskからログインしてください");
    setStatusStyle(statusElements, 2);
    return;
  }

  // ⑥ ネットワークに接続できているかをチェックします
  if (!isMainNet()) {
    alert("メインネットに切り替えてください");
    setStatusStyle(statusElements, 3);
    return;
  }

  // ⑦ ログインが正常に行えた時の処理を書きます
  alert("MetaMaskにログインしました.");
  setStatusStyle(statusElements, 4);

  // ⑧ ユーザーのウォレットアドレスを取得して表示します
  const addressElement = document.getElementById("address");
  addressElement.innerText = "0x000000";

  // ⑨ ユーザーの所持DEVを取得して表示します
  const amount = getBalanceOfDEV();
  const devElement = document.getElementById("dev");
  devElement.innerText = amount;
}

/**
 * ① index.htmlから「wallet」ボタンを取得して、ボタンが押されたら
 *   プログラムが動くようにします
 */
const button = document.getElementById("wallet");
if (button) {
  button.addEventListener("click", clickLoginButton);
}
