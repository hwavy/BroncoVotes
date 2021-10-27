/*globals $*/
/*globals ethers*/
/*globals scientificToDecimal*/
/*globals ethereum*/
/*globals Functions*/

// import * as funcs from './functions.js';
// TODO Reactivate

let creatorABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    name: 'newVotingContractEvent',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint32',
        name: '_timeLimit',
        type: 'uint32',
      },
      {
        internalType: 'uint8',
        name: '_ballotType',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_voteLimit',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: '_ballotId',
        type: 'uint32',
      },
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_whitelist',
        type: 'uint8',
      },
    ],
    name: 'createBallot',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint32',
        name: 'id',
        type: 'uint32',
      },
    ],
    name: 'getAddress',
    outputs: [
      {
        internalType: 'contract Voting',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

let registrarABI = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'domainList',
        type: 'bytes32[]',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'email',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'idnum',
        type: 'uint16',
      },
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: '_permreq',
        type: 'uint8',
      },
    ],
    name: 'registerVoter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'email',
        type: 'bytes32',
      },
    ],
    name: 'givePermission',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
    ],
    name: 'addDomains',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'domain',
        type: 'bytes32',
      },
    ],
    name: 'domainCheck',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'email',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'idnum',
        type: 'uint16',
      },
    ],
    name: 'checkReg',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'email',
        type: 'bytes32',
      },
    ],
    name: 'checkVoter',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_ballotAddr',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: '_ballotID',
        type: 'uint32',
      },
    ],
    name: 'setAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint32',
        name: '_ballotID',
        type: 'uint32',
      },
    ],
    name: 'getAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_email',
        type: 'bytes32',
      },
    ],
    name: 'getPermission',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

let votingABI = [
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_timeLimit',
        type: 'uint32',
      },
      {
        internalType: 'uint8',
        name: '_ballotType',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_voteLimit',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: '_ballotId',
        type: 'uint32',
      },
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: '_whitelist',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'judge',
        type: 'bool',
      },
    ],
    name: 'Bool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_votesReceived',
        type: 'uint256',
      },
    ],
    name: 'VotesCounts',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32[]',
        name: '_candidates',
        type: 'bytes32[]',
      },
    ],
    name: 'setCandidates',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32[]',
        name: '_emails',
        type: 'bytes32[]',
      },
    ],
    name: 'setWhitelisted',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32[]',
        name: '_domain',
        type: 'bytes32[]',
      },
    ],
    name: 'setWhiteListedDomain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'hashCandidates',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_votes',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes32',
        name: '_email',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: '_candidates',
        type: 'bytes32[]',
      },
    ],
    name: 'voteForCandidate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'cHash',
        type: 'bytes32',
      },
    ],
    name: 'votesFor',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'cHash',
        type: 'bytes32',
      },
    ],
    name: 'totalVotesFor',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
    ],
    name: 'bytes32ToString',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'cHash',
        type: 'bytes32',
      },
    ],
    name: 'validCandidate',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint64',
        name: '_ballotID',
        type: 'uint64',
      },
    ],
    name: 'getCandidateList',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'checkTimelimit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'checkBallottype',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint64',
        name: 'ballotID',
        type: 'uint64',
      },
    ],
    name: 'checkballotID',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'checkVoteattempts',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'checkWhitelist',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'usingWhiteDomain',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'email',
        type: 'bytes32',
      },
    ],
    name: 'checkifWhitelisted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
    ],
    name: 'whiteDomainIncludes',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTimelimit',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTitle',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const creatorAddress = '0x1E9227467c2EeEc22FE8F68689865F8668477bdF';
const registrarAddress = '0x5df5900B25E97bcf122137e1f9e479AE68F8EcE4';

const funcs = new Functions();

let ethersProvider;
let signer;

let creatorContract;
let registrarContract;

let input1 = 1;
let input2 = 0;

let ballotID;

let candidates = {};

