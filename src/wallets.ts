import { addresses, contractFactory } from "@devprotocol/dev-kit";
import { BigNumber } from "@ethersproject/bignumber";
import Web3 from "web3";

/**
 * ログインボタンのログイン時と未ログイン時のスタイル変更
 * @param button
 */
export const loggedInStyle = (button: HTMLButtonElement) => {
  button.classList.replace("btn-outline-warning", "btn-outline-success");

  button.textContent = "LOGGED IN";
};

/**
 * MetaMaskがメインネットワークに接続していくかの判定
 */
function isMainNet() {
  return parseInt(window.ethereum.chainId) === 1;
}

/**
 * MetaMaskがインストールされているかの判定
 */
function isMetamask(): boolean {
  return !!window.ethereum && !!window.ethereum.isMetaMask;
}

/**
 * MetaMaskからウォレットのアドレスを取得する
 */
async function getAccount() {
  const accounts = (await window.ethereum.request({
    method: "eth_accounts"
  })) as string[];

  return accounts[0];
}

/**
 * ログイン判定
 */
async function isMetaMaskLogin(): Promise<boolean> {
  return !!(await getAccount());
}

/**
 * MetaMaskとコネクトする
 */
async function connectMetaMask(): Promise<boolean> {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (e) {
    if (e.code === 4001) {
      return false;
    }
  }

  return true;
}

/**
 * 画面の初期表示の際にログイン状態を判定したい時に使用する
export const isLogin = async (): Promise<boolean> => {
  if (!isMetamask()) {
    return false;
  }

  if (!(await isMetaMaskLogin())) {
    return false;
  }

  if (!isMainNet()) {
    return false;
  }

  return true;
};
*/

function setStatusStyle(statusElements: HTMLElement, activeStatus: number) {
  const status = Array.from(statusElements.children);
  status.forEach((element) => {
    element.classList.remove("active");
  });

  statusElements.children[activeStatus].classList.add("active");
}

/**
 * LOGINボタンが押された際のログイン処理
 * ログインは、MetaMaskからアドレスを取得できたらログインが行えたこととする
 */
export const clickLoginButton = async function () {
  const statusElements = document.getElementById("status");

  if (!isMetamask()) {
    alert("MetaMaskをインストールしてください");
    setStatusStyle(statusElements, 0);
    return;
  }

  if (!(await connectMetaMask())) {
    alert("MetaMaskとの接続を許可してください");
    setStatusStyle(statusElements, 1);
    return;
  }

  if (!(await isMetaMaskLogin())) {
    alert("MetaMaskからログインしてください");
    setStatusStyle(statusElements, 2);
    return;
  }

  if (!isMainNet()) {
    alert("メインネットに切り替えてください");
    setStatusStyle(statusElements, 3);
    return;
  }

  alert("MetaMaskにログインしました.");
  setStatusStyle(statusElements, 4);

  // Metamaskからウォレットアドレスを取得する
  const walletAddress = await getAccount();
  const addressElement = document.getElementById("address");
  addressElement.innerText = walletAddress;

  // DEVを取得する
  const provider = new Web3(window.ethereum);
  const client = contractFactory(provider.currentProvider);

  const registryContract = client.registry(addresses.eth.main.registry);
  const addressDEV = await registryContract.token();

  const amountBigNumber = BigNumber.from(
    await client.dev(addressDEV).balanceOf(walletAddress)
  );
  const amount = amountBigNumber.div("1000000000000000000").toString();

  const devElement = document.getElementById("dev");
  devElement.innerText = amount;
};
