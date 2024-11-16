// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.8.0. SEE SOURCE BELOW. !!
pragma solidity 0.8.28;

interface AggregationRouterV5 {



error AccessDenied(  );
error AdvanceNonceFailed(  );
error AlreadyFilled(  );
error ArbitraryStaticCallFailed(  );
error BadPool(  );
error BadSignature(  );
error ETHTransferFailed(  );
error ETHTransferFailed(  );
error EmptyPools(  );
error EthDepositRejected(  );
error GetAmountCallFailed(  );
error IncorrectDataLength(  );
error InsufficientBalance(  );
error InvalidMsgValue(  );
error InvalidMsgValue(  );
error InvalidatedOrder(  );
error MakingAmountExceeded(  );
error MakingAmountTooLow(  );
error OnlyOneAmountShouldBeZero(  );
error OrderExpired(  );
error PermitLengthTooLow(  );
error PredicateIsNotTrue(  );
error PrivateOrder(  );
error RFQBadSignature(  );
error RFQPrivateOrder(  );
error RFQSwapWithZeroAmount(  );
error RFQZeroTargetIsForbidden(  );
error ReentrancyDetected(  );
error RemainingAmountIsZero(  );
error ReservesCallFailed(  );
error ReturnAmountIsNotEnough(  );
error SafePermitBadLength(  );
error SafeTransferFailed(  );
error SafeTransferFromFailed(  );
error SimulationResults( bool success,bytes res );
error SwapAmountTooLarge(  );
error SwapWithZeroAmount(  );
error TakingAmountExceeded(  );
error TakingAmountIncreased(  );
error TakingAmountTooHigh(  );
error TransferFromMakerToTakerFailed(  );
error TransferFromTakerToMakerFailed(  );
error UnknownOrder(  );
error WrongAmount(  );
error WrongGetter(  );
error ZeroAddress(  );
error ZeroMinReturn(  );
error ZeroReturnAmount(  );
error ZeroTargetIsForbidden(  );
event NonceIncreased( address indexed maker,uint256 newNonce ) ;
event OrderCanceled( address indexed maker,bytes32 orderHash,uint256 remainingRaw ) ;
event OrderFilled( address indexed maker,bytes32 orderHash,uint256 remaining ) ;
event OrderFilledRFQ( bytes32 orderHash,uint256 makingAmount ) ;
event OwnershipTransferred( address indexed previousOwner,address indexed newOwner ) ;
function advanceNonce( uint8 amount ) external   ;
function and( uint256 offsets,bytes memory data ) external view returns (bool ) ;
function arbitraryStaticCall( address target,bytes memory data ) external view returns (uint256 ) ;
function cancelOrder( OrderLib.Order memory order ) external  returns (uint256 orderRemaining, bytes32 orderHash) ;
function cancelOrderRFQ( uint256 orderInfo ) external   ;
function cancelOrderRFQ( uint256 orderInfo,uint256 additionalMask ) external   ;
function checkPredicate( OrderLib.Order memory order ) external view returns (bool ) ;
function clipperSwap( address clipperExchange,address srcToken,address dstToken,uint256 inputAmount,uint256 outputAmount,uint256 goodUntil,bytes32 r,bytes32 vs ) external payable returns (uint256 returnAmount) ;
function clipperSwapTo( address clipperExchange,address recipient,address srcToken,address dstToken,uint256 inputAmount,uint256 outputAmount,uint256 goodUntil,bytes32 r,bytes32 vs ) external payable returns (uint256 returnAmount) ;
function clipperSwapToWithPermit( address clipperExchange,address recipient,address srcToken,address dstToken,uint256 inputAmount,uint256 outputAmount,uint256 goodUntil,bytes32 r,bytes32 vs,bytes memory permit ) external  returns (uint256 returnAmount) ;
function destroy(  ) external   ;
function eq( uint256 value,bytes memory data ) external view returns (bool ) ;
function fillOrder( OrderLib.Order memory order,bytes memory signature,bytes memory interaction,uint256 makingAmount,uint256 takingAmount,uint256 skipPermitAndThresholdAmount ) external payable returns (uint256 , uint256 , bytes32 ) ;
function fillOrderRFQ( OrderRFQLib.OrderRFQ memory order,bytes memory signature,uint256 flagsAndAmount ) external payable returns (uint256 , uint256 , bytes32 ) ;
function fillOrderRFQCompact( OrderRFQLib.OrderRFQ memory order,bytes32 r,bytes32 vs,uint256 flagsAndAmount ) external payable returns (uint256 filledMakingAmount, uint256 filledTakingAmount, bytes32 orderHash) ;
function fillOrderRFQTo( OrderRFQLib.OrderRFQ memory order,bytes memory signature,uint256 flagsAndAmount,address target ) external payable returns (uint256 filledMakingAmount, uint256 filledTakingAmount, bytes32 orderHash) ;
function fillOrderRFQToWithPermit( OrderRFQLib.OrderRFQ memory order,bytes memory signature,uint256 flagsAndAmount,address target,bytes memory permit ) external  returns (uint256 , uint256 , bytes32 ) ;
function fillOrderTo( OrderLib.Order memory order_,bytes memory signature,bytes memory interaction,uint256 makingAmount,uint256 takingAmount,uint256 skipPermitAndThresholdAmount,address target ) external payable returns (uint256 actualMakingAmount, uint256 actualTakingAmount, bytes32 orderHash) ;
function fillOrderToWithPermit( OrderLib.Order memory order,bytes memory signature,bytes memory interaction,uint256 makingAmount,uint256 takingAmount,uint256 skipPermitAndThresholdAmount,address target,bytes memory permit ) external  returns (uint256 , uint256 , bytes32 ) ;
function gt( uint256 value,bytes memory data ) external view returns (bool ) ;
function hashOrder( OrderLib.Order memory order ) external view returns (bytes32 ) ;
function increaseNonce(  ) external   ;
function invalidatorForOrderRFQ( address maker,uint256 slot ) external view returns (uint256 ) ;
function lt( uint256 value,bytes memory data ) external view returns (bool ) ;
function nonce( address  ) external view returns (uint256 ) ;
function nonceEquals( address makerAddress,uint256 makerNonce ) external view returns (bool ) ;
function or( uint256 offsets,bytes memory data ) external view returns (bool ) ;
function owner(  ) external view returns (address ) ;
function remaining( bytes32 orderHash ) external view returns (uint256 ) ;
function remainingRaw( bytes32 orderHash ) external view returns (uint256 ) ;
function remainingsRaw( bytes32[] memory orderHashes ) external view returns (uint256[] memory ) ;
function renounceOwnership(  ) external   ;
function rescueFunds( address token,uint256 amount ) external   ;
function simulate( address target,bytes memory data ) external   ;
function swap( address executor,GenericRouter.SwapDescription memory desc,bytes memory permit,bytes memory data ) external payable returns (uint256 returnAmount, uint256 spentAmount) ;
function timestampBelow( uint256 time ) external view returns (bool ) ;
function timestampBelowAndNonceEquals( uint256 timeNonceAccount ) external view returns (bool ) ;
function transferOwnership( address newOwner ) external   ;
function uniswapV3Swap( uint256 amount,uint256 minReturn,uint256[] memory pools ) external payable returns (uint256 returnAmount) ;
function uniswapV3SwapCallback( int256 amount0Delta,int256 amount1Delta,bytes memory  ) external   ;
function uniswapV3SwapTo( address recipient,uint256 amount,uint256 minReturn,uint256[] memory pools ) external payable returns (uint256 returnAmount) ;
function uniswapV3SwapToWithPermit( address recipient,address srcToken,uint256 amount,uint256 minReturn,uint256[] memory pools,bytes memory permit ) external  returns (uint256 returnAmount) ;
function unoswap( address srcToken,uint256 amount,uint256 minReturn,uint256[] memory pools ) external payable returns (uint256 returnAmount) ;
function unoswapTo( address recipient,address srcToken,uint256 amount,uint256 minReturn,uint256[] memory pools ) external payable returns (uint256 returnAmount) ;
function unoswapToWithPermit( address recipient,address srcToken,uint256 amount,uint256 minReturn,uint256[] memory pools,bytes memory permit ) external  returns (uint256 returnAmount) ;
receive () external payable;
}