const initialize = () => {
  let accounts;
  const onboardButton = document.getElementById('connectButton');
  const accountsDiv = document.getElementById('accounts');

  const isMetaMaskConnected = () => accounts && accounts.length > 0;
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      accounts = newAccounts;
      accountsDiv.innerHTML = accounts;
      if (isMetaMaskConnected()) {
        // Init Contracts.
        ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        signer = ethersProvider.getSigner();
        creatorContract = new ethers.Contract(creatorAddress, creatorABI, signer);
        creatorContract.on('newVotingContractEvent', function (contractAddress) {
          setVotingInfo(contractAddress);
        });
        registrarContract = new ethers.Contract(registrarAddress, registrarABI, signer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      onboardButton.innerText = 'Please install MetaMask';
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  };
  MetaMaskClientCheck();
};

const setVotingInfo = async function (votingAddress) {
  $('#loader').hide();
  console.log('"newVotingContractEvent"が発火しました');
  console.log('Votingコントラクトがデプロイされました');
  console.log('VotingAddress: ' + votingAddress);
  let choices = $('#choices').val(); // 候補者名一覧
  let choicesArray = choices.split(/\s*,\s*/); // 候補者名(Array)
  let whiteListType = $('input[name=whitelist]:checked').val(); // ホワイトリストの形式
  let whitelisted = $('#whitelisted').val(); // ホワイトリストに登録するメールアドレス
  let whitelistedDomain = $('#whitelistedDomain').val(); // ホワイトリストに登録するドメイン
  let whitelistedArray = whitelisted.split(/\s*,\s*/); // ホワイトリストのメールアドレス(Array)
  let whitelistedDomainArray = whitelistedDomain.split(/\s*,\s*/); // ホワイトリストのドメイン(Array)
  fillSetup(votingAddress, choicesArray, whitelistedArray, whitelistedDomainArray, whiteListType);
  registerBallot(votingAddress, ballotID);
  console.log('Votingへの情報登録完了');
};

window.addEventListener('DOMContentLoaded', initialize);

window.loadBallot = function () {
  $('#candidate-rows tr').remove(); // 該当テーブルの要素を削除
  ballotID = $('#ballotid').val(); // 該当idの値を取得
  candidates = {}; // 候補者リストの初期化

  creatorContract
    .getAddress(ballotID)
    .then(function (result) {
      let votingAddress = result.toString();
      if (votingAddress == 0) {
        window.alert('Invalid ballot ID');
        throw new Error('Invalid ballot ID.');
      } else {
        // コントラクトアドレスが設定済み
        $('#msg4').html('Setting up the ballot...');
        // 投票用紙とコントラクトアドレスから, 候補者名等の選挙情報をwebページに表示する関数
        getCandidates(votingAddress, ballotID);
        console.log('votingAddress: ', votingAddress);
      }
    })
    .catch(function (error) {
      console.error('投票の読み込みに失敗しました');
      console.error(error);
    });
};

window.registerToVote = async function () {
  let idNumber = $('#idnum').val();
  let email = $('#email').val();
  let permreq = $('input[name=permreq]:checked').val(); // checkされているかを取得

  if (permreq != 1) {
    permreq = 0;
  }

  // let emailToBytes = strTobyterser.StringToBytes32(email);
  let emailToBytes = funcs.web3StringToBytes32(email);
  // let domain = strTobyterser.StringToBytes32(email.replace(/.*@/, '')); // ドメイン部分だけを格納
  let domain = funcs.web3StringToBytes32(email.replace(/.*@/, ''));

  // メールアドレスのドメインがホワイトリストに登録されているかチェック
  try {
    let value = await registrarContract.domainCheck(domain);
    let domainValid = value.toString();

    if (domainValid == 'false') {
      window.alert(email + ' is Invalid E-mail address.');
      throw new Error('メールアドレスがホワイトリストに登録されていません');
    }

    // ユーザが既に登録済みかチェック
    value = await registrarContract.checkReg(emailToBytes, idNumber);
    let emailValid = value.toString();

    if (emailValid == 'false') {
      // 既に登録済みであればエラーを表示
      window.alert('E-mail/ID Number already registered to vote!');
      throw new Error('既に有権者登録済みです');
    }

    $('#idnum').val(''); // id入力欄をリセット
    $('#email').val(''); // メールアドレス入力欄をリセット

    // コントラクトに投票者情報を登録
    let result = await registrarContract.registerVoter(emailToBytes, idNumber, domain);
    window.alert('Account ready to vote!');
    // window.alert("It took" + (performance.now() - t0) + "ms to finish");
    console.log('TX HASH:', result);

    $('#msg2').html('Registration attempt successful! Please wait for verification.');
  } catch (error) {
    console.error(error);
  }
};

window.voteForCandidate = function () {
  let candidateName = $('#candidate').val(); // 入力された候補者名を取得
  let email = $('#e-mail').val(); // 入力されたe-mailアドレスを取得
  // let emailToBytes = strTobyterser.StringToBytes32(email);
  let emailToBytes = funcs.web3StringToBytes32(email);
  $('#msg2').html(''); // 該当場所のメッセージを初期化
  $('#msg4').html('');

  let encodeName = funcs.AbiEncode(candidateName);
  let cHash = ethers.utils.keccak256(encodeName); // 候補者名を32bitサイズでハッシュ化
  // let cHash = ethers.utils.keccak256(candidateName);
  let votesArray = [];

  registrarContract.checkVoter(emailToBytes).then(function (v) {
    checkVoter(v.toString());
    creatorContract.getAddress(ballotID).then(function (v) {
      let votingAddress = v.toString();
      let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
      votingContract.checkWhitelist().then(function (v) {
        let wc1 = v.toString();
        // 投票者のメールアドレスがホワイトリストに登録されているかをチェック
        votingContract.checkifWhitelisted(emailToBytes).then(function (v) {
          let wc2 = v.toString();
          if (wc1 == 'true' && wc2 == 'false') {
            window.alert("You're are not authorized to vote on this ballot!");
            //$("#msg").html("You're are not authorized to vote on this ballot!")
            throw new Error();
          } else {
            // 投票した候補者名が今回の候補者リストに存在するかチェック
            votingContract.validCandidate(cHash).then(function (v) {
              let canValid = v.toString();

              if (canValid == 'false') {
                window.alert('Invalid Candidate!');
                //$("#msg").html("Invalid Candidate!")
                throw new Error();
              }

              // 投票回数の上限に達しているかをチェック
              votingContract.checkVoteattempts().then(function (v) {
                let attempCheck = v.toString();

                if (attempCheck == 'false') {
                  window.alert('You have reached your voting limit for this ballot/poll!');
                  //$("#msg").html("You have reached your voting limit for this ballot/poll!")
                  throw new Error();
                }

                // 投票処理中メッセージを表示, 入力欄の初期化
                $('#msg').html('Your vote attempt has been submitted. Please wait for verification.');
                $('#candidate').val('');
                $('#e-mail').val('');

                votingContract.getCandidateList(ballotID).then(function (candidateArray) {
                  for (let i = 0; i < candidateArray.length; i++) {
                    let hcand = ethers.utils.parseBytes32String(candidateArray[i]);
                    console.log('hcand=' + hcand);
                    let encodeName = funcs.AbiEncode(hcand);

                    let hcHash = ethers.utils.keccak256(encodeName);

                    if (hcHash == cHash) {
                      encrypt(hcHash, input1, i, candidateArray, email, votingAddress, votesArray);
                    } else {
                      encrypt(hcHash, input2, i, candidateArray, email, votingAddress, votesArray);
                    }
                  }
                });
              });
            });
          }
        });
      });
    });
  });
};

function encrypt(hcHash, vnum, i, candidateArray, email, votingAddress, votesArray) {
  let einput1;
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/crypto/encrypt/' + vnum, // 投票文を暗号化
    success: function (eoutput1) {
      let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
      votingContract.votesFor(hcHash).then(function (v) {
        let convVote = v;
        einput1 = convVote;
        console.log('einput1=' + einput1);
        einput1 = scientificToDecimal(einput1); // 10進数表記

        if (einput1 != 0) {
          // 集計結果が0でなければ, 今回の投票文を加算する
          add(eoutput1, einput1, i, candidateArray, email, votingAddress, votesArray);
        }
      });
    },
  });
}

