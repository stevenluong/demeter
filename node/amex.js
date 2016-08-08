let fs = require('fs'),
	PDFParser = require("../node_modules/pdf2json/PDFParser");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
	//fs.writeFile("./out.json", JSON.stringify(pdfData));
	//console.log(pdfData);
	var pages = pdfData.formImage.Pages;
	var expenses = [];
	for(var i in pages){
		var es = extractExpenses(pages[i]);
		es.forEach(function(e){
			expenses.push(e);
		});
	}
	process(expenses);
});
var process = function(expenses){
	var total = 0;
	for(var i in expenses){
		total = total + parseFloat(expenses[i].value);	
	}
	console.log("Total = "+total.toFixed(2));
}
var extractExpenses = function(p){
	var lineContent = "";
	var lineNumber = 0;
	//var p = pdfData.formImage.Pages[i];
	var content = {};
	p.Texts.forEach(function(t){
		//console.log(t);
		var newLineNumber = t.y;
		if(typeof content[newLineNumber]=="undefined")
			content[newLineNumber] = "";
		content[newLineNumber] = content[newLineNumber] + t.R[0].T.replace("%2C",",")+" ";
	});
	// FILTER EXPENSES
	var expenses = [];
	for(var l in content){
		if(!isNaN(content[l][0])){
			var tmp = content[l].split(",");
			var value = tmp[0].replace(" ","");
			tmp.shift();
			tmp.unshift(value);
			content[l] = tmp.join(",");
			var splits = content[l].split(' ');
			var length = splits.length;
			if(length >= 8){ 
				//console.log()
				if(splits[1] != "EUR" && splits[1] != "PRELEVEMENT" && isNaN(splits[1])){
					//console.log(content[l]);
					//PARSE
					var e = {};
					e["value"] = parseFloat(splits[0].replace(",","."));
					console.log(e["value"]);
					e["date"] = splits[splits.length-5]+" "+splits[splits.length-4];
					e["description"] = splits[1]+" "+splits[2];
					expenses.push(e);
				}
				//else{
				//console.log("NP"+content[l]);
				//}
			}
		}
	}
	return expenses;

}
pdfParser.loadPDF("./AMEX Jul 2016.pdf");

