$(document).ready(function () {

    $.ajax({
        "url": "../../Services/MedicalCare.ashx?action=getispayedforquestion",
        "type": "POST",
        "dataType": "json",
        "data": {
            "QueID": getUrlParam("QueId")
        },
        "success": function (text) {
            if (text == '1') {
                window.location = "./pay-success.html";
            }
        }
    });


    var appId = '';
    var nonceStr = '';
    var package_ = '';
    var paySign = '';
    var signType = '';
    var timeStamp = '';

    $("#weixin-pay-btn").click(function () {
        callpay();
        return false;
    });

    //调用微信JS api 支付
    function jsApiCall() {
        $.ajax({
            url: "../../Services/MedicalCare.ashx?action=payforquestion",
            dataType: "html",
            type: 'post',
            data: {
                code: getUrlParam("code"),
                QueId: getUrlParam("QueId"),
            },
            success: function (hJson) {
                //hJson = hJson.substr(1, hJson.length - 2);
                var parsedJson = jQuery.parseJSON(hJson);
                appId = parsedJson.appId;
                nonceStr = parsedJson.nonceStr;
                package_ = parsedJson.package;
                paySign = parsedJson.paySign;
                signType = parsedJson.signType;
                timeStamp = parsedJson.timeStamp;
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": appId,
                    "timeStamp": timeStamp,
                    "nonceStr": nonceStr,
                    "package": package_,
                    "signType": signType,
                    "paySign": paySign
                },
                function (res) {
                    WeixinJSBridge.log(res.err_msg);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        window.location = "./pay-success.html";
                    } else {
                        //document.getElementById("payFail").style.display = "block";
                    }
                });
            }
        });
    }

    function callpay() {
        WeixinJSBridge.log(typeof WeixinJSBridge);
        if (typeof ('WeixinJSBridge') == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
            }
        } else {
            jsApiCall();
        }
    }

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //
        var r = window.location.search.substr(1).match(reg); //
        if (r != null) return unescape(r[2]);
        return null; //
    }

    function getRadioBoxValue(radioName) {
        var obj = document.getElementsByName(radioName); //
        for (i = 0; i < obj.length; i++) {

            if (obj[i].checked) {
                return obj[i].value;
            }
        }
        return "undefined";
    }
});