function add(eoutput1, einput1, i, candidateArray, email, votingAddress, votesArray) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/crypto/add/' + eoutput1 + '/' + einput1, // 二つの暗号文を加算する
    success: function (eadd1) {
      // 加算結果をコントラクトに登録
      verifyTimestamp(eadd1, i, candidateArray, email, votingAddress, votesArray);
    },
  });
}

function verifyTimestamp(eadd1, i, candidateArray, email, votingAddress, votesArray) {
  let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
  votingContract.checkTimelimit().then(function (v) {
    let timecheck = v.toString();
    if (timecheck == 'false') {
      votingContract.getTimelimit().then(function (v) {
        let endtime = v.toString(); // 制限時間の取得
        //Testnet is plus 7 hours, uncomment this line if testing on testnet
        //endtime = endtime - 21600
        endtime = new Date(endtime * 1000);
        getVotes(votingAddress); // 投票結果を表に表示
        //window.alert("Voting period for this ballot has ended on " +endtime)
        // 投票期限を過ぎた旨をメッセージで表示
        $('#msg').html('Voting period for this ballot has ended on ' + endtime);
        throw new Error();
      });
    } else {
      votesArray[i] = eadd1; // 該当場所に暗号化された投票内容を格納
      if (i == candidateArray.length - 1) {
        // 最後の候補者名まで処理がされていれば,以下の処理
        // 投票者の各候補者に対する投票内容をコントラクトに登録する
        vote(candidateArray, email, votingAddress, votesArray);
      }
    }
  });
}

