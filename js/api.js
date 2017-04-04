function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //
	var r = window.location.search.substr(1).match(reg); //
	if (r != null) return unescape(r[2]);
	return null; //
}

function submitAnswer(text, uploader) {
    var formData = new FormData();  
    formData.append("file", uploadCustomFileList);
    formData.append("code", getUrlParam("code"));
    formData.append("QueID", getUrlParam("QueId"));
    formData.append("AnsDetail", text);

    $.ajax({
        "url" : "../../Services/MedicalCare.ashx?action=addanswer",
        "type": 'POST',
        "data": formData,
        // ����jQuery��Ҫȥ�������͵�����
        "processData": false,
        // ����jQuery��Ҫȥ����Content-Type����ͷ
        "contentType": false,
        "success": function (questionsInfo) {
            window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2500d73cdacd7fa6&redirect_uri=http%3A%2F%2Fwww.bestmiyun.com%2Fmiyun%2Fdoctor%2Fhome.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        },
        "error":function () {
        }
    });
} 


function submitQuestion(text, uploader) {
    var formData = new FormData();

    formData.append("file", document.getElementById(uploader).files[0]);
    formData.append("code", getUrlParam("code"));
    formData.append("DocID", 0);
    formData.append("QueDetail", text);

    $.ajax({
        "url": "../../Services/MedicalCare.ashx?action=addquestion",
        "type": 'POST',
        "data": formData,
        // ����jQuery��Ҫȥ�������͵�����
        "processData": false,
        // ����jQuery��Ҫȥ����Content-Type����ͷ
        "contentType": false,
        "success": function (hJson) {
            var parsedJson = jQuery.parseJSON(hJson);
            window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2500d73cdacd7fa6&redirect_uri=http%3A%2F%2Fwww.bestmiyun.com%2Fmiyun%2Fpatient%2Fpay.html%3fQueId%3d" + parsedJson.queId + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        },
        "error": function () {
        }
    });
}


function like() {
	$.ajax({
		"url" : "../../Services/MedicalCare.ashx?action=like",
		"type" : "POST",
		"dataType" : "json",
		"data":{
			"code": getUrlParam("code"),
			"DocID":0,
			"AnswerId":0
		},
		"success": function (questionsInfo) {
		},
		"error":function () {
		}
	});
}