interface OrderLib {
struct Order {
uint256 salt;
address makerAsset;
address takerAsset;
address maker;
address receiver;
address allowedSender;
uint256 makingAmount;
uint256 takingAmount;
uint256 offsets;
bytes interactions;
}
}

interface OrderRFQLib {
struct OrderRFQ {
uint256 info;
address makerAsset;
address takerAsset;
address maker;
address allowedSender;
uint256 makingAmount;
uint256 takingAmount;
}
}

interface GenericRouter {
struct SwapDescription {
address srcToken;
address dstToken;
address srcReceiver;
address dstReceiver;
uint256 amount;
uint256 minReturnAmount;
uint256 flags;
}
}


// THIS FILE WAS AUTOGENERATED FROM THE FOLLOWING ABI JSON:
/*
[{"inputs":[{"internalType":"contract IWETH","name":"weth","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AdvanceNonceFailed","type":"error"},{"inputs":[],"name":"AlreadyFilled","type":"error"},{"inputs":[],"name":"ArbitraryStaticCallFailed","type":"error"},{"inputs":[],"name":"BadPool","type":"error"},{"inputs":[],"name":"BadSignature","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"EmptyPools","type":"error"},{"inputs":[],"name":"EthDepositRejected","type":"error"},{"inputs":[],"name":"GetAmountCallFailed","type":"error"},{"inputs":[],"name":"IncorrectDataLength","type":"error"},{"inputs":[],"name":"InsufficientBalance","type":"error"},{"inputs":[],"name":"InvalidMsgValue","type":"error"},{"inputs":[],"name":"InvalidMsgValue","type":"error"},{"inputs":[],"name":"InvalidatedOrder","type":"error"},{"inputs":[],"name":"MakingAmountExceeded","type":"error"},{"inputs":[],"name":"MakingAmountTooLow","type":"error"},{"inputs":[],"name":"OnlyOneAmountShouldBeZero","type":"error"},{"inputs":[],"name":"OrderExpired","type":"error"},{"inputs":[],"name":"PermitLengthTooLow","type":"error"},{"inputs":[],"name":"PredicateIsNotTrue","type":"error"},{"inputs":[],"name":"PrivateOrder","type":"error"},{"inputs":[],"name":"RFQBadSignature","type":"error"},{"inputs":[],"name":"RFQPrivateOrder","type":"error"},{"inputs":[],"name":"RFQSwapWithZeroAmount","type":"error"},{"inputs":[],"name":"RFQZeroTargetIsForbidden","type":"error"},{"inputs":[],"name":"ReentrancyDetected","type":"error"},{"inputs":[],"name":"RemainingAmountIsZero","type":"error"},{"inputs":[],"name":"ReservesCallFailed","type":"error"},{"inputs":[],"name":"ReturnAmountIsNotEnough","type":"error"},{"inputs":[],"name":"SafePermitBadLength","type":"error"},{"inputs":[],"name":"SafeTransferFailed","type":"error"},{"inputs":[],"name":"SafeTransferFromFailed","type":"error"},{"inputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"res","type":"bytes"}],"name":"SimulationResults","type":"error"},{"inputs":[],"name":"SwapAmountTooLarge","type":"error"},{"inputs":[],"name":"SwapWithZeroAmount","type":"error"},{"inputs":[],"name":"TakingAmountExceeded","type":"error"},{"inputs":[],"name":"TakingAmountIncreased","type":"error"},{"inputs":[],"name":"TakingAmountTooHigh","type":"error"},{"inputs":[],"name":"TransferFromMakerToTakerFailed","type":"error"},{"inputs":[],"name":"TransferFromTakerToMakerFailed","type":"error"},{"inputs":[],"name":"UnknownOrder","type":"error"},{"inputs":[],"name":"WrongAmount","type":"error"},{"inputs":[],"name":"WrongGetter","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroMinReturn","type":"error"},{"inputs":[],"name":"ZeroReturnAmount","type":"error"},{"inputs":[],"name":"ZeroTargetIsForbidden","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"uint256","name":"newNonce","type":"uint256"}],"name":"NonceIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"remainingRaw","type":"uint256"}],"name":"OrderCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"remaining","type":"uint256"}],"name":"OrderFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"makingAmount","type":"uint256"}],"name":"OrderFilledRFQ","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint8","name":"amount","type":"uint8"}],"name":"advanceNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"and","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"arbitraryStaticCall","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order","type":"tuple"}],"name":"cancelOrder","outputs":[{"internalType":"uint256","name":"orderRemaining","type":"uint256"},{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderInfo","type":"uint256"}],"name":"cancelOrderRFQ","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderInfo","type":"uint256"},{"internalType":"uint256","name":"additionalMask","type":"uint256"}],"name":"cancelOrderRFQ","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order","type":"tuple"}],"name":"checkPredicate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IClipperExchangeInterface","name":"clipperExchange","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"goodUntil","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"vs","type":"bytes32"}],"name":"clipperSwap","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IClipperExchangeInterface","name":"clipperExchange","type":"address"},{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"goodUntil","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"vs","type":"bytes32"}],"name":"clipperSwapTo","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IClipperExchangeInterface","name":"clipperExchange","type":"address"},{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"goodUntil","type":"uint256"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"vs","type":"bytes32"},{"internalType":"bytes","name":"permit","type":"bytes"}],"name":"clipperSwapToWithPermit","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"destroy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"eq","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"interaction","type":"bytes"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"skipPermitAndThresholdAmount","type":"uint256"}],"name":"fillOrder","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"info","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"}],"internalType":"struct OrderRFQLib.OrderRFQ","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"flagsAndAmount","type":"uint256"}],"name":"fillOrderRFQ","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"info","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"}],"internalType":"struct OrderRFQLib.OrderRFQ","name":"order","type":"tuple"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"vs","type":"bytes32"},{"internalType":"uint256","name":"flagsAndAmount","type":"uint256"}],"name":"fillOrderRFQCompact","outputs":[{"internalType":"uint256","name":"filledMakingAmount","type":"uint256"},{"internalType":"uint256","name":"filledTakingAmount","type":"uint256"},{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"info","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"}],"internalType":"struct OrderRFQLib.OrderRFQ","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"flagsAndAmount","type":"uint256"},{"internalType":"address","name":"target","type":"address"}],"name":"fillOrderRFQTo","outputs":[{"internalType":"uint256","name":"filledMakingAmount","type":"uint256"},{"internalType":"uint256","name":"filledTakingAmount","type":"uint256"},{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"info","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"}],"internalType":"struct OrderRFQLib.OrderRFQ","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"flagsAndAmount","type":"uint256"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"permit","type":"bytes"}],"name":"fillOrderRFQToWithPermit","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order_","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"interaction","type":"bytes"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"skipPermitAndThresholdAmount","type":"uint256"},{"internalType":"address","name":"target","type":"address"}],"name":"fillOrderTo","outputs":[{"internalType":"uint256","name":"actualMakingAmount","type":"uint256"},{"internalType":"uint256","name":"actualTakingAmount","type":"uint256"},{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"bytes","name":"interaction","type":"bytes"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"skipPermitAndThresholdAmount","type":"uint256"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"permit","type":"bytes"}],"name":"fillOrderToWithPermit","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"gt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"address","name":"makerAsset","type":"address"},{"internalType":"address","name":"takerAsset","type":"address"},{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"allowedSender","type":"address"},{"internalType":"uint256","name":"makingAmount","type":"uint256"},{"internalType":"uint256","name":"takingAmount","type":"uint256"},{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"interactions","type":"bytes"}],"internalType":"struct OrderLib.Order","name":"order","type":"tuple"}],"name":"hashOrder","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"uint256","name":"slot","type":"uint256"}],"name":"invalidatorForOrderRFQ","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"lt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"uint256","name":"makerNonce","type":"uint256"}],"name":"nonceEquals","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"offsets","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"or","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"remaining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"remainingRaw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"orderHashes","type":"bytes32[]"}],"name":"remainingsRaw","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"simulate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IAggregationExecutor","name":"executor","type":"address"},{"components":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"address payable","name":"srcReceiver","type":"address"},{"internalType":"address payable","name":"dstReceiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturnAmount","type":"uint256"},{"internalType":"uint256","name":"flags","type":"uint256"}],"internalType":"struct GenericRouter.SwapDescription","name":"desc","type":"tuple"},{"internalType":"bytes","name":"permit","type":"bytes"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"},{"internalType":"uint256","name":"spentAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"timestampBelow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeNonceAccount","type":"uint256"}],"name":"timestampBelowAndNonceEquals","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"}],"name":"uniswapV3Swap","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"}],"name":"uniswapV3SwapTo","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"},{"internalType":"bytes","name":"permit","type":"bytes"}],"name":"uniswapV3SwapToWithPermit","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"}],"name":"unoswap","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"}],"name":"unoswapTo","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"pools","type":"uint256[]"},{"internalType":"bytes","name":"permit","type":"bytes"}],"name":"unoswapToWithPermit","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
*/