function vote(candidateArray, email, votingAddress, votesArray) {
  let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
  votingContract.voteForCandidate(votesArray, funcs.web3StringToBytes32(email), candidateArray).then(function () {
    getVotes(votingAddress); // 投票結果を表に表示
    $('#msg').html('');
    window.alert('Your vote has been verified!');
  });
}

window.ballotSetup = function () {
  let cemail = $('#cemail').val();
  // let emailToBytes = strTobyterser.StringToBytes32(cemail);
  let emailToBytes = funcs.web3StringToBytes32(cemail);
  $('#loader').show();

  registrarContract
    .checkVoter(emailToBytes)
    .then(function (v) {
      let voterCheck = v.toString();
      if (checkVoter(voterCheck)) {
        registrarContract.getPermission(emailToBytes).then(function (v) {
          if (v.toString() == 0) {
            //$("#msg3").html("You are not authorized to create ballots! Please contact admin to request authorization.")
            window.alert('You are not authorized to create ballots! Please contact admin to request authorization.');
            throw new Error(cemail, " isn't authorized to create ballots.");
          } else {
            let date = $('#date').val();
            let enddate = Date.parse(date).getTime() / 1000;
            let time = $('#time').val();
            //Testnet is plus 7 hours
            //-21600 to get original end date and time on testnet
            let timeArray = time.split(':');
            //Testnet is plus 7 hours, uncomment this line if testing on testnet
            //let seconds = ((timeArray[0]*60)*60) + (timeArray[1]*60) + 21600
            let seconds = timeArray[0] * 60 * 60 + timeArray[1] * 60; // 秒数表示
            enddate += seconds; // 投票期限を取得
            let ballottype = $('input[name=ballottype]:checked').val(); // 投票形式を取得 poll or election
            let title = $('#vtitle').val(); // 投票タイトルを取得
            let votelimit = $('#votelimit').val(); // 投票回数を取得
            let whiteListType = $('input[name=whitelist]:checked').val(); // ホワイトリストの形式を取得
            ballotID = Math.floor(Math.random() * 4294967295); // 投票用紙IDをランダムで生成

            creatorContract.createBallot(enddate, ballottype, votelimit, ballotID, title, whiteListType);
          }
        });
      }
    })
    .catch(function (error) {
      console.error(error);
      console.error('有権者確認失敗');
    });
};

window.getVotingAddress = function () {
  let tmpBallotId = $('#votingAddress').val();
  creatorContract.getAddress(tmpBallotId).then(function (v) {
    console.log('Ballot ID ' + tmpBallotId + 'のVotingAddress :' + v);
  });
};

