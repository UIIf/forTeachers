function abans(a,b) {
	return 'а) '+math(a)+'; б) '+math(b)+'.';
}
function math(a) {
	return '\\('+a+'\\)';
}
function rr(a,b) {
	return '\\left('+String(a)+' ;~ '+String(b)+'\\right)';
}
function rs(a,b) {
	return '\\left('+String(a)+' ;~ '+String(b)+'\\right]';
}
function sr(a,b) {
	return '\\left['+String(a)+' ;~ '+String(b)+'\\right)';
}
function ss(a,b) {
	return '\\left['+String(a)+' ;~ '+String(b)+'\\right]';
}
function is() {
	var a='\\left\\{';
	for(var i = 0; i<arguments.length-1;i++) {
		a+=String(arguments[i]);
		a+=';~';
	}
	a+=arguments[arguments.length-1];
	a+='\\right\\}';
	return a;
}
function U() {
	return '\\cup ';
}
function dz_ans(dz,ans_data) {
	var html = '<h3>Ответы:</h3>';
	html += '<ol>';
	if(dz>=ans_data.length) {
		return '<br><i>На ДЗ '+String(dz+33)+' пока нет ответов.</i>';
	}
	if(dz<0) {
		return '';
	}
	var ans = ans_data[dz];
	for(var i = 0; i<ans.length; i++) {
		html += '<li>';
		html += ans[i];
		html += '</li>';
	}
	html+='</ol>';
	return html;
}
function action(input,output_id,ans_data) {
	var output = document.getElementById(output_id);
	output.innerHTML = dz_ans(input.selectedIndex-1,ans_data);
	MathJax.typeset();
}
async function build_html(url_data) {
	var response = await fetch(url_data);
	var data_ = await response.text();
	eval(data_);
	var select = document.getElementById('dznum');
	var options = data.option;
	for(var i=0; i<options.length;i++){
		select.innerHTML += options[i];
	}
}
var data;
build_html('https://raw.githubusercontent.com/AngryBro/MathTeacher/main/dzans.txt');