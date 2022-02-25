var data1;
var data2;
class Task {
	constructor(num,ans) {
		this.num = num;
		if(empty_str(ans)) {
			ans = '&mdash;';
		}
		this.ans = ans;
	}
	print() {
		return String(this.num)+'. '+this.ans;
	}
}
function abans(a,b) {
	return 'а) '+math(a)+'; б) '+math(b)+'.';
}
function math(a) {
	return '\\('+a+'\\)';
}
function ans(a) {
	return math(a)+'.';
}
function xans(letter,a) {
	return letter+') '+math(a);
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
	if(dz==0) {
		return '';
	}
	if(ans_data[dz][0]=='null') {
		return ans_data[dz][1];
	}
	var html = '<h3>Верные ответы:</h3>';
	html += '<ol>';
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
	output.innerHTML = dz_ans(input.value,ans_data);
	MathJax.typeset();
}
function edit(id_raw,id_raw_show) {
	var raw = document.getElementById(id_raw);
	var raw_show = document.getElementById(id_raw_show);
	raw_show.removeAttribute('style');
	raw_show.hidden = true;
	raw.hidden = false;
}
function sum_arr(arr) {
	var s = 0;
	for(var i = 0; i<arr.length; i++) {
		s += arr[i];
	}
	return s;
}
function highlight(task,ans) {
	if(task.ans==ans) {
		return '<span class=\'right\'>'+task.print()+'</span><br>';
	}
	return '<span class=\'wrong\'>'+task.print()+'</span><br>';
}
function split_ans(raw) {
	var symbols = raw.split('');
	while(empty_str(symbols[symbols.length-1])) {
		symbols.pop();
	}
	raw = symbols.join('');
	var splited = '';
	var number = '';
	var flag = true;
	for(var i = 0; i<raw.length; i++) {
		if(digit(raw[i])) {
			if(flag) {
				number += raw[i];
			}
		}
		else {
			if((i>0) && digit(raw[i-1])) {
				flag = false;
			}
		}
	}
	var index = raw.indexOf(number);
	for(var i=index+number.length+1; i<raw.length; i++) {
		splited += raw[i];
	}
	raw = splited.split('').reverse().join('');
	splited = '';
	flag = true;
	var was_digit = false;
	for(var i = 0; i<raw.length; i++) {
		if(valid(raw[i])) {
			if(flag) {
				if(digit(raw[i])) {
					was_digit = true;
				}
				if(was_digit) {
					splited += raw[i];
				}
			}
		}
		else {
			if((i>0)&& valid(raw[i-1])) {
				flag = false;
			}
		}
	}
	splited = splited.split('').reverse().join('').replace('.',',');
	return new Task(number,splited);
}
function make_numbered(id_raw) {
	var raw = document.getElementById(id_raw);
	var raw_raw_arr = raw.value.split('\n');
	var raw_arr = [];
	for(var i = 0; i<raw_raw_arr.length; i++) {
		if(raw_raw_arr[i]!='') {
			raw_arr.push(raw_raw_arr[i]);
		}
	}
	for(var i = 0; i<raw_arr.length; i++) {
		raw_arr[i] = new Task(i+1,raw_arr[i]).print();
	}
	raw.value = raw_arr.join('\n');
}
function undo_numbered(id_raw) {
	var raw = document.getElementById(id_raw);
	var raw_raw_arr = raw.value.split('\n');
	var raw_arr = [];
	for(var i = 0; i<raw_raw_arr.length; i++) {
		if(raw_raw_arr[i]!='') {
			raw_arr.push(raw_raw_arr[i]);
		}
	}
	for(var i = 0; i<raw_arr.length; i++) {
		var s = raw_arr[i].split('');
		var flag = true;
		for(var j = 0; j<s.length; j++) {
			if(flag && digit(s[j])) {
				s[j]='';
			}
			else {
				if(flag) {
					s[j]='';
					if((j<s.length-1)&&(s[j+1]==' ')) {
						s[j+1] = '';
					}
				}
				flag = false;
			}
		}
		raw_arr[i] = s.join('');
	}
	raw.value = raw_arr.join('\n');
}
function clear_(id) {
	document.getElementById(id).value = '';
}
function valid(sym) {
	return digit(sym) || divsym(sym);
}
function digit(sym) {
	var syms = ['1','2','3','4','5','6','7','8','9','0'];
	for(var i = 0; i<syms.length; i++) {
		if(sym==syms[i]) {
			return true;
		}
	}
	return false;
}
function divsym(sym) {
	var syms = ['.',',','-'];
	for(var i = 0; i<syms.length; i++) {
		if(sym==syms[i]) {
			return true;
		}
	}
	return false;
}
function empty_str(str) {
	for(var i = 0; i<str.length; i++) {
		if((str[i]!=' ')&&(str[i]!='\n')&&(str[i]!='	')) {
			return false;
		}
	}
	return true;
}
function ans_to_html(dz_number,data) {
	if(dz_number==0) {
		return '';
	}
	if(data.answers[dz_number][0]=='null') {
		return data.answers[dz_number][1];
	}
	var txt = '';
	var ans = data.answers[dz_number];
	for(var i=0; i<ans.length; i++) {
		txt += new Task(i+1,ans[i]).print()+'<br>';
	}
	return txt;
}
function show_ans(dz_number,data,output_id) {
	document.getElementById(output_id).innerHTML = ans_to_html(dz_number,data);
}
function check(id_dz_num,id_raw,id_raw_show,data) {
	var dz_number = document.getElementById(id_dz_num).value;
	if(dz_number==0) {
		return 0
	}
	var ans = data.answers[dz_number];
	var raw = document.getElementById(id_raw);
	var raw_show = document.getElementById(id_raw_show);
	var raw_ans = raw.value;
	var raw_raw_arr = raw_ans.split('\n');
	var raw_arr = [];
	for(var i = 0; i<raw_raw_arr.length; i++) {
		if(!empty_str(raw_raw_arr[i])) {
			raw_arr.push(raw_raw_arr[i]);
		}
	}
	var html = '';
	var raw_task = [];
	var epsent = [];
	for(var i = 0; i<ans.length; i++) {
		epsent.push(0);
	}
	for(var i = 0; i<raw_arr.length; i++) {
		raw_task.push(split_ans(raw_arr[i]));
	}
	for(var i = 0; i<raw_task.length; i++) {
		if(raw_task[i].num<=ans.length) {
			epsent[raw_task[i].num-1] = 1;
			html += highlight(raw_task[i],ans[raw_task[i].num-1]);
		}
		else {
			html += highlight(raw_task[i],'null');
		}
	}
	var not_epsent = sum_arr(epsent);
	if(not_epsent!=ans.length) {
		html += '<br><span class=\'coment\'>Отсутствуют:<br>';
		var numbers = []
		for(var i = 0; i<epsent.length; i++) {
			if(!epsent[i]) {
				numbers.push(i+1);
			}
		}
		html += numbers.join(', ')+'.</span>';
	}
	raw_show.innerHTML = html;
	raw_show.hidden = false;
	raw_show.setAttribute('style','display:table');
	raw.hidden = true;
}
async function build_html(url_data1,url_data2) {
	var response = await fetch(url_data1);
	var data_ = await response.text();
	eval(data_);
	var select = document.getElementById('dznum1');
	var options = data1.option;
	for(var i=0; i<options.length;i++){
		select.innerHTML += options[i];
	}
	response = await fetch(url_data2);
	data_ = await response.text();
	eval(data_);
	select = document.getElementById('dznum2');
	options = data2.option;
	for(var i=0; i<options.length;i++){
		select.innerHTML += options[i];
	}
}
build_html('https://raw.githubusercontent.com/AngryBro/data/main/part1.txt',
		'https://raw.githubusercontent.com/AngryBro/data/main/part2.txt');