// 投票用紙の準備
function registerBallot(votingaddress, ballotid) {
  registrarContract
    .setAddress(votingaddress, ballotid)
    .then(function (result) {
      window.alert('Ballot creation successful! Ballot ID: ' + ballotid + '\nPlease write the down the Ballot ID because it will be used to load your ballot allowing users to vote');
      console.log('Ballot ID: ' + ballotid);
      console.log('TX HASH: ', result);
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

// Candidate, Whitelistをコントラクトに登録
function fillSetup(votingAddress, choicesArray, whitelistedArray, whitelistedDomainArray, whiteListType) {
  fillCandidates(votingAddress, choicesArray);
  if (whiteListType == 1) {
    fillWhitelisted(votingAddress, whitelistedArray);
  }
  if (whiteListType == 2) {
    fillWhitelistedDomain(votingAddress, whitelistedDomainArray);
  }
}

function fillCandidates(votingAddress, choicesArray) {
  let votingContract = new ethers.Contract(votingAddress, votingABI, signer);

  votingContract.setCandidates(funcs.web3StringArrayToBytes32(choicesArray)).then(function (result) {
    console.log('Candidateの設定完了\nTX HASH: ', result);
    votingContract.hashCandidates().then(function (result) {
      console.log('Candidateのハッシュ化完了\nTX HASH: ', result);
    });
  });
}

function fillWhitelisted(votingAddress, whitelistedArray) {
  let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
  votingContract.setWhitelisted(funcs.web3StringArrayToBytes32(whitelistedArray));
}

function fillWhitelistedDomain(votingAddress, whitelistedDomainArray) {
  let votingContract = new ethers.Contract(votingAddress, votingABI, signer);
  votingContract.setWhiteListedDomain(funcs.web3StringArrayToBytes32(whitelistedDomainArray));
}

window.AddDomain = () => {
  let domain = $('#domainAdress').val();
  // let domainBytes32 = strTobyterser.StringToBytes32(domain);
  let domainBytes32 = funcs.web3StringToBytes32(domain);

  registrarContract
    .addDomains(domainBytes32)
    .then(function (result) {
      console.log('次のドメイン登録が完了しました: ', domain, '\nTX HASH', result);
    })
    .catch(function (error) {
      console.error('ドメイン登録でエラーが発生しました');
      throw new Error(error);
    });
};

function getCandidates(votingAddress, ballotID) {
  const votingContract = new ethers.Contract(votingAddress, votingABI, signer);
  votingContract.getTitle().then(function (title) {
    $('#btitle').html(title);
    votingContract.getCandidateList(ballotID).then(function (candidateArray) {
      for (let i = 0; i < candidateArray.length; i++) {
        candidates[ethers.utils.parseBytes32String(candidateArray[i])] = 'candidate-' + i;
      }
      setupTable();
      getVotes(votingAddress);
    });
  });
}

function setupTable() {
  Object.keys(candidates).forEach(function (candidate) {
    // 該当テーブルにcandidatesのkeyを一覧表示して, 各要素にidを設定する
    $('#candidate-rows').append('<tr><td>' + candidate + "</td><td id='" + candidates[candidate] + "'></td></tr>");
  });
}

window.validCandidate = function () {
  let candidateName12 = $('#candidateName12').val();
  let encodeName = funcs.AbiEncode(candidateName12);
  // let encodeName = candidateName12;
  let cvHash = ethers.utils.keccak256(encodeName); // 候補者名を32bitサイズでハッシュ化
  console.log(cvHash);
  console.log('ballotID: ' + ballotID);

  //TODO イベントがEthersでどうなるか実験してみる
  creatorContract.getAddress(ballotID).then(function (votingAddress_byte) {
    console.log('投票コントラクトの取得成功' + '\nVoting Address: ' + votingAddress_byte);
    const votingContract = new ethers.Contract(votingAddress_byte.toString(), votingABI, signer);
    votingContract.validCandidate(cvHash).then(function (resultBoolStr) {
      console.log('候補者/選択肢の有効性の検証完了');
      if (resultBoolStr.toString() == 'true') {
        console.log('結果: 有効');
      } else if (resultBoolStr.toString() == 'false') {
        console.log('結果: 無効');
      } else {
        console.log('予期しない戻り値: ', resultBoolStr.toString());
      }
    });
  });
};

function getVotes(votingAddress) {
  Object.keys(candidates).forEach((name) => {
    let encodeName = funcs.AbiEncode(name);
    let cvHash = ethers.utils.keccak256(encodeName);

    let votingContract = new ethers.Contract(votingAddress, votingABI, signer);

    votingContract.totalVotesFor(cvHash).then(function (convVote) {
      if (convVote == 0) {
        votingContract.getTimelimit().then(function (result) {
          let endtime = result.toString();
          endtime = new Date(endtime * 1000);
          $('#msg').html('Results will be displayed once the voting period has ended (' + endtime + ')');
        });
      } else {
        console.log('復号開始');
        convVote = scientificToDecimal(convVote); // 10進数に変換
        $('#' + candidates[name]).html(convVote); // 該当idに投票結果を表示
        decrypt(convVote, name); // convVoteを復号し, 結果を該当テーブルに表示
      }
    });
  });
}

function decrypt(convVote, name) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/crypto/decrypt/' + convVote,
    success: function (eoutput) {
      console.log('復号完了');
      let voteNum = eoutput; // 復号結果を格納
      $('#' + candidates[name]).html(voteNum.toString()); // 該当idに投票結果を表示
    },
  });
}

function checkVoter(voterCheck) {
  if (voterCheck == 1) {
    // 未登録であればエラーを表示
    window.alert('E-mail address not registered!');
    //$("#msg").html("E-mail address not registered!")
    throw new Error('E-mail address not registered.');
  } else if (voterCheck == 2) {
    // メールアドレスとコントラクトアドレスが適合していなければエラーを表示
    window.alert('E-mail address and Ethereum address mismatch!');
    //$("#msg").html("E-mail address and Ethereum address mismatch!")
    throw new Error('E-mail address and Ethereum address mismatch!');
  } else {
    return true;
  }
}
