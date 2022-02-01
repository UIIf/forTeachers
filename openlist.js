function Openlist(id) {
	var list = document.getElementById(id);
	list.hidden = !list.hidden;
}
function Openlink(url) {
	window.open(window.atob(url));
}
function add_to_list(list,data,tag) {
	var s = '';
	var open;
	var close;
	if(tag=='') {
		open = '';
		close = '';
	}
	else {
		open = tag;
		close = '</';
		for(var i = 1; i<tag.length;i++) {
			close += tag[i];
		}
	}
	for(var i = 0; i<data.length; i++) {
		s += '<li>'+open+'<a href=\"javascript:Openlink(\'';
		s += data[i].link;
		s += '\')\">';
		s += data[i].name;
		s += '</a>'+close+'</li>';
	}
	list.innerHTML += s;
}
async function build_html(url) {
	var response = await fetch(url);
	var data = await response.json();
	var diagnostic = data.diagnostic;
	var other = data.otherlinks;
	var list = document.getElementById('list');
	var tests = document.getElementById('tests');
	add_to_list(tests,diagnostic,'');
	add_to_list(list,other,'<h2>');
}
build_html('https://raw.githubusercontent.com/AngryBro/MathTeacher/main/links.json');
